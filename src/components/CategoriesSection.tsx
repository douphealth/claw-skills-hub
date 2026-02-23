import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Search, Globe, Cloud, Monitor, ListChecks,
  Megaphone, Code2, BookOpen, HeartPulse,
} from "lucide-react";
import { categories } from "@/data/skills";

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
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Skills Directory</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Explore by Category</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Browse 5,705+ curated skills organized across 10 categories. Find the perfect tool for your workflow.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Brain;
            return (
              <motion.div key={cat.name} variants={item}>
                <Link
                  to={`/skills?category=${cat.slug}`}
                  className="group glass rounded-xl p-5 card-hover cursor-pointer block"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `hsl(${cat.color} / 0.12)` }}
                  >
                    <Icon className="w-5 h-5 transition-colors" style={{ color: `hsl(${cat.color})` }} />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">{cat.count} skills</p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
