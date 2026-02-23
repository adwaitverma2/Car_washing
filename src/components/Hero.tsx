import { Star, Shield, Clock } from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";

const stats = [
  { value: "1000+", label: "Cars Washed" },
  { value: "4.2★", label: "Rating" },
  { value: "3 Plans", label: "Packages" },
  { value: "100%", label: "Eco-Friendly" },
];


const badges = [
  { icon: Shield, text: "Premium Quality" },
  { icon: Clock, text: "Quick Service" },
  { icon: Star, text: "5-Star Rated" },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden hero-section">
      {/* BG Image overlay */}
      <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="The Harry Wheels Car Wash"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, hsl(215 68% 8% / 0.95) 0%, hsl(215 60% 14% / 0.85) 60%, hsl(206 80% 18% / 0.75) 100%)"
        }} />
      </div>

      {/* Blue glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(206 100% 50% / 0.12) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(191 100% 42% / 0.1) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest animate-slide-up"
            style={{ background: "hsl(var(--secondary) / 0.15)", border: "1px solid hsl(var(--secondary) / 0.3)", color: "hsl(var(--secondary))" }}>
            <Star className="w-3.5 h-3.5 fill-current" />
            Premium Car Wash Services
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-6 animate-slide-up delay-100">
            Give Your Car
            <br />
            the <span style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Shine
            </span> It
            <br />
            Deserves
          </h1>

          <p className="text-lg md:text-xl text-white/65 max-w-xl mb-8 leading-relaxed animate-slide-up delay-200">
            Professional car washing & detailing services with eco-friendly products. 
            Flexible subscription plans for every need.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 mb-10 animate-slide-up delay-300">
            {badges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/80"
                style={{ background: "hsl(0 0% 100% / 0.08)", border: "1px solid hsl(0 0% 100% / 0.12)" }}>
                <Icon className="w-4 h-4 text-secondary" />
                {text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up delay-400">
            <a href="#contact" className="btn-primary text-base px-10 py-4 inline-flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}>
              Book Now
            </a>
            <a href="#subscriptions" className="btn-outline text-base px-10 py-4"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#subscriptions")?.scrollIntoView({ behavior: "smooth" });
              }}>
              View Plans
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up delay-400">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl md:text-3xl font-black mb-1"
                  style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {value}
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 66.7C120 53.3 240 26.7 360 20C480 13.3 600 26.7 720 33.3C840 40 960 40 1080 33.3C1200 26.7 1320 13.3 1380 6.7L1440 0V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="hsl(210 20% 98%)" />
        </svg>
      </div>
    </section>
  );
}
