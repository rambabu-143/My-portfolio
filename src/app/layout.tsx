import type { Metadata } from "next";
import "./globals.css";
import Ripple from "@/components/ripple";
import JsonLd from "@/components/json-ld";
import { description, person, siteUrl } from "@/lib/site";

const title = "Rambabu Arabandi | AI Engineer & Full-Stack Developer";
const socialImage = {
  url: `${siteUrl}/social-preview.png`,
  width: 1200,
  height: 630,
  alt: "Rambabu Arabandi — AI Engineer building production voice AI, GraphRAG and MCP developer tooling",
};

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  alternates: { canonical: `${siteUrl}/` },
  title,
  description,
  keywords: [
    "AI Engineer",
    "AI Engineer Hyderabad",
    "Full-Stack Developer",
    "Generative AI Engineer",
    "Agentic Systems",
    "Voice AI",
    "LiveKit Agents",
    "MCP Servers",
    "Model Context Protocol",
    "RAG",
    "GraphRAG",
    "RAGAS",
    "DeepEval",
    "LangGraph",
    "LangChain",
    "n8n Automation",
    "Go",
    "Python",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "Rambabu Arabandi",
  ],
  authors: [{ name: person.name, url: `${siteUrl}/` }],
  creator: person.name,
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: `${siteUrl}/`,
    title,
    description,
    siteName: "Rambabu Arabandi Portfolio",
    images: [socialImage],
  },
  twitter: { card: "summary_large_image", images: [socialImage], title, description, creator: "@rambabu_143" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: person.name,
      alternateName: person.alternateName,
      jobTitle: person.jobTitle,
      description,
      url: `${siteUrl}/`,
      image: `${siteUrl}/hero.jpg`,
      email: `mailto:${person.email}`,
      address: { "@type": "PostalAddress", addressLocality: person.city, addressCountry: person.country },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Bharat Institute of Engineering and Technology" },
      knowsAbout: person.knowsAbout,
      sameAs: person.sameAs,
    },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: `${siteUrl}/`, name: "Rambabu Arabandi Portfolio", inLanguage: "en", publisher: { "@id": `${siteUrl}/#person` } },
    { "@type": "ProfilePage", "@id": `${siteUrl}/#profile`, url: `${siteUrl}/`, name: title, mainEntity: { "@id": `${siteUrl}/#person` }, isPartOf: { "@id": `${siteUrl}/#website` } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t!=="light")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="font-sans bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <filter id="liquid-refract" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <JsonLd data={jsonLd} />
        <Ripple />
        {children}
      </body>
    </html>
  );
}
