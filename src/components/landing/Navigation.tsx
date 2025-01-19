import { useState, useEffect } from "react";
import { Menu, HelpCircle, Settings, LogOut, Globe } from "lucide-react";
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
    <nav className={`w-full ${!user ? 'bg-[#d9d600]' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          to={user ? "/insight" : "/"} 
          className="flex items-center gap-2 group relative"
        >
          <img 
            src={user ? "/lovable-uploads/36e1ae54-f402-431f-8382-aed76c12c264.png" : "/lovable-uploads/36e1ae54-f402-431f-8382-aed76c12c264.png"}
            alt="Logo" 
            className="w-[125px] h-auto"
          />
          {user && (
            <span className="text-sm text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Back to trends →
            </span>
          )}
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {!user && (
            <>
              <Link to="/about" className="text-base text-white hover:text-white/80 transition-colors font-medium">About</Link>
              <Link to="/pricing" className="text-base text-white hover:text-white/80 transition-colors font-medium">Pricing</Link>
              <a href="https://blog.works.xyz/" target="_blank" rel="noopener noreferrer" className="text-base text-white hover:text-white/80 transition-colors font-medium">Blog</a>
            </>
          )}
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link 
                to="/explore" 
                className="text-base px-4 py-2 text-black hover:text-black/80 transition-colors font-medium"
              >
                <Globe className="w-5 h-5" />
              </Link>
              <Link 
                to="/help" 
                className="text-base px-4 py-2 text-black hover:text-black/80 transition-colors font-medium"
              >
                <HelpCircle className="w-5 h-5" />
              </Link>
              <Link 
                to="/dashboard" 
                className="text-base px-4 py-2 text-black hover:text-black/80 transition-colors font-medium"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <button 
                onClick={handleSignOut}
                className="text-base p-2 text-black hover:text-black/80 transition-colors"
              >
                <LogOut className="w-5 h-5" />
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
                className="text-base px-6 py-3 bg-white text-[#d9d600] rounded-lg 
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
          <Menu className={`w-6 h-6 ${user ? 'text-black' : 'text-white'}`} />
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
            {!user && (
              <>
                <Link to="/about" className="text-base text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg">About</Link>
                <Link to="/pricing" className="text-base text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg">Pricing</Link>
                <a href="https://blog.works.xyz/" target="_blank" rel="noopener noreferrer" className="text-base text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg">Blog</a>
              </>
            )}
            {user && (
              <Link to="/explore" className="text-base text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Explore
              </Link>
            )}
            <Link to="/help" className="text-base text-neutral-600 hover:text-primary transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg">Help</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-base text-primary hover:text-primary/80 transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg text-left">
                  Account Settings
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="button-secondary w-full text-base flex items-center gap-2 justify-center"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
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
