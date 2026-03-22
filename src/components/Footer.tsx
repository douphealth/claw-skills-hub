import { Link } from "react-router-dom";
import { categories } from "@/data/skills";
import logoIcon from "@/assets/logo-icon.png";
import { buildInfo } from "@/lib/buildInfo";

const Footer = () => {
  const topCategories = categories.slice(0, 5);

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logoIcon} alt="ClawSkills logo" className="w-7 h-7 rounded-md" />
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
              {topCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/skills/${cat.slug}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/articles" className="text-xs text-muted-foreground hover:text-primary transition-colors">Best Skills Lists</Link></li>
              <li><Link to="/tutorials" className="text-xs text-muted-foreground hover:text-primary transition-colors">Tutorials</Link></li>
              <li><Link to="/glossary" className="text-xs text-muted-foreground hover:text-primary transition-colors">Glossary</Link></li>
              <li><Link to="/tutorials/openclaw-skill-security-checklist" className="text-xs text-muted-foreground hover:text-primary transition-colors">Security Guide</Link></li>
              <li><a href="/#newsletter" className="text-xs text-muted-foreground hover:text-primary transition-colors">Newsletter</a></li>
              <li><a href="/llms.txt" className="text-xs text-muted-foreground hover:text-primary transition-colors">llms.txt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Community</h4>
            <ul className="space-y-2">
              <li><a href="https://discord.gg/openclaw" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">Discord</a></li>
              <li><a href="https://t.me/openclawcommunity" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">Telegram</a></li>
              <li><a href="https://github.com/openclaw" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="https://twitter.com/openclaw" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 pb-2">
          <div className="flex flex-col items-center gap-4 mb-6">
            <p className="text-xs text-muted-foreground font-medium">
              Created by <span className="text-foreground font-semibold">Alexios Papaioannou</span>
            </p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 max-w-lg">
              {[
                { name: "GearUpToFit", url: "https://gearuptofit.com" },
                { name: "AffiliateMarketingForSuccess", url: "https://affiliatemarketingforsuccess.com" },
                { name: "MysticalDigits", url: "https://mysticaldigits.com" },
                { name: "FrenchyFab", url: "https://frenchyfab.com" },
                { name: "MiceGoneGuide", url: "https://micegoneguide.com" },
                { name: "GearUpToGrow", url: "https://gearuptogrow.com" },
                { name: "PlantasticHaven", url: "https://plantastichaven.com" },
                { name: "EfficientGPTPrompts", url: "https://efficientgptprompts.com" },
                { name: "OutdoorMisting", url: "https://outdoormisting.com" },
              ].map((site, i, arr) => (
                <span key={site.url} className="text-[11px]">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/70 hover:text-primary transition-colors"
                  >
                    {site.name}
                  </a>
                  {i < arr.length - 1 && <span className="text-muted-foreground/40 ml-1">·</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">
                © 2026 ClawSkills. Not affiliated with OpenClaw.{" "}
                <span
                  className="text-muted-foreground/50"
                  title={`Commit: ${buildInfo.commit} • Built: ${buildInfo.time}`}
                >
                  v{buildInfo.version}
                </span>
              </p>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
