import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingTable = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
          <p className="text-neutral-600 mb-4">Try Write AI for 7 days</p>
          
          <div className="mb-6">
            <span className="text-4xl font-bold">$0</span>
          </div>

          <Button 
            className="w-full bg-accent-yellow text-primary hover:bg-accent-yellow/90"
          >
            Start Free Trial
          </Button>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-accent-green" />
              <span className="text-neutral-600">Full access to all features</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-accent-green" />
              <span className="text-neutral-600">Unlimited trend searches</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-accent-green" />
              <span className="text-neutral-600">Real-time trend analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-accent-green" />
              <span className="text-neutral-600">Export data & reports</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;