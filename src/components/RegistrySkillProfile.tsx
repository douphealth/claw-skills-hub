import { Link } from "react-router-dom";
import { useState } from "react";
import { Copy, Check, ExternalLink, Download, Package, Star, AlertTriangle, Wrench, Users, Info } from "lucide-react";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RelatedContent from "@/components/RelatedContent";
import type { Category, Skill } from "@/data/skills";
import { clawhubUrl, installCommand, type RegistryListing, type RegistryProfile } from "@/data/skillRegistry";
import { faqJsonLd, breadcrumbJsonLd } from "@/utils/jsonLd";
import { categoryPath, skillPath, skillUrl } from "@/lib/routeUrls";

const fmt = (n: number) => n.toLocaleString("en-US");
const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Schema.org data built only from registry facts: no rating, review or price. */
export function registrySkillJsonLd(skill: Skill, profile: RegistryProfile) {
  return profile.listings.map((l) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${l.displayName} (@${l.owner}/${skill.slug})`,
    description: l.summary,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "OpenClaw skill",
    softwareVersion: l.version,
    author: { "@type": "Person", name: l.owner },
    sameAs: clawhubUrl(l.owner, skill.slug),
  }));
}

const CopyCommand = ({ cmd }: { cmd: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-4 py-3 font-mono text-sm">
      <code className="flex-1 text-foreground break-all">{cmd}</code>
      <button
        type="button"
        aria-label={`Copy ${cmd}`}
        className="text-muted-foreground hover:text-foreground shrink-0"
        onClick={() => {
          navigator.clipboard.writeText(cmd);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};

const ListingCard = ({ slug, listing, rank, total }: { slug: string; listing: RegistryListing; rank: number; total: number }) => (
  <article className="glass rounded-xl p-6" id={`listing-${listing.owner}`}>
    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
      <h3 className="text-xl font-bold text-foreground">
        {listing.displayName} <span className="text-muted-foreground font-normal text-base">by @{listing.owner}</span>
      </h3>
      {total > 1 && <span className="text-xs text-muted-foreground">#{rank} of {total} by downloads</span>}
    </div>
    <p className="text-muted-foreground leading-relaxed mt-3">{listing.summary}</p>

    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 text-sm">
      <div><dt className="text-muted-foreground flex items-center gap-1"><Download className="w-3.5 h-3.5" />Downloads</dt><dd className="text-foreground font-semibold">{fmt(listing.downloads)}</dd></div>
      <div><dt className="text-muted-foreground flex items-center gap-1"><Users className="w-3.5 h-3.5" />Installs</dt><dd className="text-foreground font-semibold">{fmt(listing.installs)}</dd></div>
      <div><dt className="text-muted-foreground flex items-center gap-1"><Star className="w-3.5 h-3.5" />Stars</dt><dd className="text-foreground font-semibold">{fmt(listing.stars)}</dd></div>
      <div><dt className="text-muted-foreground flex items-center gap-1"><Package className="w-3.5 h-3.5" />Version</dt><dd className="text-foreground font-semibold">{listing.version}</dd></div>
      <div><dt className="text-muted-foreground">Listed since</dt><dd className="text-foreground">{fmtDate(listing.listedSince)}</dd></div>
      <div><dt className="text-muted-foreground">Licence</dt><dd className="text-foreground">{listing.license ?? "None shown"}</dd></div>
      <div><dt className="text-muted-foreground">ClawHub review</dt><dd className="text-foreground">{listing.reviewVerdict ? `${listing.reviewVerdict} (automated)` : "No verdict shown"}</dd></div>
      <div><dt className="text-muted-foreground">SKILL.md language</dt><dd className="text-foreground">{listing.language}</dd></div>
    </dl>

    <p className="text-sm font-semibold text-foreground mb-2">Install</p>
    <CopyCommand cmd={installCommand(listing.owner, slug)} />

    <div className="grid sm:grid-cols-2 gap-5 mt-5">
      <div>
        <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5"><Wrench className="w-4 h-4 text-primary" />What it needs</p>
        <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
          {listing.requires.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-yellow-400" />Before you install</p>
        <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
          {listing.caveats.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>
    </div>

    <div className="flex flex-wrap gap-4 mt-5 text-sm">
      <a href={clawhubUrl(listing.owner, slug)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
        View @{listing.owner}/{slug} and its SKILL.md on ClawHub <ExternalLink className="w-3.5 h-3.5" />
      </a>
      {listing.homepage && (
        <a href={listing.homepage} target="_blank" rel="noopener noreferrer nofollow" className="text-muted-foreground hover:underline inline-flex items-center gap-1">
          Publisher homepage <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  </article>
);

interface Props {
  skill: Skill;
  profile: RegistryProfile;
  category?: Category;
  related: Skill[];
}

const RegistrySkillProfile = ({ skill, profile, category, related }: Props) => {
  const { listings } = profile;
  const primary = listings[0];
  const multi = listings.length > 1;
  const pagePath = skillPath(skill.categorySlug, skill.slug);
  const checked = fmtDate(profile.checked);

  const answer = multi
    ? `${listings.length} publishers use the ${skill.slug} slug on ClawHub, so you must name the owner when installing. The most downloaded is @${primary.owner}'s ${primary.displayName} (${fmt(primary.downloads)} downloads, ${fmt(primary.installs)} installs).`
    : `${skill.slug} is published on ClawHub by @${primary.owner} (version ${primary.version}, ${fmt(primary.downloads)} downloads, ${fmt(primary.installs)} installs). Install it with ${installCommand(primary.owner, skill.slug)}.`;

  const jsonLd = [
    ...registrySkillJsonLd(skill, profile),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Skills", url: "/skills/" },
      ...(category ? [{ name: category.name, url: categoryPath(category.slug) }] : []),
      { name: skill.name, url: pagePath },
    ]),
    ...(skill.faqs.length ? [faqJsonLd(skill.faqs)!] : []),
  ];

  const relatedLinks = [
    { title: `More ${skill.category} skills`, url: categoryPath(skill.categorySlug), description: `Other skills in the ${skill.category} category` },
    { title: "Install Center", url: "/install/", description: "Setting up OpenClaw and the ClawHub CLI" },
    ...related
      .filter((r) => r.registry)
      .slice(0, 3)
      .map((r) => ({ title: r.name, url: skillPath(r.categorySlug, r.slug), description: r.description.slice(0, 90) })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${skill.name} OpenClaw Skill: Install & Requirements`}
        description={skill.description.slice(0, 158)}
        canonical={skillUrl(skill.categorySlug, skill.slug)}
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />

      <main className="container mx-auto px-6 pt-28 pb-24">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/skills/">Skills</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            {category && (
              <>
                <BreadcrumbItem><BreadcrumbLink asChild><Link to={categoryPath(category.slug)}>{category.name}</Link></BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem><BreadcrumbPage>{skill.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{skill.name} OpenClaw skill</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">{answer}</p>
          <p className="text-muted-foreground leading-relaxed mb-4">{skill.longDescription}</p>
          <p className="text-sm text-muted-foreground flex items-start gap-2 mb-10">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Figures and descriptions come from the public ClawHub registry and each listing's SKILL.md, checked on {checked}.
              We have not installed, run or audited these skills, and this page carries no rating of ours.
            </span>
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {multi ? `The ${listings.length} ${skill.slug} skills on ClawHub` : `${primary.displayName} on ClawHub`}
            </h2>
            {multi && (
              <p className="text-muted-foreground mb-6">
                Running <code className="font-mono text-sm">clawhub install {skill.slug}</code> without an owner is ambiguous. Pick a listing and use its owner-qualified command.
              </p>
            )}
            <div className="space-y-6 mt-4">
              {listings.map((l, i) => <ListingCard key={l.owner} slug={skill.slug} listing={l} rank={i + 1} total={listings.length} />)}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">What people use it for</h2>
            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
              {skill.useCases.map((u) => <li key={u}>{u}</li>)}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">How to install {skill.slug}</h2>
            <ol className="space-y-4 text-muted-foreground list-decimal pl-5">
              <li>
                Install the ClawHub CLI: <code className="font-mono text-sm text-foreground">npm i -g clawhub</code>
              </li>
              <li>
                Look at the files before installing: <code className="font-mono text-sm text-foreground">clawhub inspect @{primary.owner}/{skill.slug}</code>
              </li>
              <li>
                Install it (by default into <code className="font-mono text-sm">skills/{skill.slug}</code> under your working directory): <code className="font-mono text-sm text-foreground">{installCommand(primary.owner, skill.slug)}</code>
                {multi && " (swap in the owner of the listing you chose)"}
              </li>
              <li>Set up anything listed under "What it needs" (API keys go in environment variables, never in the chat).</li>
            </ol>
          </section>

          {skill.faqs.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Frequently asked questions</h2>
              <div className="space-y-4">
                {skill.faqs.map((f) => (
                  <div key={f.question} className="glass rounded-xl p-5">
                    <h3 className="font-semibold text-foreground mb-2">{f.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <RelatedContent title="Related" links={relatedLinks} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegistrySkillProfile;
