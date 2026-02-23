import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SkillsDirectory from "./pages/SkillsDirectory";
import SkillDetail from "./pages/SkillDetail";
import ArticlesIndex from "./pages/ArticlesIndex";
import ArticlePage from "./pages/ArticlePage";
import TutorialsIndex from "./pages/TutorialsIndex";
import TutorialPage from "./pages/TutorialPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/skills" element={<SkillsDirectory />} />
          <Route path="/skills/:categorySlug/:skillSlug" element={<SkillDetail />} />
          <Route path="/articles" element={<ArticlesIndex />} />
          <Route path="/articles/:articleSlug" element={<ArticlePage />} />
          <Route path="/tutorials" element={<TutorialsIndex />} />
          <Route path="/tutorials/:tutorialSlug" element={<TutorialPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
