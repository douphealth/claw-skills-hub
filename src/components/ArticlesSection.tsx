import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, TrendingUp } from "lucide-react";
import { articles } from "@/data/articles";

const ArticlesSection = () => {
  const [featured, ...rest] = articles;

  return (
    <section id="articles" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Guides & Articles</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Best Skills for Every Use Case</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            In-depth reviews and curated lists to help you find exactly what you need.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to={`/articles/${featured.slug}`}
              className="group glass rounded-2xl p-8 card-hover flex flex-col justify-between min-h-[340px] relative overflow-hidden block"
            >
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-glow opacity-[0.04] blur-[80px]" />
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{featured.tag}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{featured.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{featured.heroDescription}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{featured.readTime}</span>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/articles/${article.slug}`}
                  className="group glass rounded-xl p-5 card-hover flex flex-col justify-between h-full block"
                >
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{article.tag}</span>
                    <h4 className="text-sm font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors leading-snug">{article.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{article.heroDescription}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="w-2.5 h-2.5" />{article.readTime}</span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/articles" className="text-sm text-primary hover:underline">View all articles →</Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
