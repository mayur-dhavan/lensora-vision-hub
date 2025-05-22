
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useClerk, useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("role")
          .eq("email", user.primaryEmailAddress.emailAddress)
          .single();
        
        if (!error && data) {
          setIsAdmin(data.role === "admin");
        }
        setIsLoading(false);
      } else if (isLoaded) {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, isLoaded]);

  return (
    <AuthContext.Provider value={{ isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth component to protect routes
export const RequireAuth = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

// Admin auth component to protect admin routes
export const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <>
      <SignedIn>
        {isAdmin ? (
          children
        ) : (
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
            <p>You don't have permission to access this page.</p>
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};
