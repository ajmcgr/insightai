import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const Help = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here we would typically send the email to support
      console.log("Sending support email:", { email, message });
      
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
      
      setEmail("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto p-8 bg-white/80 backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-8">Help Center</h1>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How do I get started?</h3>
                <p className="text-neutral-600">
                  Sign up for a free 7-day trial to explore all features. No credit card required.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">What data sources do you use?</h3>
                <p className="text-neutral-600">
                  We analyze search trends from multiple reliable sources to provide accurate insights.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I export the data?</h3>
                <p className="text-neutral-600">
                  Yes, you can export trend data in various formats including CSV and PDF.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  required
                  className="w-full min-h-[120px] px-3 py-2 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-accent-purple"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Help;