import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Calendar, RefreshCw, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { getTutorialBySlug, tutorials } from "@/data/tutorials";

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-400/10 text-green-400 border-green-400/20",
  Intermediate: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  Advanced: "bg-red-400/10 text-red-400 border-red-400/20",
  "All Levels": "bg-primary/10 text-primary border-primary/20",
};

const TutorialPage = () => {
  const { tutorialSlug } = useParams<{ tutorialSlug: string }>();
  const tutorial = getTutorialBySlug(tutorialSlug || "");

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tutorial Not Found</h1>
          <Link to="/tutorials"><Button>Browse All Tutorials</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherTutorials = tutorials.filter((t) => t.slug !== tutorial.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-15" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-glow opacity-[0.04] blur-[120px]" />

        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/tutorials" className="hover:text-primary transition-colors">Tutorials</Link>
            <span>/</span>
            <span className="text-foreground truncate">{tutorial.title}</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className={`mb-4 ${difficultyColor[tutorial.difficulty]}`}>{tutorial.difficulty}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {tutorial.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {tutorial.heroDescription}
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{tutorial.readTime}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{tutorial.publishedDate}</span>
              <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" />Updated {tutorial.updatedDate}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pb-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> Table of Contents
            </h3>
            <ol className="space-y-2">
              {tutorial.sections.map((section, i) => (
                <li key={i}>
                  <a href={`#section-${i}`} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="text-xs text-primary/60 font-mono w-5">{String(i + 1).padStart(2, "0")}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-16">
            {tutorial.sections.map((section, i) => (
              <motion.div
                key={i}
                id={`section-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-bold text-primary bg-primary/10 w-8 h-8 rounded-lg flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-foreground">{section.heading}</h2>
                </div>

                <div className="text-muted-foreground leading-relaxed space-y-4 pl-11">
                  {section.content.split("\n\n").map((p, j) => (
                    <p key={j} dangerouslySetInnerHTML={{
                      __html: p
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                        .replace(/- \*\*(.*?)\*\*/g, '• <strong class="text-foreground">$1</strong>')
                    }} />
                  ))}
                </div>

                {section.codeBlock && (
                  <div className="mt-6 ml-11">
                    <div className="glass rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">{section.codeBlock.language}</span>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="font-mono text-sm text-foreground whitespace-pre-wrap">
                          {section.codeBlock.code}
                        </code>
                      </pre>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Tutorials */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">More Tutorials</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherTutorials.map((t) => (
              <Link key={t.slug} to={`/tutorials/${t.slug}`} className="group glass rounded-xl p-5 card-hover">
                <Badge className={`text-[10px] mb-3 ${difficultyColor[t.difficulty]}`}>{t.difficulty}</Badge>
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">{t.title}</h4>
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="w-2.5 h-2.5" />{t.readTime}</span>
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

export default TutorialPage;
