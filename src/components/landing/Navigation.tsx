import { useState, useEffect } from "react";
import { Menu, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="glass-panel rounded-full px-6 py-4 flex items-center justify-between shadow-lg backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full"></div>
          <span className="text-xl font-semibold">Insight AI</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/about" className="text-neutral-600 hover:text-primary transition-colors font-medium">About</Link>
          <Link to="/pricing" className="text-neutral-600 hover:text-primary transition-colors font-medium">Pricing</Link>
          <a href="https://blog.works.xyz/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-primary transition-colors font-medium">Blog</a>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <Button variant="ghost" onClick={handleSignOut} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          ) : (
            <>
              <Link to="/auth" className="px-4 py-2 text-primary hover:text-primary/80 transition-colors font-medium">
                Sign In
              </Link>
              <Link to="/auth" className="button-secondary">
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
            {session ? (
              <Button variant="ghost" onClick={handleSignOut} className="flex items-center gap-2 justify-start">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/auth" className="text-primary hover:text-primary/80 transition-colors font-medium px-4 py-2 hover:bg-neutral-200/50 rounded-lg text-left">
                  Sign In
                </Link>
                <Link to="/auth" className="button-secondary w-full">
                  Sign Up
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