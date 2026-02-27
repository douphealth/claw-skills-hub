import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Star, Terminal, Copy, Check, ArrowRight, Calendar, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import SEOHead from "@/components/SEOHead";
import { getArticleBySlug, articles } from "@/data/articles";
import { articleJsonLd as makeArticleJsonLd, breadcrumbJsonLd } from "@/utils/jsonLd";

const ArticlePage = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const article = getArticleBySlug(articleSlug || "");

  const handleCopy = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={article.metaTitle || article.title}
        description={article.metaDescription || article.heroDescription}
        type="article"
        publishedDate={article.publishedDate}
        updatedDate={article.updatedDate}
        jsonLd={[aJsonLd, bJsonLd]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-glow opacity-[0.04] blur-[100px]" />

        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/articles" className="hover:text-primary transition-colors">Articles</Link>
            <span>/</span>
            <span className="text-foreground truncate">{article.title}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">{article.tag}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {article.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {article.heroDescription}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />Published {article.publishedDate}</span>
              <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" />Updated {article.updatedDate}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Intro sections */}
          {article.sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">{section.heading}</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                {section.content.split("\n\n").map((p, j) => {
                  // Process bold and internal links [[text|/path]]
                  const processed = p
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                    .replace(/\[\[(.*?)\|(.*?)\]\]/g, '<a href="$2" class="text-primary hover:underline font-medium transition-colors">$1</a>');
                  return <p key={j} dangerouslySetInnerHTML={{ __html: processed }} />;
                })}
              </div>
            </motion.div>
          ))}

          {/* Skills */}
          <div className="space-y-8">
            {article.skills.map((skill, i) => (
              <motion.div
                key={skill.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-8 card-hover"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">#{i + 1}</span>
                      <h3 className="text-xl font-bold text-foreground">{skill.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 shrink-0">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{skill.rating}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">{skill.whyPicked}</p>

                <div className="flex items-center justify-between gap-4 glass rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-primary shrink-0" />
                    <code className="font-mono text-sm text-muted-foreground">
                      <span className="text-primary">npx</span> clawhub@latest install <span className="text-foreground">{skill.slug}</span>
                    </code>
                  </div>
                  <button onClick={() => handleCopy(skill.installCmd, i)} className="text-muted-foreground hover:text-foreground transition-colors">
                    {copiedIdx === i ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="mt-4 flex justify-end">
                  <Link to={`/skills/${skill.slug}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                    Full skill review <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related articles */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">More Articles</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherArticles.map((a) => (
              <Link key={a.slug} to={`/articles/${a.slug}`} className="group glass rounded-xl p-5 card-hover">
                <Badge variant="outline" className="text-[10px] mb-3 border-border text-muted-foreground">{a.tag}</Badge>
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">{a.title}</h4>
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
