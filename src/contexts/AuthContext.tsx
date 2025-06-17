import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session, AuthError, AuthResponse } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

interface AuthResponse {
  data: unknown;
  error: AuthError | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signInWithGoogle: () => Promise<AuthResponse>;
  signOut: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
        } else {
          console.log("Initial session:", session?.user?.email || "No session");
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await createOrUpdateUserProfile(session.user);
            await checkAdminStatus(session.user.id);
          }
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (event === 'SIGNED_IN' && session?.user) {
        await createOrUpdateUserProfile(session.user);
        await checkAdminStatus(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", userId)
        .single();
      
      if (!error && data) {
        setIsAdmin(data.role === "admin");
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    }
  };

  const createOrUpdateUserProfile = async (user: User) => {
    try {
      console.log("Creating/updating profile for:", user.email);
      
      const { data: existingProfile } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        console.log("Creating new profile");
        const { error } = await supabase
          .from("user_profiles")
          .insert({
            id: user.id,
            email: user.email!,
            first_name: user.user_metadata?.first_name || '',
            last_name: user.user_metadata?.last_name || '',
            role: 'customer'
          });

        if (error) {
          console.error("Error creating user profile:", error);
        } else {
          console.log("Profile created successfully");
        }
      } else {
        console.log("Profile already exists");
      }
    } catch (error) {
      console.error("Error in createOrUpdateUserProfile:", error);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });      return { data, error };
    } catch (error) {
      console.error("Error in signUp:", error);
      return { data: null, error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });      return { data, error };
    } catch (error) {
      console.error("Error in signIn:", error);
      return { data: null, error: error as AuthError };
    }
  };
  const signInWithGoogle = async () => {
    try {
      const redirectUrl = `${window.location.origin}/auth/callback`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });      return { data, error };
    } catch (error) {
      console.error("Error in signInWithGoogle:", error);
      return { data: null, error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      console.log("AuthContext: Starting sign out...");
      
      // Clear local state first
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out:", error);
        throw error;
      }
      
      console.log("AuthContext: Sign out successful");
      
      // Force reload to clear any cached state
      window.location.href = '/';
      
    } catch (error) {
      console.error("Error in signOut:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session, 
        isLoading, 
        isAdmin, 
        signUp, 
        signIn, 
        signInWithGoogle, 
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Auth component to protect routes
export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="mb-6">Please sign in to access this page.</p>
          <a href="/login" className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Admin auth component to protect admin routes
export const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="mb-6">Please sign in to access this page.</p>
          <a href="/login" className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
          <p className="mb-4">You don't have permission to access the admin dashboard.</p>
          <p className="text-sm text-gray-600 mb-6">
            If you need admin access, please contact the system administrator.
          </p>
          <a href="/" className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};