import { Card } from "@/components/ui/card";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <Card className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your data.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Account information (email, name)</li>
              <li>Usage data and search history</li>
              <li>Payment information</li>
              <li>Device and browser information</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>To provide and improve our services</li>
              <li>To communicate with you about your account</li>
              <li>To process payments</li>
              <li>To analyze usage patterns and optimize performance</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
            <p className="mb-6">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              For privacy-related questions, contact us at{" "}
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

export default Privacy;