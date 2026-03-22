import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedLink {
  title: string;
  url: string;
  description?: string;
}

interface RelatedContentProps {
  title?: string;
  links: RelatedLink[];
}

const RelatedContent = ({ title = "Related Resources", links }: RelatedContentProps) => {
  if (!links.length) return null;

  return (
    <nav aria-label="Related content" className="glass rounded-2xl p-6 mt-8" data-speakable>
      <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              to={link.url}
              className="group flex items-start gap-3 text-sm hover:text-primary transition-colors"
            >
              <ArrowRight className="w-4 h-4 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              <div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {link.title}
                </span>
                {link.description && (
                  <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">{link.description}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RelatedContent;
