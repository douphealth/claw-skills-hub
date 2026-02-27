import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ArticlesSection from "@/components/ArticlesSection";
import TutorialsSection from "@/components/TutorialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { websiteJsonLd } from "@/utils/jsonLd";

const Index = () => {
  const jsonLd = websiteJsonLd();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="ClawSkills — The Definitive OpenClaw Skills Directory"
        description="Discover, compare, and install 5,705+ OpenClaw AI agent skills. Curated reviews, tutorials, and guides for every use case."
        canonical="https://clawskills.com/"
        jsonLd={jsonLd}
      />
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
