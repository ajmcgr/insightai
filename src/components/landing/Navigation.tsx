import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="top-4 w-[95%] max-w-6xl z-50 mx-auto bg-[#d7cf7e] rounded-lg">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/75243525-cede-4ed6-9233-4609cf93ddd9.png" 
            alt="Logo" 
            className="w-[125px] h-auto"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/about" className="text-[15px] text-white hover:text-white/80 transition-colors font-medium">About</Link>
          <Link to="/pricing" className="text-[15px] text-white hover:text-white/80 transition-colors font-medium">Pricing</Link>
          <a href="https://blog.works.xyz/" target="_blank" rel="noopener noreferrer" className="text-[15px] text-white hover:text-white/80 transition-colors font-medium">Blog</a>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <button className="text-[15px] px-4 py-2 text-white hover:text-white/80 transition-colors font-medium">
            Sign In
          </button>
          <button className="text-[15px] px-6 py-3 bg-white text-[#d7cf7e] rounded-lg 
                         hover:bg-white/90 transition-all duration-200
                         font-medium tracking-wide">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-neutral-200/50 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden glass-panel mt-2 rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col gap-4">
            <Link to="/about" className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg">About</Link>
            <a href="https://blog.works.xyz/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg">Blog</a>
            <Link to="/help" className="text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg">Help</Link>
            <hr className="border-neutral-200" />
            <button className="text-primary hover:text-primary/80 transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg text-left">
              Log in
            </button>
            <button className="button-secondary w-full">
              Try for Free
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;