import { Zap, Wind, Layers, Leaf, Droplet, Package } from "lucide-react";

const tools = [
  {
    icon: Zap,
    name: "High-Pressure Washer",
    desc: "Industrial-grade 3000 PSI washer that blasts away dirt, grime, and road residue without scratching.",
    color: "hsl(var(--secondary))",
  },
  {
    icon: Droplet,
    name: "Foam Cannon",
    desc: "Professional foam lance that coats the entire vehicle in thick, lubricating foam to lift dirt safely.",
    color: "hsl(var(--cyan))",
  },
  {
    icon: Wind,
    name: "Industrial Vacuum",
    desc: "High-powered vacuum system removes dust, debris, and pet hair from every corner of your interior.",
    color: "hsl(var(--secondary))",
  },
  {
    icon: Layers,
    name: "Microfiber Cloths",
    desc: "Ultra-soft, scratch-free microfiber towels for buffing and drying without leaving swirl marks.",
    color: "hsl(var(--cyan))",
  },
  {
    icon: Leaf,
    name: "Eco-Friendly Products",
    desc: "Biodegradable, pH-neutral cleaning solutions that are safe for your car and the environment.",
    color: "hsl(var(--secondary))",
  },
  {
    icon: Package,
    name: "Detailing Kit",
    desc: "Complete set of applicator pads, brushes, and polishing compounds for showroom-finish results.",
    color: "hsl(var(--cyan))",
  },
];

export default function Tools() {
  return (
    <section id="tools" className="py-20 md:py-28 section-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit">Equipment</div>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4" style={{ color: "hsl(var(--navy))" }}>
            Tools We Use
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Professional-grade equipment for a perfect clean every single time.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tools.map(({ icon: Icon, name, desc, color }) => (
            <div key={name} className="tool-card rounded-2xl p-6 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3 className="font-display font-bold text-lg mb-2" style={{ color: "hsl(var(--navy))" }}>
                {name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
