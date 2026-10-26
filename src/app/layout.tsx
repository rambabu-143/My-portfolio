import type { Metadata } from "next";
import "./globals.css";
import Ripple from "@/components/ripple";

const siteUrl = "https://rambabu-143.github.io/My-portfolio/";
const socialImage = {
  url: `${siteUrl}social-preview.png`,
  width: 1200,
  height: 630,
  alt: "Rambabu Arabandi — AI Engineer building production voice AI, GraphRAG and MCP developer tooling",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl },
  title: "Rambabu Arabandi | AI Engineer",
  description:
    "AI Engineer building production voice agents handling 500+ daily calls, MCP developer tooling, and GraphRAG workflows evaluated with RAGAS and DeepEval.",
  keywords: [
    "AI Engineer",
    "Agentic Systems",
    "MCP Servers",
    "n8n Automation",
    "Voice AI",
    "LiveKit Agents",
    "RAG",
    "GraphRAG",
    "RAGAS",
    "DeepEval",
    "Go",
    "LangGraph",
    "LangChain",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Rambabu Arabandi" }],
  creator: "Rambabu Arabandi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rambabu-143.github.io/My-portfolio/",
    title: "Rambabu Arabandi | AI Engineer",
    description:
      "AI Engineer building production voice agents handling 500+ daily calls, MCP developer tooling, and GraphRAG workflows evaluated with RAGAS and DeepEval.",
    siteName: "Rambabu Arabandi Portfolio",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [socialImage],
    title: "Rambabu Arabandi | AI Engineer",
    description:
      "AI Engineer building production voice agents handling 500+ daily calls, MCP developer tooling, and GraphRAG workflows evaluated with RAGAS and DeepEval.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Ripple />
        {children}
      </body>
    </html>
  );
}
