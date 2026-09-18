import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import sitemapPlugin from "./vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    // NOTE: lovable-tagger's componentTagger() is intentionally not used.
    // It is a dev-only annotation plugin that injects data-lovable-* attributes
    // into JSX during `vite dev` and has no effect on the production bundle.
    // It is imported at module scope by lovable-tagger's own entry point, which
    // pulls in tailwindcss/resolveConfig.js and fails config loading if that
    // path is unavailable. Leaving it out keeps dev tooling from being able to
    // break a production build.
    mode === "production" && sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
