import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import TrendFilters from "@/components/trends/TrendFilters";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TrendItem {
  id: number;
  keyword: string;
  volume: number;
  change: number;
}

const ITEMS_PER_PAGE = 25;

const fetchTrendData = async (country: string, category: string, device: string) => {
  console.log("Fetching trend data with filters:", { country, category, device });
  
  // First try to get data from Supabase
  const { data: existingData, error } = await supabase
    .from('search_trends')
    .select('*')
    .eq('country', country)
    .eq('category', category)
    .eq('device', device);

  if (error) {
    console.error("Error fetching from Supabase:", error);
    throw error;
  }

  if (existingData && existingData.length > 0) {
    console.log("Found existing data in Supabase:", existingData);
    return existingData;
  }

  // If no data found, fetch from web using Edge Function
  console.log("No existing data found, fetching from web...");
  const { data: webData, error: webError } = await supabase.functions.invoke('fetch-trends', {
    body: { 
      country,
      category,
      device
    }
  });

  if (webError) {
    console.error("Error fetching from web:", webError);
    throw webError;
  }

  return webData;
};

const Explore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedTimeRange, setSelectedTimeRange] = useState("past_week");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: trends = [], isLoading, error } = useQuery({
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

  useEffect(() => {
    if (!isLoading && !error) {
      toast({
        title: "Trends Updated",
        description: "Search trends have been updated based on your filters.",
      });
    }

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch trend data. Please try again.",
        variant: "destructive",
      });
    }
  }, [isLoading, error, toast]);

  const handleExportCSV = () => {
    console.log("Exporting trends to CSV");
    
    const headers = ["Keyword", "Search Volume", "Change (%)"];
    const csvRows = [
      headers.join(","),
      ...trends.map(trend => [
        `"${trend.keyword}"`,
        trend.volume,
        `${trend.change >= 0 ? '+' : ''}${trend.change}`
      ].join(","))
    ];
    
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `search_trends_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: "Your trends data has been exported to CSV.",
    });
  };

  // Pagination calculations
  const totalPages = Math.ceil(trends.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTrends = trends.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

  if (loading || isLoading) {
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
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Trending</h1>
              <Button onClick={handleExportCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            
            <div className="space-y-8">
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

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead className="text-right">Search Volume</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTrends.map((trend) => (
                      <TableRow key={trend.id}>
                        <TableCell className="font-medium">{trend.keyword}</TableCell>
                        <TableCell className="text-right">{trend.volume.toLocaleString()}</TableCell>
                        <TableCell className={`text-right ${trend.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {trend.change >= 0 ? '+' : ''}{trend.change}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Explore;