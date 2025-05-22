
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
    // Hard-code the Clerk publishable key for immediate access
    'import.meta.env.VITE_CLERK_PUBLISHABLE_KEY': JSON.stringify("pk_test_ZW5nYWdlZC1veXN0ZXItODQuY2xlcmsuYWNjb3VudHMuZGV2JA"),
  },
}));
