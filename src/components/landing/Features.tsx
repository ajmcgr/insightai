import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      title: "Real-Time Trend Analysis",
      description: "Stay ahead of the curve with our powerful trend analysis tools that track and analyze global search patterns.",
      points: ["Live Search Trends", "Historical Data Analysis", "Regional Insights"]
    },
    {
      title: "Trend Intelligence",
      description: "Make data-driven decisions with our comprehensive trend intelligence platform that reveals what the world is searching for.",
      points: ["Trend Forecasting", "Search Volume Metrics", "Competitive Analysis"]
    }
  ];

  return (
    <section className="py-24">
      <div className="container-padding">
        <div className="text-center mb-16">
          <span className="bg-accent-purple/10 text-accent-purple px-4 py-1.5 rounded-full text-sm font-medium">
            TREND FEATURES
          </span>
          <h2 className="heading-lg mt-6">Discover Global Search Trends</h2>
          <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
            Uncover valuable insights about what people are searching for worldwide
          </p>
        </div>

        {features.map((feature, index) => (
          <div key={feature.title} className={`flex flex-col md:flex-row gap-12 items-center mb-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-neutral-600 mb-6">{feature.description}</p>
              <ul className="space-y-4">
                {feature.points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent-purple/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent-purple" />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-4">
                <button className="button-primary">Start 14-day trial</button>
                <button className="px-6 py-3 text-neutral-600 hover:text-primary transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
            <div className="flex-1">
              <Card className="glass-panel p-6 rounded-2xl">
                <img 
                  src="/placeholder.svg" 
                  alt={feature.title}
                  className="w-full h-auto rounded-lg"
                />
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;