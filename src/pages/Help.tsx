import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Navigation />
      <main className="flex-grow mt-[72px] mb-24">
        <div className="container-padding py-16">
          <h1 className="heading-lg mb-8">Help Center</h1>
          <p className="text-lg text-neutral-600 mb-4">Here you can find answers to common questions and issues.</p>
          <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
          <ul className="list-disc list-inside mb-4">
            <li>How do I reset my password?</li>
            <li>What should I do if I encounter an error?</li>
            <li>How can I contact support?</li>
          </ul>
          <h2 className="heading-lg mb-4">Contact Support</h2>
          <p className="text-lg text-neutral-600">If you need further assistance, please reach out to our support team at <a href="mailto:support@tryinsight.ai" className="text-primary">support@tryinsight.ai</a>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Help;
