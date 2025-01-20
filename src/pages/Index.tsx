import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import FAQ from "@/components/landing/FAQ";
import Enterprise from "@/components/landing/Enterprise";
import PricingTable from "@/components/pricing/PricingTable";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Navigation />
      <main className="flex-grow mb-24">
        <Hero />
        <Features />
        
        <section className="py-24 bg-white">
          <div className="container-padding">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="heading-lg mb-6">Start Your Free Trial Today</h2>
              <p className="text-lg text-neutral-600">
                Experience the full power of our platform with a 7-day free trial.
              </p>
            </div>
            
            <PricingTable />
          </div>
        </section>
        
        <FAQ />
        <Enterprise />
      </main>
      <Footer />
    </div>
  );
};

export default Index;