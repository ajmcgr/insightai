import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import TrendFilters from "@/components/trends/TrendFilters";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
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

const Explore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedTimeRange, setSelectedTimeRange] = useState("past_week");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState("all");
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/signin");
        return;
      }
      setLoading(false);
      // Mock data for demonstration - expanded to 100 items
      const mockData = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        keyword: `Trend ${index + 1}`,
        volume: Math.floor(Math.random() * 1000000),
        change: Math.floor(Math.random() * 50) * (Math.random() > 0.5 ? 1 : -1),
      }));
      setTrends(mockData);
    };

    checkUser();
  }, [navigate]);

  const handleFiltersChange = () => {
    console.log("Filters changed:", { selectedCountry, selectedTimeRange, selectedCategory, selectedDevice });
    toast({
      title: "Filters Updated",
      description: "Search trends have been updated based on your filters.",
    });
  };

  useEffect(() => {
    handleFiltersChange();
  }, [selectedCountry, selectedTimeRange, selectedCategory, selectedDevice]);

  // Pagination calculations
  const totalPages = Math.ceil(trends.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTrends = trends.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
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
            <h1 className="text-2xl font-semibold mb-8">Explore Search Trends</h1>
            
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