import { AuthError } from "@supabase/supabase-js";

export interface AuthResponse {
  data: any;
  error: AuthError | null;
}

export const useAuthContext = () => {
  throw new Error("useAuth must be used within an AuthProvider");
};
