import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "@/components/ErrorBoundary";

// Eager load the landing page for fast first paint
import Index from "./pages/Index";

// Lazy load all other routes for code splitting
const NotFound = lazy(() => import("./pages/NotFound"));
const SkillsDirectory = lazy(() => import("./pages/SkillsDirectory"));
const SkillDetail = lazy(() => import("./pages/SkillDetail"));
const ArticlesIndex = lazy(() => import("./pages/ArticlesIndex"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const TutorialsIndex = lazy(() => import("./pages/TutorialsIndex"));
const TutorialPage = lazy(() => import("./pages/TutorialPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/skills" element={<SkillsDirectory />} />
                <Route path="/skills/:categorySlug/:skillSlug" element={<SkillDetail />} />
                <Route path="/articles" element={<ArticlesIndex />} />
                <Route path="/articles/:articleSlug" element={<ArticlePage />} />
                <Route path="/tutorials" element={<TutorialsIndex />} />
                <Route path="/tutorials/:tutorialSlug" element={<TutorialPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
