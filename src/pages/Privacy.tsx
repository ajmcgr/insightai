import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Navigation />
      <main className="flex-grow mt-[72px] mb-24">
        <div className="container-padding py-16">
          <h1 className="heading-lg mb-8">Privacy Policy</h1>
          <p className="text-lg text-neutral-600 mb-4">
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.
          </p>
          <h2 className="heading-lg mb-4">Information We Collect</h2>
          <p className="text-lg text-neutral-600 mb-4">
            When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
          </p>
          <h2 className="heading-lg mb-4">How We Use Your Information</h2>
          <p className="text-lg text-neutral-600 mb-4">
            We use the information we collect to help us screen for potential risk and, more generally, to improve and optimize our website.
          </p>
          <h2 className="heading-lg mb-4">Sharing Your Personal Information</h2>
          <p className="text-lg text-neutral-600 mb-4">
            We share your Personal Information with third parties to help us use your Personal Information, as described above.
          </p>
          <h2 className="heading-lg mb-4">Your Rights</h2>
          <p className="text-lg text-neutral-600 mb-4">
            If you are a European resident, you have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted.
          </p>
          <h2 className="heading-lg mb-4">Changes</h2>
          <p className="text-lg text-neutral-600 mb-4">
            We may update this privacy policy from time to time to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
