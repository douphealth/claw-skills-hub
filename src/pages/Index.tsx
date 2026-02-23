import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ArticlesSection from "@/components/ArticlesSection";
import TutorialsSection from "@/components/TutorialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <ArticlesSection />
      <TutorialsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
