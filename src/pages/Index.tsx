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
  { question: "What are OpenClaw skills?", answer: "OpenClaw skills are modular capabilities defined in SKILL.md files that extend what OpenClaw can do. Each skill adds a specific function — from AI prompt chaining and browser automation to Gmail integration and code review. Install any skill with one command: npx clawhub@latest install <skill-name>." },
  { question: "Are OpenClaw skills safe?", answer: "OpenClaw skills use a three-tier trust model: verified (formally audited), community (peer-reviewed), and unreviewed. Verified skills in the ClawSkills directory have passed security audits covering permission scoping, data handling, and dependency safety. Always check the security badge before installing." },
  { question: "How do I install OpenClaw skills safely?", answer: "Install with npx clawhub@latest install <skill-name>. For safe installation: use verified skills, pin versions, review SKILL.md permissions (especially system.run and network access), audit dependencies, and test in a sandbox before production use." },
  { question: "How many OpenClaw skills are there?", answer: "As of 2026, there are over 5,705 OpenClaw skills available across 10 categories including AI & LLMs, DevOps, Web Development, Browser Automation, Productivity, Marketing, and more. New skills are published daily by the community." },
  { question: "What is the difference between OpenClaw MCP and skills?", answer: "MCP (Model Context Protocol) servers are external processes that provide tool-level integrations via JSON-RPC. Skills are SKILL.md files that provide behavioral instructions and orchestration logic. MCP servers provide capabilities; skills provide playbooks for using those capabilities. Most powerful setups use both." },
  { question: "How do I create custom OpenClaw skills?", answer: "Create a SKILL.md file with frontmatter (name, description, permissions) and markdown instructions. Define tools, input/output schemas, and behavioral logic. Test locally with npx clawhub@latest install ./path/to/skill, then publish with npx clawhub@latest publish." },
  { question: "What are the best OpenClaw skills for beginners?", answer: "Start with GPT Prompt Chainer (AI workflows), Deep Research (research automation), Browser Pilot (web automation), Notion Sync (productivity), and LLM Router (cost optimization). These five skills cover the most common use cases and work well together." },
];

const Index = () => {
  const faq = faqJsonLd(homepageFaqs);
  const jsonLd = [websiteJsonLd(), organizationJsonLd(), ...(faq ? [faq] : [])];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="ClawSkills — Curated OpenClaw Skills Directory with Security Reviews"
        description="Discover, compare, and safely install 5,705+ OpenClaw skills. Curated reviews, security audits, and one-command installation across 10 categories."
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
