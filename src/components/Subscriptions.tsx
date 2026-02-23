import { Check, Car, Bike, Truck } from "lucide-react";

const plans = [
  {
    name: "Car Wash",
    price: "₹325",
    period: "/session",
    icon: Car,
    color: "hsl(var(--accent))",
    description: "Complete exterior & interior car wash",
    features: [
      "Exterior hand wash",
      "Rinse & dry",
      "Wheel cleaning",
      "Window cleaning",
      "Air freshener",
    ],
    featured: false,
  },
  {
    name: "Bike Wash",
    price: "₹149",
    period: "/session",
    icon: Bike,
    color: "hsl(var(--secondary))",
    description: "Thorough bike cleaning service",
    features: [
      "Full body wash",
      "Chain cleaning",
      "Rinse & dry",
      "Chrome polishing",
      "Seat cleaning",
    ],
    featured: true,
  },
  {
    name: "SUV Wash",
    price: "₹425",
    period: "/session",
    icon: Truck,
    color: "hsl(var(--cyan))",
    description: "Premium wash for larger vehicles",
    features: [
      "Full exterior wash",
      "Interior vacuuming",
      "Dashboard wipe",
      "Wheel & tyre cleaning",
      "Seat cleaning",
      "Air freshener",
    ],
    featured: false,
  },
];

export default function Subscriptions() {
  return (
    <section id="subscriptions" className="py-20 md:py-28 section-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit">Our Plans</div>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4" style={{ color: "hsl(var(--navy))" }}>
            Choose Your Wash
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Quality washing services for every vehicle type.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`pricing-card rounded-2xl p-8 relative overflow-hidden ${plan.featured ? "featured" : ""}`}
              >
                {plan.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white"
                    style={{ background: "var(--gradient-accent)" }}>
                    Most Popular
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}40` }}>
                  <Icon className="w-6 h-6" style={{ color: plan.color }} />
                </div>

                <h3 className={`font-display text-xl font-bold mb-1 ${plan.featured ? "text-white" : ""}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-5 ${plan.featured ? "text-white/60" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="font-display text-4xl font-black" style={{ color: plan.color }}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-1 ${plan.featured ? "text-white/50" : "text-muted-foreground"}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: `${plan.color}20` }}>
                        <Check className="w-3 h-3" style={{ color: plan.color }} />
                      </div>
                      <span className={`text-sm ${plan.featured ? "text-white/80" : ""}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block w-full py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 text-center"
                  style={
                    plan.featured
                      ? { background: "var(--gradient-accent)", color: "white" }
                      : { background: `${plan.color}15`, color: plan.color, border: `1px solid ${plan.color}30` }
                  }
                >
                  Book Now
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
