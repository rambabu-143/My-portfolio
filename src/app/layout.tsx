import type { Metadata } from "next";
import "./globals.css";
import Ripple from "@/components/ripple";

export const metadata: Metadata = {
  title: "Rambabu Arabandi | AI Engineer",
  description:
    "AI Engineer building agentic systems end to end: MCP tooling, n8n automation, hybrid RAG, and multi-agent workflows, plus a production voice AI deployment.",
  keywords: [
    "AI Engineer",
    "Agentic Systems",
    "MCP Servers",
    "n8n Automation",
    "Voice AI",
    "LiveKit Agents",
    "RAG",
    "GraphRAG",
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
      "AI Engineer building agentic systems end to end: MCP tooling, n8n automation, hybrid RAG, and multi-agent workflows, plus a production voice AI deployment.",
    siteName: "Rambabu Arabandi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rambabu Arabandi | AI Engineer",
    description:
      "AI Engineer building agentic systems end to end: MCP tooling, n8n automation, hybrid RAG, and multi-agent workflows, plus a production voice AI deployment.",
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
