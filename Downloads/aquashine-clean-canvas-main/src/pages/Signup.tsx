import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Droplets, Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.password || form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name },
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account Created! 🎉", description: "Please check your email to verify your account." });
      navigate("/login");
    }
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: "Weak", color: "hsl(0 84% 60%)", width: "33%" };
    if (p.length < 10) return { label: "Medium", color: "hsl(38 92% 50%)", width: "66%" };
    return { label: "Strong", color: "hsl(142 71% 45%)", width: "100%" };
  };
  const strength = passwordStrength();

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl text-sm outline-none border transition-all ${errors[field] ? "border-destructive" : "border-border focus:border-secondary"}`;

  return (
    <div className="min-h-screen flex hero-section">
      {/* Left visual */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(191 100% 42% / 0.12) 0%, transparent 70%)" }} />
        <div className="text-center z-10">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-glow-pulse"
            style={{ background: "var(--gradient-accent)" }}>
            <Droplets className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-display text-5xl font-black text-white mb-4">
            Join Aqua<span className="text-secondary">Shine</span>
          </h1>
          <p className="text-white/60 text-lg max-w-sm mb-10">
            Create your account and unlock exclusive subscription plans for premium car washing.
          </p>
          {/* Benefits */}
          {["Access all subscription plans", "Book appointments online", "Track your wash history", "Exclusive member discounts"].map((b) => (
            <div key={b} className="flex items-center gap-3 text-left mb-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--secondary) / 0.2)" }}>
                <Check className="w-3 h-3" style={{ color: "hsl(var(--secondary))" }} />
              </div>
              <span className="text-white/70 text-sm">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-black text-lg text-white">Aqua<span className="text-secondary">Shine</span></span>
          </div>

          <div className="rounded-2xl p-8" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", boxShadow: "var(--shadow-card)" }}>
            <h2 className="font-display text-2xl font-bold mb-1" style={{ color: "hsl(var(--navy))" }}>Create Account</h2>
            <p className="text-muted-foreground text-sm mb-7">Start your AquaShine journey today</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(var(--navy))" }}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Your full name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`${inputClass("name")} pl-10`} />
                </div>
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(var(--navy))" }}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`${inputClass("email")} pl-10`} />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(var(--navy))" }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type={showPass ? "text" : "password"} placeholder="Min. 6 characters" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`${inputClass("password")} pl-10 pr-10`} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {strength && (
                  <div className="mt-2">
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: strength.width, background: strength.color }} />
                    </div>
                    <p className="text-xs mt-1" style={{ color: strength.color }}>{strength.label} password</p>
                  </div>
                )}
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(var(--navy))" }}>Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type={showConfirm ? "text" : "password"} placeholder="Repeat your password" value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className={`${inputClass("confirmPassword")} pl-10 pr-10`} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full text-base py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "Creating account..." : (
                  <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold hover:opacity-80 transition-colors" style={{ color: "hsl(var(--secondary))" }}>
                Sign In
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-white/30 mt-6">
            <Link to="/" className="hover:text-white/60 transition-colors">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
