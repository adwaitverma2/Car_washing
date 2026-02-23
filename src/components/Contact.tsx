import { Mail, Phone } from "lucide-react";

export default function Contact() {
  const contactItems = [
    { icon: Mail, label: "Email Us", value: "tiwarihirdyansh54@gmail.com", href: "mailto:tiwarihirdyansh54@gmail.com" },
    { icon: Phone, label: "Call Us", value: "+91 6393837257", href: "tel:6393837257" },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 section-light">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-tag mx-auto w-fit">Get In Touch</div>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4" style={{ color: "hsl(var(--navy))" }}>
            Contact Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have questions or need assistance? Reach out to us directly.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="space-y-4">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <a key={href} href={href}
                className="flex items-center gap-4 p-5 rounded-2xl group transition-all hover:-translate-y-1 bg-card border border-border hover:border-secondary/30 hover:shadow-md">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                  style={{ background: "hsl(var(--secondary) / 0.12)", border: "1px solid hsl(var(--secondary) / 0.2)" }}>
                  <Icon className="w-5 h-5" style={{ color: "hsl(var(--secondary))" }} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">{label}</div>
                  <div className="font-display font-semibold" style={{ color: "hsl(var(--navy))" }}>{value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
