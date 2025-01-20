import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/insight");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navigation />
      <div className="flex-grow flex items-center justify-center p-4 mt-[72px]">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm border p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
            <p className="text-neutral-600">Start your 7-day free trial today</p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#d7cf7e',
                    brandAccent: '#c5bd6d',
                  }
                }
              }
            }}
            providers={["google"]}
            redirectTo={`${window.location.origin}/insight`}
            view="sign_up"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;