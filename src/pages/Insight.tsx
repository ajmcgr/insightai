import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import TrendChart from "@/components/trends/TrendChart";
import KeywordComparison from "@/components/trends/KeywordComparison";
import TrendFilters from "@/components/trends/TrendFilters";
import { useToast } from "@/components/ui/use-toast";

const Insight = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedTimeRange, setSelectedTimeRange] = useState("past_week");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState("all");
  const [trendData, setTrendData] = useState<{ date: string; value: number; }[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/signin");
        return;
      }
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const handleCompare = async (keywords: string[]) => {
    console.log("Comparing keywords:", keywords);
    // For demo purposes, generating mock trend data
    const mockData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
      value: Math.floor(Math.random() * 100)
    }));
    setTrendData(mockData);
    
    toast({
      title: "Trends Updated",
      description: "Search trend data has been updated.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navigation />
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto p-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <h1 className="text-2xl font-semibold mb-8">Search Trends</h1>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <KeywordComparison onCompare={handleCompare} />
                
                <TrendFilters 
                  country={selectedCountry}
                  timeRange={selectedTimeRange}
                  category={selectedCategory}
                  device={selectedDevice}
                  onCountryChange={setSelectedCountry}
                  onTimeRangeChange={setSelectedTimeRange}
                  onCategoryChange={setSelectedCategory}
                  onDeviceChange={setSelectedDevice}
                />
              </div>

              {trendData.length > 0 && (
                <div className="mt-8">
                  <TrendChart data={trendData} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Insight;