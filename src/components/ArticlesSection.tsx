import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { articleHeroImages } from "@/data/articleImages";

const ArticlesSection = () => {
  const [featured, ...rest] = articles;
  const heroImg = articleHeroImages[featured.slug];

  return (
    <section id="articles" className="relative py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Guides & Articles</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">Best Skills for Every Use Case</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            In-depth reviews and curated lists to help you find exactly what you need.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to={`/articles/${featured.slug}`}
              className="group glass rounded-2xl card-hover flex flex-col justify-between min-h-[280px] sm:min-h-[340px] relative overflow-hidden block"
            >
              {heroImg && (
                <div className="absolute inset-0">
                  <img src={heroImg} alt={featured.title} className="w-full h-full object-cover opacity-15 group-hover:opacity-20 transition-opacity" loading="lazy" />
                </div>
              )}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-glow opacity-[0.04] blur-[80px]" />
              <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{featured.tag}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight">{featured.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">{featured.heroDescription}</p>
                </div>
                <div className="flex items-center justify-between mt-4 sm:mt-6">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {rest.map((article, i) => {
              const img = articleHeroImages[article.slug];
              return (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/articles/${article.slug}`}
                    className="group glass rounded-xl card-hover flex flex-col justify-between h-full relative overflow-hidden block"
                  >
                    {img && (
                      <div className="absolute inset-0">
                        <img src={img} alt="" className="w-full h-full object-cover opacity-10 group-hover:opacity-15 transition-opacity" loading="lazy" aria-hidden="true" />
                      </div>
                    )}
                    <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-between h-full">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{article.tag}</span>
                        <h4 className="text-sm font-semibold text-foreground mt-1.5 sm:mt-2 mb-1.5 sm:mb-2 group-hover:text-primary transition-colors leading-snug">{article.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{article.heroDescription}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3 sm:mt-4">
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="w-2.5 h-2.5" />{article.readTime}</span>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link to="/articles" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            View all articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
