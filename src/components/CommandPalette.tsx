import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Zap, FileText, BookOpen } from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { skills, categories } from "@/data/skills";
import { articles } from "@/data/articles";
import { tutorials } from "@/data/tutorials";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  // Pre-compute top skills (first 30 for performance)
  const topSkills = useMemo(() => skills.slice(0, 30), []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-muted-foreground bg-secondary/50 border border-border hover:border-primary/40 transition-colors"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search…</span>
        <kbd className="ml-2 px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted border border-border">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search skills, articles, tutorials…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Skills">
            {topSkills.map((skill) => (
              <CommandItem
                key={skill.slug}
                value={`${skill.name} ${skill.category}`}
                onSelect={() => go(`/skills/${skill.categorySlug}/${skill.slug}`)}
              >
                <Zap className="mr-2 h-4 w-4 text-primary" />
                <div className="flex flex-col">
                  <span>{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.category}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Articles">
            {articles.map((article) => (
              <CommandItem
                key={article.slug}
                value={article.title}
                onSelect={() => go(`/articles/${article.slug}`)}
              >
                <FileText className="mr-2 h-4 w-4 text-primary" />
                <span>{article.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Tutorials">
            {tutorials.map((tutorial) => (
              <CommandItem
                key={tutorial.slug}
                value={tutorial.title}
                onSelect={() => go(`/tutorials/${tutorial.slug}`)}
              >
                <BookOpen className="mr-2 h-4 w-4 text-primary" />
                <span>{tutorial.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Categories">
            {categories.map((cat) => (
              <CommandItem
                key={cat.slug}
                value={cat.name}
                onSelect={() => go(`/skills?category=${cat.slug}`)}
              >
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{cat.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;
