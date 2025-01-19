import { Card } from "@/components/ui/card";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <Card className="max-w-4xl mx-auto p-8 bg-white/80 backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              By using Insight AI, you agree to these terms. Please read them carefully.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Account Terms</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>You must be 13 years or older to use this service</li>
              <li>You must provide accurate and complete information when registering</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You are responsible for all content posted and activity under your account</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Payment Terms</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Free trial period is 7 days</li>
              <li>After the trial, subscription fees are charged in advance</li>
              <li>No refunds for partial months of service</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Cancellation and Termination</h2>
            <p className="mb-6">
              You can cancel your account at any time. Upon cancellation:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Your account will be deactivated</li>
              <li>All data will be permanently deleted</li>
              <li>No refunds will be provided for unused time</li>
            </ul>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;