import { motion } from "framer-motion";
import {
  Brain, Search, Globe, Cloud, Monitor, ListChecks,
  Megaphone, Code2, BookOpen, HeartPulse,
} from "lucide-react";

const categories = [
  { name: "AI & LLMs", count: 287, icon: Brain, color: "174 100% 45%" },
  { name: "Search & Research", count: 253, icon: Search, color: "200 90% 50%" },
  { name: "Web & Frontend Dev", count: 202, icon: Globe, color: "260 80% 60%" },
  { name: "DevOps & Cloud", count: 212, icon: Cloud, color: "30 95% 55%" },
  { name: "Browser & Automation", count: 139, icon: Monitor, color: "340 80% 55%" },
  { name: "Productivity & Tasks", count: 135, icon: ListChecks, color: "140 70% 45%" },
  { name: "Marketing & Sales", count: 143, icon: Megaphone, color: "50 90% 55%" },
  { name: "Coding Agents & IDEs", count: 133, icon: Code2, color: "210 90% 55%" },
  { name: "Notes & PKM", count: 100, icon: BookOpen, color: "280 70% 55%" },
  { name: "Health & Fitness", count: 55, icon: HeartPulse, color: "0 80% 55%" },
];

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
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">
            Skills Directory
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore by Category
          </h2>
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
            const Icon = cat.icon;
            return (
              <motion.a
                key={cat.name}
                variants={item}
                href="#"
                className="group glass rounded-xl p-5 card-hover cursor-pointer"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `hsl(${cat.color} / 0.12)` }}
                >
                  <Icon
                    className="w-5 h-5 transition-colors"
                    style={{ color: `hsl(${cat.color})` }}
                  />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {cat.count} skills
                </p>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
