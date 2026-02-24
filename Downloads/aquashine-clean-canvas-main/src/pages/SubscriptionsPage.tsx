import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Subscriptions from "@/components/Subscriptions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SubscriptionsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/login");
    });
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Subscriptions />
      </div>
      <Footer />
    </div>
  );
}
