import { Card } from "@/components/ui/card";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import TrustedBy from "@/components/landing/TrustedBy";
import FAQ from "@/components/landing/FAQ";
import Enterprise from "@/components/landing/Enterprise";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <Hero />
      <Features />
      <TrustedBy />
      <FAQ />
      <Enterprise />
      <Footer />
    </div>
  );
};

export default Index;