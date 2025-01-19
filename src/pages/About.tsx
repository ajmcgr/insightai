import { Card } from "@/components/ui/card";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <Card className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-8">About Insight AI</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">
              Insight AI helps you understand and analyze internet search trends. Our platform provides powerful tools to track, compare, and visualize search data across different regions and time periods.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p className="mb-6">
              We believe in making search trend data accessible and actionable for everyone. Whether you're a marketer, researcher, or business owner, our platform helps you make data-driven decisions with confidence.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Real-time search trend analysis</li>
              <li>Cross-country comparison tools</li>
              <li>Historical data tracking</li>
              <li>Category-specific insights</li>
              <li>Custom alerts and notifications</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              Have questions or feedback? Reach out to us at{" "}
              <a href="mailto:support@tryinsight.ai" className="text-accent-purple hover:underline">
                support@tryinsight.ai
              </a>
            </p>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default About;