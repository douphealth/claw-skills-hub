import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/data/articles";

const ArticlesIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-glow opacity-[0.04] blur-[100px]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Guides & Articles</span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Best Skills for <span className="text-gradient">Every Use Case</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              In-depth curated lists and reviews to help you find exactly the right OpenClaw skills.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-6">
            {articles.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/articles/${article.slug}`}
                  className="group glass rounded-2xl p-8 card-hover flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div className="flex-1">
                    <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-[10px]">{article.tag}</Badge>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-sm line-clamp-2">
                      {article.heroDescription}
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                      <span>{article.skills.length} skills reviewed</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticlesIndex;
