import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import beforeAfter1 from "@/assets/before-after-1.jpeg";
import beforeAfter2 from "@/assets/before-after-2.jpeg";
import beforeAfter3 from "@/assets/before-after-3.jpeg";

const slides = [
  {
    title: "Sedan Exterior Wash",
    desc: "Complete transformation with our premium wash",
    image: beforeAfter1,
    label: "Before & After",
  },
  {
    title: "SUV Deep Clean",
    desc: "Spotless results on every vehicle type",
    image: beforeAfter2,
    label: "Before & After",
  },
  {
    title: "Innova Crysta Detail",
    desc: "Premium detailing for larger vehicles",
    image: beforeAfter3,
    label: "Before & After",
  },
];

export default function OurWork() {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAuto]);

  const go = (dir: "prev" | "next") => {
    setIsAuto(false);
    setCurrent((prev) =>
      dir === "prev" ? (prev - 1 + slides.length) % slides.length : (prev + 1) % slides.length
    );
  };

  return (
    <section id="our-work" className="py-20 md:py-28 section-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-tag mx-auto w-fit" style={{ background: "hsl(var(--secondary) / 0.15)", color: "hsl(var(--secondary))", border: "1px solid hsl(var(--secondary) / 0.25)" }}>
            Our Portfolio
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
            Our Work & Deliveries
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Real results from real customers. See The Harry Wheels difference.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Main Slide */}
          <div className="relative rounded-2xl overflow-hidden aspect-video"
            style={{ boxShadow: "var(--shadow-blue)" }}>
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(215 68% 6% / 0.7) 0%, transparent 50%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 inline-block"
                style={{ background: "hsl(var(--secondary) / 0.25)", border: "1px solid hsl(var(--secondary) / 0.4)", color: "hsl(var(--secondary))" }}>
                {slides[current].label}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                {slides[current].title}
              </h3>
              <p className="text-white/60 max-w-md">{slides[current].desc}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <button onClick={() => go("prev")}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "hsl(var(--secondary) / 0.15)", border: "1px solid hsl(var(--secondary) / 0.3)", color: "hsl(var(--secondary))" }}>
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
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

          {/* Thumbnail strip */}
          <div className="flex gap-3 mt-5 overflow-x-auto pb-2">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => { setIsAuto(false); setCurrent(i); }}
                className="flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  border: i === current ? "2px solid hsl(var(--secondary))" : "2px solid transparent",
                  opacity: i === current ? 1 : 0.5
                }}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
