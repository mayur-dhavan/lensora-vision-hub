import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Processing auth callback...');
        
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          toast({
            title: "Authentication Failed",
            description: error.message,
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        if (data.session) {
          console.log('Authentication successful');
          toast({
            title: "Welcome!",
            description: "You have been successfully signed in."
          });
          
          // Check if user has a profile, create if not
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('id')
            .eq('id', data.session.user.id)
            .single();

          if (!profile) {
            console.log('Creating user profile...');
            await supabase
              .from('user_profiles')
              .insert({
                id: data.session.user.id,
                email: data.session.user.email!,
                first_name: data.session.user.user_metadata?.first_name || '',
                last_name: data.session.user.user_metadata?.last_name || '',
                role: 'customer'
              });
          }
          
          // Redirect to home page
          navigate('/');
        } else {
          console.log('No session found, redirecting to login');
          navigate('/login');
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred during authentication.",
          variant: "destructive"
        });
        navigate('/login');
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Completing sign in...</h2>
          <p className="text-gray-600">Please wait while we set up your account.</p>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
