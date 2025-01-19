import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import PricingTable from "@/components/pricing/PricingTable";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="py-24">
        <div className="container-padding">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="heading-lg mb-6">Simple, Transparent Pricing</h1>
            <p className="text-lg text-neutral-600">
              Start with a 7-day free trial. No credit card required.
            </p>
          </div>
          
          <PricingTable />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;