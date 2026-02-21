import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rambabu Arabandi | GenAI Developer & Full-Stack Engineer",
  description:
    "GenAI/Full-stack Engineer building production agentic features using Vercel AI SDK and Mastra AI. Specialized in tool calling, routing, structured outputs, and streaming UX with reliability patterns.",
  keywords: [
    "GenAI",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Vercel AI SDK",
    "Mastra AI",
    "LangChain",
    "Node.js",
  ],
  authors: [{ name: "Rambabu Arabandi" }],
  creator: "Rambabu Arabandi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rambabu-143.github.io/My-portfolio/",
    title: "Rambabu Arabandi | GenAI Developer & Full-Stack Engineer",
    description:
      "GenAI/Full-stack Engineer building production agentic features using Vercel AI SDK and Mastra AI.",
    siteName: "Rambabu Arabandi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rambabu Arabandi | GenAI Developer & Full-Stack Engineer",
    description:
      "GenAI/Full-stack Engineer building production agentic features using Vercel AI SDK and Mastra AI.",
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
      <body className={`${inter.className} bg-background text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}