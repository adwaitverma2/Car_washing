import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Droplets, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.password || form.password.length < 6) errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    setLoading(false);
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back! 🎉", description: "You're now signed in." });
      navigate("/subscriptions");
    }
  };

  return (
    <div className="min-h-screen flex hero-section">
      {/* Left visual */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, hsl(206 100% 50% / 0.15) 0%, transparent 70%)" }} />
        <div className="text-center z-10">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-glow-pulse"
            style={{ background: "var(--gradient-accent)" }}>
            <Droplets className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-display text-5xl font-black text-white mb-4">
            Aqua<span className="text-secondary">Shine</span>
          </h1>
          <p className="text-white/60 text-lg max-w-sm">
            Premium car washing services. Sign in to access exclusive subscription plans.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {["5,000+\nCars Washed", "4.9★\nRating", "100%\nEco-Friendly"].map((stat) => {
              const [val, label] = stat.split("\n");
              return (
                <div key={label} className="rounded-xl p-4" style={{ background: "hsl(0 0% 100% / 0.07)", border: "1px solid hsl(0 0% 100% / 0.12)" }}>
                  <div className="font-display font-black text-xl mb-1" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{val}</div>
                  <div className="text-white/50 text-xs">{label}</div>
                </div>
              );
            })}
          </div>
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
            <h2 className="font-display text-2xl font-bold mb-1" style={{ color: "hsl(var(--navy))" }}>Welcome Back</h2>
            <p className="text-muted-foreground text-sm mb-7">Sign in to your AquaShine account</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(var(--navy))" }}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none border transition-all ${errors.email ? "border-destructive" : "border-border focus:border-secondary"}`}
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(var(--navy))" }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Your password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none border transition-all ${errors.password ? "border-destructive" : "border-border focus:border-secondary"}`}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full text-base py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? "Signing in..." : (
                  <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold transition-colors hover:opacity-80" style={{ color: "hsl(var(--secondary))" }}>
                Sign Up
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
