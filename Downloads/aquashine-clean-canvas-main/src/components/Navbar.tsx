import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#subscriptions" },
  { label: "Our Work", href: "#our-work" },
  { label: "Tools", href: "#tools" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      window.location.href = "/" + href;
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-dark shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logo} alt="The Harry Wheels" className="w-10 h-10 rounded-full object-cover" />
            <div className="leading-tight">
              <span className="font-display font-900 text-lg tracking-tight text-white">
                The Harry <span className="text-secondary">Wheels</span>
              </span>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium">
                Instant · Shine · Anytime
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 text-sm font-medium text-white/75 hover:text-white transition-colors rounded-lg hover:bg-white/8"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
              className="btn-primary text-sm px-5 py-2.5">Book Now</a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden nav-dark border-t border-secondary/15 py-4 px-2 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-2 mt-4 px-4">
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("#contact"); }}
                className="btn-primary text-center">Book Now</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
