import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    host: "::",
  },
  define: {
    // Set the redirect URL for production
    'import.meta.env.VITE_REDIRECT_URL': JSON.stringify(
      mode === 'production' 
        ? 'https://lensora-vision-hub.vercel.app' 
        : 'http://localhost:8080'
    ),
  },
}));