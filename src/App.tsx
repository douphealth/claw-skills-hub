import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initGA, trackPageView } from "./lib/googleAnalytics";
import { buildInfo } from "./lib/buildInfo";

import ErrorBoundary from "@/components/ErrorBoundary";
import ChatWidget from "@/components/ChatWidget";

// Eager load the landing page for fast first paint
import Index from "./pages/Index";

// Lazy load all other routes for code splitting
const NotFound = lazy(() => import("./pages/NotFound"));
const SkillsDirectory = lazy(() => import("./pages/SkillsDirectory"));
const CategoryLanding = lazy(() => import("./pages/CategoryLanding"));
const SkillDetail = lazy(() => import("./pages/SkillDetail"));
const SkillCompare = lazy(() => import("./pages/SkillCompare"));
const ArticlesIndex = lazy(() => import("./pages/ArticlesIndex"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const TutorialsIndex = lazy(() => import("./pages/TutorialsIndex"));
const TutorialPage = lazy(() => import("./pages/TutorialPage"));
const GlossaryIndex = lazy(() => import("./pages/GlossaryIndex"));
const GlossaryPage = lazy(() => import("./pages/GlossaryPage"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const InstallCenter = lazy(() => import("./pages/InstallCenter"));

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

const App = () => {
  // Initialize Google Analytics and log build info on app load
  useEffect(() => {
    initGA();
    console.log(
      `🚀 ClawSkills v${buildInfo.version} | Commit: ${buildInfo.commit.slice(0, 12)} | Built: ${buildInfo.time} | Env: ${buildInfo.env}`,
    );
  }, []);

  // Track page changes
  useEffect(() => {
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
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
                <Route path="/skills/compare" element={<SkillCompare />} />
                <Route path="/skills/:categorySlug" element={<CategoryLanding />} />
                <Route path="/skills/:categorySlug/:skillSlug" element={<SkillDetail />} />
                <Route path="/articles" element={<ArticlesIndex />} />
                <Route path="/articles/:articleSlug" element={<ArticlePage />} />
                <Route path="/tutorials" element={<TutorialsIndex />} />
                <Route path="/tutorials/:tutorialSlug" element={<TutorialPage />} />
                <Route path="/glossary" element={<GlossaryIndex />} />
                <Route path="/glossary/:glossarySlug" element={<GlossaryPage />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <ChatWidget />
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
