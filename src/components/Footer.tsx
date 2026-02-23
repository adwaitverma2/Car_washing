import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const footerLinks = {
  Services: ["Car Wash", "Bike Wash", "SUV Wash", "Fleet Services"],
  Company: ["About Us", "Our Team", "Blog", "Careers"],
  Support: ["FAQ", "Contact", "Privacy Policy", "Terms of Service"],
};

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="section-dark pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="The Harry Wheels" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-display font-black text-lg text-white">
                  The Harry <span className="text-secondary">Wheels</span>
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Premium car washing & detailing services with eco-friendly products. 
              We keep your vehicle looking its best, every time.
            </p>
            {/* Contact quick links */}
            <div className="space-y-2">
              <a href="mailto:tiwarihirdyansh54@gmail.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-secondary transition-colors">
                <Mail className="w-4 h-4" /> tiwarihirdyansh54@gmail.com
              </a>
              <a href="tel:6393837257" className="flex items-center gap-2 text-sm text-white/60 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4" /> +91 6393837257
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/50 hover:text-secondary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t mb-6" style={{ borderColor: "hsl(var(--secondary) / 0.15)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} The Harry Wheels. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5"
                style={{ background: "hsl(var(--secondary) / 0.12)", border: "1px solid hsl(var(--secondary) / 0.2)", color: "hsl(var(--secondary))" }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
