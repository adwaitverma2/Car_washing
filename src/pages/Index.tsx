import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Subscriptions from "@/components/Subscriptions";
import OurWork from "@/components/OurWork";
import Tools from "@/components/Tools";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Subscriptions />
      <OurWork />
      <Tools />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
