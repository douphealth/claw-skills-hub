import { ShieldCheck, Shield, ShieldAlert, Eye, Clock, Users, FileCode, Globe, Lock, Bug, BookOpen, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TrustDimension {
  label: string;
  icon: React.ElementType;
  score: number;
  max: number;
}

function computeTrustDimensions(status: "verified" | "community" | "unreviewed", rating: number, lastUpdated: string): TrustDimension[] {
  const recencyMonths = Math.max(0, (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24 * 30));
  const recency = recencyMonths < 2 ? 10 : recencyMonths < 6 ? 7 : 4;
  const secScore = status === "verified" ? 10 : status === "community" ? 6 : 2;

  return [
    { label: "Security Audit", icon: ShieldCheck, score: secScore, max: 10 },
    { label: "Update Recency", icon: RefreshCw, score: recency, max: 10 },
    { label: "Community Trust", icon: Users, score: Math.round(rating * 2), max: 10 },
    { label: "Documentation", icon: BookOpen, score: status === "verified" ? 9 : 6, max: 10 },
    { label: "Permission Scope", icon: Lock, score: status === "verified" ? 9 : status === "community" ? 7 : 4, max: 10 },
    { label: "Open Source", icon: FileCode, score: 10, max: 10 },
  ];
}

export function computeTrustTotal(status: "verified" | "community" | "unreviewed", rating: number, lastUpdated: string): number {
  const dims = computeTrustDimensions(status, rating, lastUpdated);
  const total = dims.reduce((s, d) => s + d.score, 0);
  const max = dims.reduce((s, d) => s + d.max, 0);
  return Math.round((total / max) * 100);
}

interface TrustScoreProps {
  status: "verified" | "community" | "unreviewed";
  rating: number;
  lastUpdated: string;
  compact?: boolean;
}

const TrustScore = ({ status, rating, lastUpdated, compact = false }: TrustScoreProps) => {
  const dims = computeTrustDimensions(status, rating, lastUpdated);
  const total = computeTrustTotal(status, rating, lastUpdated);

  const color = total >= 80 ? "text-green-400" : total >= 60 ? "text-yellow-400" : "text-red-400";
  const bg = total >= 80 ? "bg-green-400" : total >= 60 ? "bg-yellow-400" : "bg-red-400";

  if (compact) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold cursor-help ${color} bg-secondary/50`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            {total}/100
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p className="font-semibold mb-1">Skill Trust Score</p>
          <p className="text-xs text-muted-foreground">Based on security audit, update recency, community trust, documentation, permissions, and open-source status.</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" /> Trust Score
        </h3>
        <span className={`text-2xl font-bold ${color}`}>{total}<span className="text-sm text-muted-foreground">/100</span></span>
      </div>
      <div className="space-y-3">
        {dims.map((d) => {
          const Icon = d.icon;
          const pct = (d.score / d.max) * 100;
          return (
            <div key={d.label} className="flex items-center gap-3">
              <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground w-28 shrink-0">{d.label}</span>
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${bg}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs text-muted-foreground w-8 text-right">{d.score}/{d.max}</span>
            </div>
          );
        })}
      </div>
      <a href="/trust-methodology" className="text-xs text-primary hover:underline mt-4 block">How we calculate trust scores →</a>
    </div>
  );
};

export default TrustScore;
