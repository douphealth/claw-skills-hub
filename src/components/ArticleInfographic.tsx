import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  caption: string;
}

const ArticleInfographic = ({ src, alt, caption }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="my-8 sm:my-12"
      >
        <div
          className="relative group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden glass"
          onClick={() => setExpanded(true)}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass rounded-full p-3">
              <ZoomIn className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
        <figcaption className="mt-3 text-xs sm:text-sm text-muted-foreground text-center leading-relaxed px-2">
          {caption}
        </figcaption>
      </motion.figure>

      {/* Fullscreen lightbox */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setExpanded(false)}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={src}
            alt={alt}
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
          />
          <p className="absolute bottom-6 text-xs sm:text-sm text-muted-foreground text-center max-w-2xl">
            {caption} — <span className="text-primary">Click anywhere to close</span>
          </p>
        </div>
      )}
    </>
  );
};

export default ArticleInfographic;
