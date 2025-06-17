import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Shield } from "lucide-react";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const makeUserAdmin = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter a user email to make admin.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Update user role to admin
      const { error } = await supabase
        .from("user_profiles")
        .update({ role: "admin" })
        .eq("email", email);

      if (error) {
        throw error;
      }

      toast({
        title: "Admin Created",
        description: `User ${email} has been granted admin access.`
      });
        setEmail("");
    } catch (error) {
      console.error("Error creating admin:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create admin user";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Setup</CardTitle>
          <CardDescription>
            Create admin users for your LensHub store
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">User Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500">
              Enter the email of an existing user to grant admin access
            </p>
          </div>
          
          <Button 
            onClick={makeUserAdmin}
            disabled={loading || !email}
            className="w-full"
          >
            {loading ? (
              "Creating Admin..."
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Make Admin
              </>
            )}
          </Button>

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Note:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• The user must already have an account</li>
              <li>• They'll need to sign out and back in to access admin features</li>
              <li>• Admin users can manage products, orders, and appointments</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
