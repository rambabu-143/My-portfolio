import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/json-ld";
import { caseStudies, projects } from "@/lib/project-case-studies";
import { person, siteUrl } from "@/lib/site";

// A crawlable, shareable page per case study (the homepage dialog content is not in the HTML until opened).
export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

const find = (slug: string) => projects.find((p) => p.slug === slug);

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = find(params.slug);
  if (!p) return {};
  const title = `${p.title}: ${p.subtitle} | ${person.name}`;
  const url = `${siteUrl}/work/${p.slug}/`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: p.summary, images: [`${siteUrl}/social-preview.png`] },
    twitter: { card: "summary_large_image", title, description: p.summary },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const p = find(params.slug);
  if (!p) notFound();
  const s = caseStudies[p.kind];
  const url = `${siteUrl}/work/${p.slug}/`;

  return (
    <main className="container-page py-24 max-w-3xl">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: `${p.title}: ${p.subtitle}`,
        headline: s.headline,
        description: p.summary,
        url,
        author: { "@id": `${siteUrl}/#person` },
        keywords: p.tags.join(", "),
        about: p.tags,
      }} />
      <Link href="/#work" className="text-sm text-muted-foreground hover:text-foreground">← All projects</Link>
      <p className="eyebrow mt-8">{p.status} · Case study {p.n}</p>
      <h1 className="font-display font-semibold text-4xl sm:text-5xl mt-3">{p.title}</h1>
      <p className="text-xl text-muted-foreground mt-3">{p.subtitle}</p>
      <p className="mt-6 text-foreground/80 leading-relaxed">{p.summary}</p>
      <p className="mt-4 text-sm text-muted-foreground"><strong className="text-foreground">My focus:</strong> {s.role}. <strong className="text-foreground">Context:</strong> {s.context}.</p>
      <div className="flex flex-wrap gap-2 mt-5">{p.tags.map((t) => <span key={t} className="text-xs chip rounded-full px-2.5 py-1">{t}</span>)}</div>

      <h2 className="font-display font-semibold text-2xl mt-12 mb-3">The challenge</h2>
      <p className="text-foreground/80 leading-relaxed">{p.detail.problem}</p>

      <h2 className="font-display font-semibold text-2xl mt-12 mb-3">How it works</h2>
      <ol className="space-y-5">
        {s.scenes.map((sc) => <li key={sc.title}><h3 className="font-semibold">{sc.title}</h3><p className="text-foreground/80 leading-relaxed mt-1">{sc.body}</p></li>)}
      </ol>

      <h2 className="font-display font-semibold text-2xl mt-12 mb-3">My contribution</h2>
      <ul className="list-disc pl-5 space-y-2 text-foreground/80">{p.detail.built.map((b) => <li key={b}>{b}</li>)}</ul>

      <h2 className="font-display font-semibold text-2xl mt-12 mb-3">Engineering decisions</h2>
      <div className="space-y-5">{s.decisions.map((d) => <div key={d.title}><h3 className="font-semibold">{d.title}</h3><p className="text-foreground/80 leading-relaxed mt-1">{d.body}</p></div>)}</div>

      <h2 className="font-display font-semibold text-2xl mt-12 mb-3">Outcome</h2>
      <p className="text-lg">{p.detail.result}</p>
      <p className="text-sm text-muted-foreground mt-6">{s.evidence}</p>

      <p className="mt-12 text-sm text-muted-foreground">By <Link href="/" className="underline">{person.name}</Link>, {person.jobTitle} in {person.city}.</p>
    </main>
  );
}
