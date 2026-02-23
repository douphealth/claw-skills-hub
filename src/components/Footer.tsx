import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-base font-bold text-foreground">
                Claw<span className="text-primary">Skills</span>
              </span>
            </a>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The definitive resource for OpenClaw skills. Discover, compare, and install with confidence.
            </p>
          </div>

          {[
            {
              title: "Directory",
              links: ["All Skills", "AI & LLMs", "DevOps", "Productivity", "Marketing"],
            },
            {
              title: "Resources",
              links: ["Best Skills Lists", "Tutorials", "Security Guide", "Newsletter"],
            },
            {
              title: "Community",
              links: ["Discord", "Telegram", "GitHub", "Twitter"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 ClawSkills. Not affiliated with OpenClaw.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
