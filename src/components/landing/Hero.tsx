import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  useEffect(() => {
    // Add Senja widget script
    const script = document.createElement("script");
    script.src = "https://widget.senja.io/widget/7a87e418-9f71-4dea-86cd-d747948d18e9/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Debug font loading
    console.log("Font loading check:");
    document.fonts.ready.then(() => {
      const testElement = document.createElement('div');
      testElement.style.fontFamily = 'Reckless, serif';
      testElement.style.fontWeight = '500';
      testElement.textContent = 'Test';
      document.body.appendChild(testElement);
      
      const computedStyle = window.getComputedStyle(testElement);
      console.log("Computed font family:", computedStyle.fontFamily);
      console.log("Available fonts:", Array.from(document.fonts).map(f => f.family));
      
      document.body.removeChild(testElement);
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <header className="container-padding py-12 bg-accent-yellow mt-[72px]">
      {/* Hero content */}
      <div className="max-w-4xl mx-auto text-center relative z-10 pt-40 pb-32">
        <motion.h1 
          className="font-reckless heading-xl mb-6 text-primary test-reckless"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore the latest online search trends
        </motion.h1>
        <motion.p 
          className="text-xl font-normal text-primary mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Search or explore keywords and see what's happening in real-time with Insight AI
        </motion.p>
        
        <motion.div 
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Sign Up button and Senja widget container */}
          <div className="flex items-center gap-8 justify-center">
            <Link 
              to="/signup"
              className="px-6 py-3 bg-white text-primary rounded-lg 
                       hover:bg-white/90 transition-all duration-200
                       font-medium tracking-wide"
            >
              Sign Up →
            </Link>
            <div className="senja-embed" data-id="7a87e418-9f71-4dea-86cd-d747948d18e9" data-mode="shadow" data-lazyload="false"></div>
          </div>
          
          {/* Trial Features */}
          <div className="flex gap-6 text-primary font-medium">
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span>7 days free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-green">✓</span>
              <span>Cancel any-time</span>
            </div>
          </div>
          
          {/* Screenshot */}
          <motion.div 
            className="w-full max-w-3xl mx-auto mt-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <img 
              src="/lovable-uploads/trends-tiktok-screenshot.png" 
              alt="TikTok Trends Search Results" 
              className="w-full h-auto rounded-xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
