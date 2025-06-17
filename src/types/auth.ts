import { AuthError, Session, User } from '@supabase/supabase-js';

export interface AuthResponse {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: AuthError | null;
}

export interface SignUpResponse {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: AuthError | null;
}

export interface SignInResponse {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: AuthError | null;
}

export interface OAuthResponse {
  data: {
    provider: string;
    url: string;
  } | null;
  error: AuthError | null;
}
