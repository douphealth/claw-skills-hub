import { Shield, ShieldCheck, ShieldAlert, AlertTriangle, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SecurityBadgeProps {
  status: "verified" | "community" | "unreviewed";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const config = {
  verified: {
    icon: ShieldCheck,
    label: "Verified",
    description: "This skill has been reviewed and verified for security by the ClawSkills team. No malicious code or prompt injection detected.",
    badgeClass: "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/15",
  },
  community: {
    icon: Shield,
    label: "Community Reviewed",
    description: "This skill has been reviewed by the community but not officially audited. Use with standard caution.",
    badgeClass: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/15",
  },
  unreviewed: {
    icon: ShieldAlert,
    label: "Unreviewed",
    description: "This skill has not been reviewed for security. It may contain untested code or unexpected system access. Review the skill.md before installing.",
    badgeClass: "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/15",
  },
};

const sizeMap = {
  sm: { icon: "w-3 h-3", text: "text-[10px]", padding: "px-2 py-0.5" },
  md: { icon: "w-3.5 h-3.5", text: "text-xs", padding: "px-3 py-1" },
  lg: { icon: "w-4 h-4", text: "text-sm", padding: "px-4 py-1.5" },
};

const SecurityBadge = ({ status, size = "md", showLabel = true }: SecurityBadgeProps) => {
  const c = config[status];
  const s = sizeMap[size];
  const Icon = c.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className={`${c.badgeClass} ${s.padding} ${s.text} font-medium inline-flex items-center gap-1.5 cursor-help transition-colors`}
        >
          <Icon className={s.icon} />
          {showLabel && c.label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs text-xs leading-relaxed">
        <p className="font-semibold mb-1">{c.label} Skill</p>
        <p className="text-muted-foreground">{c.description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SecurityBadge;

/**
 * A detailed security info panel for the skill detail page sidebar.
 */
export function SecurityInfoPanel({ status }: { status: "verified" | "community" | "unreviewed" }) {
  const c = config[status];
  const Icon = c.icon;

  const warnings = status === "unreviewed"
    ? [
        "Not yet audited for security",
        "May request broad system permissions",
        "Review skill.md source before installing",
      ]
    : status === "community"
    ? [
        "Community-reviewed only",
        "No official audit performed",
        "Generally considered safe",
      ]
    : [
        "Passed ClawSkills security audit",
        "No malicious code detected",
        "Safe for production use",
      ];

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Lock className="w-4 h-4 text-primary" /> Security Status
      </h3>
      <div className={`flex items-center gap-2 mb-4 ${c.badgeClass} rounded-lg px-3 py-2`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{c.label}</span>
      </div>
      <ul className="space-y-2">
        {warnings.map((w, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
            {status === "unreviewed" ? (
              <AlertTriangle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
            ) : status === "community" ? (
              <Shield className="w-3 h-3 text-yellow-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-3 h-3 text-green-400 shrink-0 mt-0.5" />
            )}
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
