
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Successfully signed up for newsletter!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-navy-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Sign up to receive updates on new collections, special offers, and eyecare tips
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-navy-800 border-navy-700 text-white placeholder:text-gray-400"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              className="bg-gold-500 hover:bg-gold-600 text-navy-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-sm text-gray-400 mt-4">
            We respect your privacy and will never share your information
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
