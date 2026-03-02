import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, FileJson, FileCode, File, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Skill } from "@/data/skills";
import { downloadSkill, type ExportFormat, formatLabels } from "@/utils/skillExport";

const formatIcons: Record<ExportFormat, React.ReactNode> = {
  markdown: <FileText className="w-4 h-4" />,
  json: <FileJson className="w-4 h-4" />,
  yaml: <FileCode className="w-4 h-4" />,
  txt: <File className="w-4 h-4" />,
};

const formats: ExportFormat[] = ["markdown", "json", "yaml", "txt"];

interface SkillDownloadPanelProps {
  skill: Skill;
}

const SkillDownloadPanel = ({ skill }: SkillDownloadPanelProps) => {
  const [downloaded, setDownloaded] = useState<ExportFormat | null>(null);

  const handleDownload = (format: ExportFormat) => {
    downloadSkill(skill, format);
    setDownloaded(format);
    setTimeout(() => setDownloaded(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-xl p-6"
    >
      <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
        <Download className="w-4 h-4 text-primary" />
        Download Skill
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Export this skill's full documentation in your preferred format.
      </p>
      <div className="space-y-2">
        {formats.map((format) => (
          <Button
            key={format}
            variant="outline"
            className="w-full justify-between text-sm h-10"
            onClick={() => handleDownload(format)}
          >
            <span className="flex items-center gap-2">
              {formatIcons[format]}
              {formatLabels[format]}
            </span>
            {downloaded === format ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Download className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillDownloadPanel;
