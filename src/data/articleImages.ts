import whatAreSkillsHero from "@/assets/articles/what-are-openclaw-skills-hero.jpg";
import installSkillsHero from "@/assets/articles/install-openclaw-skills-hero.jpg";
import securityAuditHero from "@/assets/articles/security-audit-hero.jpg";
import skillsVsPluginsHero from "@/assets/articles/skills-vs-plugins-vs-mcp-hero.jpg";
import bestSkills2026Hero from "@/assets/articles/best-skills-2026-hero.jpg";
import nemoClawHero from "@/assets/articles/nemoclaw-vs-openclaw-hero.jpg";

// New unique hero images for every article category
import bestAiLlmHero from "@/assets/articles/best-ai-llm-hero.jpg";
import bestSearchResearchHero from "@/assets/articles/best-search-research-hero.jpg";
import bestWebFrontendHero from "@/assets/articles/best-web-frontend-hero.jpg";
import bestDevopsCloudHero from "@/assets/articles/best-devops-cloud-hero.jpg";
import bestBrowserAutomationHero from "@/assets/articles/best-browser-automation-hero.jpg";
import bestProductivityHero from "@/assets/articles/best-productivity-hero.jpg";
import bestMarketingSalesHero from "@/assets/articles/best-marketing-sales-hero.jpg";
import bestCodingAgentsHero from "@/assets/articles/best-coding-agents-hero.jpg";
import bestNotesPkmHero from "@/assets/articles/best-notes-pkm-hero.jpg";
import bestHealthFitnessHero from "@/assets/articles/best-health-fitness-hero.jpg";
import multiAgentHero from "@/assets/articles/multi-agent-orchestration-hero.jpg";
import bestContentCreatorsHero from "@/assets/articles/best-content-creators-hero.jpg";
import gettingStartedHero from "@/assets/articles/getting-started-hero.jpg";
import bestFoundersHero from "@/assets/articles/best-founders-hero.jpg";
import howToCreateSkillsHero from "@/assets/articles/how-to-create-skills-hero.jpg";
import gmailSkillHero from "@/assets/articles/gmail-skill-hero.jpg";
import slackSkillHero from "@/assets/articles/slack-skill-hero.jpg";
import mcpVsSkillsHero from "@/assets/articles/mcp-vs-skills-hero.jpg";
import alternativesHero from "@/assets/articles/alternatives-hero.jpg";

// Infographics
import aiPipelineArchitecture from "@/assets/infographics/ai-pipeline-architecture.jpg";
import securityAuditChecklist from "@/assets/infographics/security-audit-checklist.jpg";
import costOptimization from "@/assets/infographics/cost-optimization.jpg";
import researchWorkflow from "@/assets/infographics/research-workflow.jpg";
import skillTrustLevels from "@/assets/infographics/skill-trust-levels.jpg";

export const articleHeroImages: Record<string, string> = {
  // Original articles
  "what-are-openclaw-skills": whatAreSkillsHero,
  "how-to-install-openclaw-skills": installSkillsHero,
  "what-is-clawhub": whatAreSkillsHero,
  "openclaw-skills-vs-plugins-vs-mcp": skillsVsPluginsHero,
  "how-to-audit-skill-md": securityAuditHero,
  "best-openclaw-skills-2026": bestSkills2026Hero,
  "how-to-write-skill-md": whatAreSkillsHero,
  "best-openclaw-skills-coding-devops": bestCodingAgentsHero,
  "best-openclaw-skills-marketing-seo": bestMarketingSalesHero,
  "openclaw-skill-not-loading-fixes": securityAuditHero,
  "does-nemoclaw-replace-openclaw": nemoClawHero,

  // Category roundup articles — each gets its own unique hero
  "best-ai-llm-skills-openclaw": bestAiLlmHero,
  "best-search-research-skills-openclaw": bestSearchResearchHero,
  "best-web-frontend-skills-openclaw": bestWebFrontendHero,
  "best-devops-cloud-skills-openclaw": bestDevopsCloudHero,
  "best-browser-automation-skills-openclaw": bestBrowserAutomationHero,
  "best-productivity-skills-openclaw": bestProductivityHero,
  "best-marketing-sales-skills-openclaw": bestMarketingSalesHero,
  "best-coding-agent-skills-openclaw": bestCodingAgentsHero,
  "best-notes-pkm-skills-openclaw": bestNotesPkmHero,
  "best-health-fitness-skills-openclaw": bestHealthFitnessHero,

  // Deep-dive & guide articles
  "multi-agent-orchestration-guide": multiAgentHero,
  "best-skills-content-creators": bestContentCreatorsHero,
  "security-audit-checklist-openclaw-skills": securityAuditHero,
  "getting-started-openclaw-skills-beginner": gettingStartedHero,
  "openclaw-skills-security": securityAuditHero,
  "how-to-create-openclaw-skills": howToCreateSkillsHero,
  "best-openclaw-skills-for-developers": bestCodingAgentsHero,
  "best-openclaw-skills-for-founders": bestFoundersHero,
  "openclaw-gmail-skill": gmailSkillHero,
  "openclaw-slack-skill": slackSkillHero,
  "openclaw-mcp-vs-skills": mcpVsSkillsHero,
  "openclaw-skills-examples": installSkillsHero,
  "best-openclaw-alternatives": alternativesHero,
};

/** Infographics mapped to article slugs — rendered inline between sections */
export interface ArticleInfographic {
  src: string;
  alt: string;
  caption: string;
  /** Insert after this section index (0-based) */
  afterSection: number;
}

export const articleInfographics: Record<string, ArticleInfographic[]> = {
  "best-ai-llm-skills-openclaw": [
    {
      src: aiPipelineArchitecture,
      alt: "OpenClaw AI Pipeline Architecture — Routing, Context, and Orchestration layers",
      caption: "AI Pipeline Architecture: How routing, context management, and orchestration layers work together in a production OpenClaw deployment.",
      afterSection: 1,
    },
    {
      src: costOptimization,
      alt: "AI cost optimization comparison — 60-70% cost reduction with OpenClaw skill stack",
      caption: "Cost Optimization: Teams using the LLM Router + Prompt Optimizer + Token Counter stack report 60-70% reduction in AI spend.",
      afterSection: 2,
    },
  ],
  "best-search-research-skills-openclaw": [
    {
      src: researchWorkflow,
      alt: "Research workflow — Discover, Extract, Synthesize, Verify, Publish",
      caption: "The 5-step research workflow: From discovery to publication, each step maps to specific OpenClaw skills.",
      afterSection: 0,
    },
  ],
  "security-audit-checklist-openclaw-skills": [
    {
      src: securityAuditChecklist,
      alt: "Security audit checklist for AI skills — 5 essential steps",
      caption: "Security Audit Checklist: Follow these 5 steps before installing any OpenClaw skill into production.",
      afterSection: 0,
    },
    {
      src: skillTrustLevels,
      alt: "OpenClaw Skill Trust Levels pyramid — Verified, Community, Unreviewed",
      caption: "Skill Trust Levels: Understanding the three tiers of trust in the OpenClaw ecosystem.",
      afterSection: 1,
    },
  ],
  "openclaw-skills-security": [
    {
      src: skillTrustLevels,
      alt: "OpenClaw Skill Trust Levels pyramid — Verified, Community, Unreviewed",
      caption: "Trust Pyramid: How OpenClaw categorizes skills by verification level to keep your workflows safe.",
      afterSection: 0,
    },
    {
      src: securityAuditChecklist,
      alt: "Security audit checklist for AI skills",
      caption: "Quick-reference security audit checklist for vetting new OpenClaw skills.",
      afterSection: 1,
    },
  ],
  "getting-started-openclaw-skills-beginner": [
    {
      src: skillTrustLevels,
      alt: "OpenClaw Skill Trust Levels — Verified, Community, Unreviewed",
      caption: "Before installing skills, understand the trust tiers: Verified skills are audited, Community skills are peer-reviewed, and Unreviewed skills should be tested in a sandbox.",
      afterSection: 0,
    },
  ],
  "multi-agent-orchestration-guide": [
    {
      src: aiPipelineArchitecture,
      alt: "Multi-agent orchestration architecture diagram",
      caption: "Multi-Agent Architecture: How the orchestration layer coordinates specialized agents through routing and context management.",
      afterSection: 0,
    },
  ],
};
