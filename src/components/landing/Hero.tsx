import { motion } from "framer-motion";
import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    // Add Senja widget script
    const script = document.createElement("script");
    script.src = "https://widget.senja.io/widget/7a87e418-9f71-4dea-86cd-d747948d18e9/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <header className="container-padding py-12 bg-accent-yellow">
      {/* Hero content */}
      <div className="max-w-4xl mx-auto text-center relative z-10 pt-40 pb-32">
        <motion.h1 
          className="font-serif heading-xl mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Find the latest trends online
        </motion.h1>
        <motion.p 
          className="text-xl text-white/90 mb-8"
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
          <button className="px-6 py-3 bg-white text-[#d7cf7e] rounded-lg 
                         hover:bg-white/90 transition-all duration-200
                         font-medium tracking-wide">
            Sign Up
          </button>
          <div className="senja-embed" data-id="7a87e418-9f71-4dea-86cd-d747948d18e9" data-mode="shadow" data-lazyload="false"></div>
          
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