import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "BMW Owner",
    rating: 5,
    text: "Amazing service! My BMW 5 Series looks brand new after every session. The foam cannon wash is incredible — removes even the toughest road grime without a scratch.",
    avatar: "RS",
    color: "hsl(var(--secondary))",
  },
  {
    name: "Priya Mehta",
    role: "Monthly Subscriber",
    rating: 5,
    text: "Very professional and the subscription plan is so affordable! I've been on the Monthly Unlimited plan for 6 months and the convenience is unmatched. Highly recommended!",
    avatar: "PM",
    color: "hsl(var(--cyan))",
  },
  {
    name: "Arjun Kapoor",
    role: "Honda Civic Owner",
    rating: 5,
    text: "The interior detailing is phenomenal. They removed 3-year-old stains I thought were permanent. The team is courteous, punctual, and extremely thorough.",
    avatar: "AK",
    color: "hsl(var(--secondary))",
  },
  {
    name: "Sneha Patel",
    role: "Fleet Manager",
    rating: 5,
    text: "We bring all 12 of our company vehicles to AquaShine. The team handles bulk bookings professionally and the eco-friendly products are a big plus for our green initiative.",
    avatar: "SP",
    color: "hsl(var(--cyan))",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAuto]);

  const go = (dir: "prev" | "next") => {
    setIsAuto(false);
    setCurrent((prev) =>
      dir === "prev" ? (prev - 1 + testimonials.length) % testimonials.length : (prev + 1) % testimonials.length
    );
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-20 md:py-28 section-mid">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-tag mx-auto w-fit" style={{ background: "hsl(var(--secondary) / 0.15)", color: "hsl(var(--secondary))", border: "1px solid hsl(var(--secondary) / 0.25)" }}>
            Reviews
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-white/50 text-lg">Trusted by thousands of happy car owners</p>
        </div>

        {/* Main testimonial */}
        <div className="max-w-3xl mx-auto">
          <div className="testimonial-card rounded-2xl p-8 md:p-10 relative" key={current}
            style={{
              background: "hsl(var(--navy-light) / 0.4)",
              border: "1px solid hsl(var(--secondary) / 0.2)",
              backdropFilter: "blur(20px)"
            }}>
            {/* Quote icon */}
            <Quote className="w-10 h-10 mb-6 opacity-30" style={{ color: "hsl(var(--secondary))" }} />

            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 animate-fade-in">
              "{t.text}"
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-white text-sm"
                  style={{ background: t.color }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-bold text-white">{t.name}</div>
                  <div className="text-white/50 text-sm">{t.role}</div>
                </div>
              </div>
              <StarRating rating={t.rating} />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => go("prev")}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "hsl(var(--secondary) / 0.15)", border: "1px solid hsl(var(--secondary) / 0.3)", color: "hsl(var(--secondary))" }}>
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAuto(false); setCurrent(i); }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? "2rem" : "0.5rem",
                    height: "0.5rem",
                    background: i === current ? "hsl(var(--secondary))" : "hsl(0 0% 100% / 0.25)"
                  }}
                />
              ))}
            </div>

            <button onClick={() => go("next")}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "hsl(var(--secondary) / 0.15)", border: "1px solid hsl(var(--secondary) / 0.3)", color: "hsl(var(--secondary))" }}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* All avatar strip */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonials.map((tm, i) => (
              <button
                key={i}
                onClick={() => { setIsAuto(false); setCurrent(i); }}
                className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs text-white transition-all"
                style={{
                  background: tm.color,
                  opacity: i === current ? 1 : 0.4,
                  transform: i === current ? "scale(1.15)" : "scale(1)"
                }}
              >
                {tm.avatar}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
