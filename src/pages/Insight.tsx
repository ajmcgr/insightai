import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import TrendChart from "@/components/trends/TrendChart";
import KeywordComparison from "@/components/trends/KeywordComparison";
import TrendFilters from "@/components/trends/TrendFilters";
import { useQuery } from "@tanstack/react-query";

interface TrendData {
  keyword: string;
  volume: number;
  change_percentage: number;
  country: string;
  category: string;
  device: string;
  created_at: string;
}

const fetchTrendData = async (country: string, category: string, device: string) => {
  console.log("Fetching trend data with filters:", { country, category, device });
  
  const { data, error } = await supabase
    .from('search_trends')
    .select('*')
    .eq('country', country)
    .eq('category', category === 'all' ? category : category)
    .eq('device', device);

  if (error) {
    console.error("Error fetching trend data:", error);
    throw error;
  }

  return data;
};

const Insight = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedTimeRange, setSelectedTimeRange] = useState("past_week");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState("all");
  const [trendData, setTrendData] = useState<{ date: string; value: number; }[]>([]);

  const { data: trends, isLoading: isTrendsLoading, error: trendsError } = useQuery({
    queryKey: ['trends', selectedCountry, selectedCategory, selectedDevice],
    queryFn: () => fetchTrendData(selectedCountry, selectedCategory, selectedDevice),
  });

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
    if (trends) {
      // Filter trends data based on keywords
      const relevantTrends = trends.filter(trend => 
        keywords.includes(trend.keyword.toLowerCase())
      );

      // Transform the data for the chart
      const chartData = relevantTrends.map(trend => ({
        date: trend.created_at,
        value: trend.volume
      }));

      setTrendData(chartData);
      
      toast({
        title: "Trends Updated",
        description: "Search trend data has been updated.",
      });
    }
  };

  if (loading || isTrendsLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (trendsError) {
    toast({
      title: "Error",
      description: "Failed to fetch trend data. Please try again.",
      variant: "destructive",
    });
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