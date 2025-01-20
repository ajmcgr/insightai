import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Navigation />
      <main className="flex-grow mt-[72px] mb-24">
        <div className="container-padding py-16">
          <h1 className="heading-lg mb-8">About Us</h1>
          <p className="text-lg text-neutral-600 mb-4">
            We are a team dedicated to providing the best insights and analytics for your online presence.
          </p>
          <p className="text-lg text-neutral-600 mb-4">
            Our mission is to empower businesses with the tools they need to succeed in the digital landscape.
          </p>
          <p className="text-lg text-neutral-600 mb-4">
            With a focus on innovation and customer satisfaction, we strive to deliver exceptional value to our users.
          </p>
          <p className="text-lg text-neutral-600 mb-4">
            Join us on our journey to transform the way you understand and engage with your audience.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
