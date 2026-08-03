import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Search, Globe, Cloud, Monitor, ListChecks,
  Megaphone, Code2, BookOpen, HeartPulse, ArrowRight,
} from "lucide-react";
import { categories } from "@/data/skills";
import categoriesBg from "@/assets/categories-bg.jpg";
import { categoryPath } from "@/lib/routeUrls";

const iconMap: Record<string, React.ElementType> = {
  Brain, Search, Globe, Cloud, Monitor, ListChecks, Megaphone, Code2, BookOpen, HeartPulse,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CategoriesSection = () => {
  return (
    <section id="skills" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={categoriesBg} alt="" className="w-full h-full object-cover opacity-10" loading="lazy" decoding="async" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Skills Directory</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">Explore by Category</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Browse 5,705+ curated skills organized across 10 categories. Find the perfect tool for your workflow.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4"
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Brain;
            return (
              <motion.div key={cat.name} variants={item}>
                <Link
                  to={categoryPath(cat.slug)}
                  className="group glass rounded-xl p-4 sm:p-5 card-hover cursor-pointer block"
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `hsl(${cat.color} / 0.12)` }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-colors" style={{ color: `hsl(${cat.color})` }} />
                  </div>
                  <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-1">{cat.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{cat.count} skills</p>
                    <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/skills" className="text-sm text-primary hover:underline flex items-center gap-1">
            Browse all 5,705+ skills <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-muted-foreground/30 hidden sm:inline">·</span>
          <Link to="/install" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
            Get install commands <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
