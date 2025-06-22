import { Button } from "@/components/ui/button";

const Enterprise = () => {
  return (
    <section className="py-24 bg-neutral-100">
      <div className="container-padding max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-reckless font-bold mb-6">Enterprise Solutions</h2>
        <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
          Custom solutions for high-volume press release needs. Let's discuss how we can help scale your communications.
        </p>
        <Button 
          className="bg-accent-yellow text-black hover:bg-accent-yellow/90"
          onClick={() => window.location.href = 'mailto:enterprise@tryinsight.ai'}
        >
          Contact Us
        </Button>
      </div>
    </section>
  );
};

export default Enterprise;
