
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container-padding max-w-4xl mx-auto">
        <h2 className="text-3xl font-reckless font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border rounded-lg p-2">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">
              How accurate are the trend insights?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600 pt-2">
              Our trend data is updated in real-time and sourced from multiple reliable data points to ensure accuracy and relevance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border rounded-lg p-2">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">
              What countries do you support?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600 pt-2">
              We currently support trend analysis for major markets including the US, UK, Canada, Australia, and more regions are being added regularly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border rounded-lg p-2">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">
              How often is the data updated?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600 pt-2">
              Our platform updates trend data every hour to provide you with the most current insights into what's trending.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border rounded-lg p-2">
            <AccordionTrigger className="text-lg font-medium hover:no-underline">
              Can I export the trend data?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600 pt-2">
              Yes, premium users can export trend data in various formats including CSV and PDF for further analysis.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
