import { motion } from "framer-motion";

const Hero = () => {
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
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="px-6 py-3 bg-white text-primary rounded-lg 
                         hover:bg-white/90 transition-all duration-200
                         font-medium tracking-wide">
            Get Started Now
          </button>
          <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;