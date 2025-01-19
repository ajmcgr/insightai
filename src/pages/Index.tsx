import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import TrendChart from "@/components/trends/TrendChart";
import { useQuery } from "@tanstack/react-query";
import CategoriesSelect from "@/components/trends/CategoriesSelect";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import TrustedBy from "@/components/landing/TrustedBy";

const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
];

const TIME_PERIODS = [
  { value: "1d", label: "Past 24 hours" },
  { value: "7d", label: "Past 7 days" },
  { value: "30d", label: "Past 30 days" },
  { value: "90d", label: "Past 90 days" },
  { value: "12m", label: "Past 12 months" },
];

const Index = () => {
  const [country, setCountry] = useState("US");
  const [timePeriod, setTimePeriod] = useState("7d");
  const [category, setCategory] = useState("all");

  // Mock data generation for trending topics
  const generateMockData = () => {
    console.log("Generating mock data for trending topics");
    return [{
      keyword: "Trending Topics",
      data: Array.from({ length: 10 }, (_, i) => ({
        date: new Date(Date.now() - (9 - i) * 24 * 60 * 60 * 1000).toISOString(),
        value: Math.floor(Math.random() * 100),
      }))
    }];
  };

  const { data: trendData, isLoading } = useQuery({
    queryKey: ["trends", country, timePeriod, category],
    queryFn: async () => {
      return generateMockData();
    },
  });

  console.log("Trend data fetched:", trendData);

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <Hero />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-neutral-200">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_PERIODS.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <CategoriesSelect
                value={category}
                onValueChange={setCategory}
              />
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-neutral-200">
            <h2 className="text-2xl font-semibold mb-4">Trending Topics</h2>
            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">
                <p>Loading trends...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {trendData?.map((trend, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium mb-2">{trend.keyword}</h3>
                    <TrendChart data={trend.data} />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>

      <Features />
      <TrustedBy />
      <Footer />
    </div>
  );
};

export default Index;