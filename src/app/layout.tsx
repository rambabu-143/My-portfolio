import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
