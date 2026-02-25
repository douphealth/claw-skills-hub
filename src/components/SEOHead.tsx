import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  publishedDate?: string;
  updatedDate?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEOHead = ({
  title,
  description,
  canonical,
  type = "website",
  publishedDate,
  updatedDate,
  jsonLd,
}: SEOHeadProps) => {
  const fullTitle = title.includes("ClawSkills") ? title : `${title} | ClawSkills`;
  const safeDesc = description.slice(0, 160);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={safeDesc} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={safeDesc} />
      <meta property="og:type" content={type} />
      {canonical && <meta property="og:url" content={canonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={safeDesc} />

      {type === "article" && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {type === "article" && updatedDate && (
        <meta property="article:modified_time" content={updatedDate} />
      )}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
