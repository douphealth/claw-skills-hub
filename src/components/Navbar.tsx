import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CommandPalette from "@/components/CommandPalette";
import logoIcon from "@/assets/logo-icon.png";

const navItems = [
  { label: "Skills", href: "/skills" },
  { label: "Install", href: "/install" },
  { label: "Versions", href: "/versions" },
  { label: "Articles", href: "/articles" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Glossary", href: "/glossary" },
  { label: "Pro Bundle", href: "/pro-bundle", highlight: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoIcon} alt="ClawSkills logo" className="w-8 h-8 rounded-lg" />
          <span className="text-lg font-bold text-foreground">
            Claw<span className="text-primary">Skills</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <CommandPalette />
          <Link to="/skills">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
              Explore Skills
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden text-muted-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass-strong border-t border-border"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm text-muted-foreground hover:text-primary py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/skills" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="bg-primary text-primary-foreground mt-2 w-full">
                Explore Skills
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
