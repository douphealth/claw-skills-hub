import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Star, Terminal, Copy, Check, ArrowRight, Calendar, RefreshCw } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import SEOHead from "@/components/SEOHead";
import { getArticleBySlug, articles, type ArticleVideo } from "@/data/articles";
import { getSkillBySlug } from "@/data/skills";
import { articleJsonLd as makeArticleJsonLd, breadcrumbJsonLd, faqJsonLd, videoObjectJsonLd } from "@/utils/jsonLd";
import { articleHeroImages, articleInfographics } from "@/data/articleImages";
import RelatedContent from "@/components/RelatedContent";
import ArticleInfographic from "@/components/ArticleInfographic";

/** Extract Q&A pairs from FAQ sections using the **Question?**\nAnswer format */
function extractFaqsFromArticle(sections: { heading: string; content: string }[]) {
  const faqs: { question: string; answer: string }[] = [];
  sections.forEach((s) => {
    if (!s.heading.toLowerCase().startsWith("faq")) return;
    const regex = /\*\*(.+?\?)\*\*\n(.+?)(?=\n\n\*\*|\n*$)/gs;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(s.content)) !== null) {
      faqs.push({
        question: m[1].trim(),
        answer: m[2].replace(/\[\[([^|]+)\|[^\]]+\]\]/g, "$1").trim(),
      });
    }
  });
  return faqs;
}

const ArticlePage = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const navigate = useNavigate();
  const article = getArticleBySlug(articleSlug || "");

  const handleCopy = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // Handle internal [[]] link clicks for SPA navigation
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[data-internal="true"]');
      if (target) {
        e.preventDefault();
        const href = target.getAttribute("href");
        if (href) navigate(href);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [navigate]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link to="/articles"><Button>Browse All Articles</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const aJsonLd = makeArticleJsonLd(article);
  const bJsonLd = breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Articles", url: "/articles" },
    { name: article.title, url: `/articles/${article.slug}` },
  ]);

  // Extract FAQs from FAQ-headed sections for rich results
  const extractedFaqs = extractFaqsFromArticle(article.sections);
  const fJsonLd = extractedFaqs.length > 0 ? faqJsonLd(extractedFaqs) : undefined;

  // VideoObject schema for embedded YouTube videos
  const vJsonLd = article.videos?.length
    ? article.videos.map((v) =>
        videoObjectJsonLd(v.id, v.title, article.title, article.publishedDate)
      )
    : [];

  const allJsonLd = [aJsonLd, bJsonLd, ...(fJsonLd ? [fJsonLd] : []), ...vJsonLd];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.metaTitle || article.title}
        description={article.metaDescription || article.heroDescription}
        canonical={`https://openclaw-skillshub.com/articles/${article.slug}`}
        type="article"
        publishedDate={article.publishedDate}
        updatedDate={article.updatedDate}
        jsonLd={allJsonLd}
      />
      <Navbar />

      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
        {articleHeroImages[article.slug] ? (
          <>
            <div className="absolute inset-0">
              <img
                src={articleHeroImages[article.slug]}
                alt={`${article.title} — hero illustration`}
                className="w-full h-full object-cover opacity-25"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 grid-pattern opacity-15" />
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-glow opacity-[0.04] blur-[100px]" />
          </>
        )}

        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 sm:mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink asChild><Link to="/articles">Articles</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage className="truncate max-w-[180px] sm:max-w-[200px]">{article.title}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-3 sm:mb-4 bg-primary/10 text-primary border-primary/20">{article.tag}</Badge>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8">
              {article.heroDescription}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4" />{article.readTime}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4" />Published {article.publishedDate}</span>
              <span className="flex items-center gap-1.5"><RefreshCw className="w-3 sm:w-3.5 h-3 sm:h-3.5" />Updated {article.updatedDate}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-4">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass rounded-xl p-4 sm:p-6 border-l-4 border-primary"
          >
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">TL;DR — Key Takeaways</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {article.metaDescription} This guide covers {article.skills.length} curated skills including{" "}
              {article.skills.slice(0, 3).map(s => s.name).join(", ")}
              {article.skills.length > 3 ? `, and ${article.skills.length - 3} more` : ""}.
              Each skill is independently rated, reviewed, and installable via a single CLI command.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {article.sections.map((section, i) => {
            const infographicsForSection = (articleInfographics[article.slug] || []).filter(
              (inf) => inf.afterSection === i
            );
            return (
              <div key={i}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-12">
                  <h2 id={`section-${i}`} className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">{section.heading}</h2>
                  <div className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-3 sm:space-y-4">
                    {section.content.split("\n\n").map((p, j) => {
                      const processed = p
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                        .replace(
                          /\[\[(.*?)\|(.*?)\]\]/g,
                          (_, text, path) => `<a href="${path}" data-internal="true" class="text-primary hover:underline font-medium transition-colors">${text}</a>`
                        );
                      return <p key={j} dangerouslySetInnerHTML={{ __html: processed }} />;
                    })}
                  </div>
                </motion.div>
                {infographicsForSection.map((inf, k) => (
                  <ArticleInfographic key={k} src={inf.src} alt={inf.alt} caption={inf.caption} width={inf.width} height={inf.height} />
                ))}
              </div>
            );
          })}

          {/* YouTube Videos */}
          {article.videos && article.videos.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">📺 Watch: Related Videos</h2>
              <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                {article.videos.map((video) => (
                  <div key={video.id} className="glass rounded-xl overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full border-0"
                      />
                    </div>
                    <p className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-foreground">{video.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Skills */}
          <div className="space-y-6 sm:space-y-8">
            {article.skills.map((skill, i) => (
              <motion.div
                key={skill.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl sm:rounded-2xl p-5 sm:p-8 card-hover"
              >
                <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 flex-wrap">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">#{i + 1}</span>
                      <h3 className="text-base sm:text-xl font-bold text-foreground">{skill.name}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 shrink-0">
                    <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current" />
                    <span className="text-xs sm:text-sm font-medium">{skill.rating}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">{skill.whyPicked}</p>

                <div className="flex items-center justify-between gap-2 sm:gap-4 glass rounded-lg p-2.5 sm:p-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <Terminal className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary shrink-0" />
                    <code className="font-mono text-[11px] sm:text-sm text-muted-foreground truncate">
                      <span className="text-primary">npx</span> clawhub@latest install <span className="text-foreground">{skill.slug}</span>
                    </code>
                  </div>
                  <button onClick={() => handleCopy(skill.installCmd, i)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    {copiedIdx === i ? <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-green-400" /> : <Copy className="w-3.5 sm:w-4 h-3.5 sm:h-4" />}
                  </button>
                </div>

                <div className="mt-3 sm:mt-4 flex justify-end">
                  {(() => {
                    const fullSkill = getSkillBySlug(skill.slug);
                    const href = fullSkill
                      ? `/skills/${fullSkill.categorySlug}/${fullSkill.slug}`
                      : `/skills`;
                    return (
                      <Link to={href} className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1">
                        Full skill review <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                      </Link>
                    );
                  })()}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Related Content internal links */}
          <RelatedContent
            title="Continue Reading"
            links={[
              { title: "Installation Command Center", url: "/install", description: "Get copy-paste install commands for every skill on macOS, Linux, and Windows" },
              ...otherArticles.slice(0, 3).map(a => ({ title: a.title, url: `/articles/${a.slug}`, description: a.heroDescription })),
              { title: "Browse All Skills", url: "/skills", description: "Search and filter 5,705+ curated OpenClaw skills" },
            ]}
          />
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">More Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {otherArticles.map((a) => (
              <Link key={a.slug} to={`/articles/${a.slug}`} className="group glass rounded-xl p-4 sm:p-5 card-hover">
                <Badge variant="outline" className="text-[10px] mb-2 sm:mb-3 border-border text-muted-foreground">{a.tag}</Badge>
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5 sm:mb-2 line-clamp-2">{a.title}</h4>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="w-2.5 h-2.5" />{a.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default ArticlePage;
