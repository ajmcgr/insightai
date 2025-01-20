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
import { Skeleton } from "@/components/ui/skeleton";

interface TrendData {
  keyword: string;
  volume: number;
  change_percentage: number;
  country: string;
  category: string;
  device: string;
  created_at: string;
}

const fetchTrendData = async (keywords: string[], country: string, category: string, device: string) => {
  console.log("Fetching trend data for keywords:", keywords);
  
  if (!keywords.length || keywords.every(k => !k.trim())) {
    return [];
  }
  
  // First try to fetch from Supabase
  const { data: existingData, error } = await supabase
    .from('search_trends')
    .select('*')
    .eq('country', country)
    .eq('category', category)
    .eq('device', device)
    .in('keyword', keywords.map(k => k.toLowerCase()));

  if (error) {
    console.error("Error fetching trend data:", error);
    throw error;
  }

  // If no data found or data is stale (older than 1 hour), fetch from web
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const needsFresh = !existingData || existingData.length === 0 || 
                    existingData.some(d => d.updated_at < oneHourAgo);

  if (needsFresh) {
    console.log("Fetching fresh data from web...");
    const { data, error: fetchError } = await supabase.functions.invoke('fetch-trends', {
      body: { keywords }
    });

    if (fetchError) {
      console.error("Error fetching from web:", fetchError);
      throw fetchError;
    }

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch trend data from web');
    }

    return data.data;
  }

  return existingData;
};

const Insight = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedTimeRange, setSelectedTimeRange] = useState("past_week");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState("all");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

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

  const { data: trends, isLoading: isTrendsLoading, error: trendsError } = useQuery({
    queryKey: ['trends', selectedKeywords, selectedCountry, selectedCategory, selectedDevice],
    queryFn: () => fetchTrendData(selectedKeywords, selectedCountry, selectedCategory, selectedDevice),
    enabled: selectedKeywords.length > 0 && selectedKeywords.some(k => k.trim()),
  });

  useEffect(() => {
    if (trendsError) {
      toast({
        title: "Error",
        description: "Failed to fetch trend data. Please try again.",
        variant: "destructive",
      });
    }
  }, [trendsError, toast]);

  const handleCompare = (keywords: string[]) => {
    console.log("Comparing keywords:", keywords);
    setSelectedKeywords(keywords.filter(k => k.trim()));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navigation />
        <div className="flex-grow mt-[72px]">
          <div className="max-w-6xl mx-auto p-4 py-8">
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h1 className="text-2xl font-semibold mb-8">Search Trends</h1>
              <div className="space-y-8">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-[400px] w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navigation />
      <div className="flex-grow mt-[72px] mb-24">
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

              {isTrendsLoading ? (
                <div className="flex items-center justify-center p-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : trends && trends.length > 0 ? (
                <div className="mt-8">
                  <TrendChart data={trends.map(trend => ({
                    date: trend.created_at,
                    value: trend.volume,
                    keyword: trend.keyword
                  }))} />
                </div>
              ) : selectedKeywords.length > 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No trend data found for the selected keywords and filters.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Insight;