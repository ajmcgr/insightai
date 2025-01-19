import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/insight');
      }
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="w-full bg-[#d7cf7e]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/75243525-cede-4ed6-9233-4609cf93ddd9.png" 
            alt="Logo" 
            className="w-[125px] h-auto"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/about" className="text-base text-white hover:text-white/80 transition-colors font-medium">About</Link>
          <Link to="/pricing" className="text-base text-white hover:text-white/80 transition-colors font-medium">Pricing</Link>
          <a href="https://blog.works.xyz/" target="_blank" rel="noopener noreferrer" className="text-base text-white hover:text-white/80 transition-colors font-medium">Blog</a>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link 
                to="/insight" 
                className="text-base px-4 py-2 text-white hover:text-white/80 transition-colors font-medium"
              >
                Insights
              </Link>
              <Link 
                to="/dashboard" 
                className="text-base px-4 py-2 text-white hover:text-white/80 transition-colors font-medium"
              >
                Dashboard
              </Link>
              <button 
                onClick={handleSignOut}
                className="text-base px-6 py-3 bg-white text-[#d7cf7e] rounded-lg 
                         hover:bg-white/90 transition-all duration-200
                         font-medium tracking-wide"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/signin" 
                className="text-base px-4 py-2 text-white hover:text-white/80 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link 
                to="/signup"
                className="text-base px-6 py-3 bg-white text-[#d7cf7e] rounded-lg 
                         hover:bg-white/90 transition-all duration-200
                         font-medium tracking-wide"
              >
                Sign Up
              </Link>
            </>
          )}
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
          className="md:hidden glass-panel mt-2 rounded-xl p-4 shadow-lg mx-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col gap-4">
            <Link to="/about" className="text-base text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg">About</Link>
            <a href="https://blog.works.xyz/" target="_blank" rel="noopener noreferrer" className="text-base text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg">Blog</a>
            <Link to="/help" className="text-base text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg">Help</Link>
            <hr className="border-neutral-200" />
            {user ? (
              <>
                <Link to="/insight" className="text-base text-primary hover:text-primary/80 transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg text-left">
                  Insights
                </Link>
                <Link to="/dashboard" className="text-base text-primary hover:text-primary/80 transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg text-left">
                  Dashboard
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="button-secondary w-full text-base"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-base text-primary hover:text-primary/80 transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg text-left">
                  Sign In
                </Link>
                <Link to="/signup" className="button-secondary w-full text-base">
                  Try for Free
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;