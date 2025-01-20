import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Navigation />
      <main className="flex-grow mt-[72px] mb-24">
        <div className="container-padding py-16">
          <h1 className="heading-lg mb-8">Terms of Service</h1>
          <p className="text-lg text-neutral-600 mb-4">
            Welcome to our Terms of Service. These terms govern your use of our services.
          </p>
          <h2 className="heading-lg mb-4">1. Acceptance of Terms</h2>
          <p className="text-lg text-neutral-600 mb-4">
            By accessing or using our services, you agree to be bound by these terms.
          </p>
          <h2 className="heading-lg mb-4">2. Changes to Terms</h2>
          <p className="text-lg text-neutral-600 mb-4">
            We may modify these terms at any time. Your continued use of the services after changes constitutes acceptance of the new terms.
          </p>
          <h2 className="heading-lg mb-4">3. User Responsibilities</h2>
          <p className="text-lg text-neutral-600 mb-4">
            You are responsible for your use of the services and for any content you provide.
          </p>
          <h2 className="heading-lg mb-4">4. Limitation of Liability</h2>
          <p className="text-lg text-neutral-600 mb-4">
            Our liability is limited to the maximum extent permitted by law.
          </p>
          <h2 className="heading-lg mb-4">5. Governing Law</h2>
          <p className="text-lg text-neutral-600 mb-4">
            These terms are governed by the laws of the jurisdiction in which we operate.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
