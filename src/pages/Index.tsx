import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ArticlesSection from "@/components/ArticlesSection";
import TutorialsSection from "@/components/TutorialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { websiteJsonLd, organizationJsonLd, faqJsonLd } from "@/utils/jsonLd";

const homepageFaqs = [
  { question: "What is ClawSkills?", answer: "ClawSkills is the definitive directory for OpenClaw AI agent skills. It lets you discover, compare, and install 5,705+ skills across 10 categories including AI & LLMs, DevOps, Web Development, and more." },
  { question: "How many OpenClaw skills are there?", answer: "As of 2026, there are over 5,705 OpenClaw skills available in the ClawSkills directory, with new skills published daily by the community." },
  { question: "How do I install an OpenClaw skill?", answer: "Install any skill with a single command: npx clawhub@latest install <skill-name>. Skills are immediately available to your AI agents after installation." },
  { question: "Is ClawSkills free to use?", answer: "Yes. ClawSkills is completely free to browse, search, and use. The vast majority of listed skills are also free and open-source." },
  { question: "What is the best OpenClaw skill for beginners?", answer: "We recommend starting with the 'Getting Started with OpenClaw Skills' tutorial and exploring beginner-friendly skills like Notion Sync, Browser Pilot, or GPT Prompt Chainer." },
];

const Index = () => {
  const faq = faqJsonLd(homepageFaqs);
  const jsonLd = [websiteJsonLd(), organizationJsonLd(), ...(faq ? [faq] : [])];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="OpenClaw Skills Directory: Curated, Verified & Safe Skills"
        description="Browse 5,705+ curated OpenClaw skills by category, use case, and safety. Install verified skills, compare alternatives, and automate with ClawHub."
        canonical="https://openclaw-skillshub.com/"
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
