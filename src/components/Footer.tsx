import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-base font-bold text-foreground">
                Claw<span className="text-primary">Skills</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The definitive resource for OpenClaw skills. Discover, compare, and install with confidence.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Directory</h4>
            <ul className="space-y-2">
              <li><Link to="/skills" className="text-xs text-muted-foreground hover:text-primary transition-colors">All Skills</Link></li>
              <li><Link to="/skills?category=ai-llms" className="text-xs text-muted-foreground hover:text-primary transition-colors">AI & LLMs</Link></li>
              <li><Link to="/skills?category=devops-cloud" className="text-xs text-muted-foreground hover:text-primary transition-colors">DevOps</Link></li>
              <li><Link to="/skills?category=productivity" className="text-xs text-muted-foreground hover:text-primary transition-colors">Productivity</Link></li>
              <li><Link to="/skills?category=marketing-sales" className="text-xs text-muted-foreground hover:text-primary transition-colors">Marketing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/articles" className="text-xs text-muted-foreground hover:text-primary transition-colors">Best Skills Lists</Link></li>
              <li><Link to="/tutorials" className="text-xs text-muted-foreground hover:text-primary transition-colors">Tutorials</Link></li>
              <li><Link to="/tutorials/openclaw-skill-security-checklist" className="text-xs text-muted-foreground hover:text-primary transition-colors">Security Guide</Link></li>
              <li><a href="/#newsletter" className="text-xs text-muted-foreground hover:text-primary transition-colors">Newsletter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Discord</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Telegram</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 ClawSkills. Not affiliated with OpenClaw.</p>
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
