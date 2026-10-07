import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mustafa-portfolio.vercel.app"),
  title: {
    default: "Mustafa Ahmed — AI Automation Engineer | Agentic AI Systems Designer",
    template: "%s · Mustafa Ahmed",
  },
  description:
    "Mustafa Ahmed builds agentic AI systems, adaptive RAG applications, intelligent automation, LLM applications and developer tooling.",
  keywords: [
    "Mustafa Ahmed",
    "AI Automation Engineer",
    "Agentic AI Engineer",
    "LLM Application Developer",
    "RAG",
    "AI Agents",
    "AI Automation",
    "FastAPI",
    "n8n",
  ],
  authors: [{ name: "Mustafa Ahmed", url: "https://github.com/MustafaAhmed007" }],
  creator: "Mustafa Ahmed",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://mustafa-portfolio.vercel.app",
    title: "Mustafa Ahmed — AI Automation Engineer | Agentic AI Systems Designer",
    description:
      "Evidence-first portfolio of AI systems, agentic workflows, RAG applications and automation engineering.",
    siteName: "Mustafa Ahmed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustafa Ahmed — AI Automation Engineer",
    description: "AI systems, agentic workflows, RAG and automation engineering.",
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mustafa Ahmed",
  url: "https://mustafa-portfolio.vercel.app",
  jobTitle: "AI Automation Engineer",
  sameAs: [
    "https://github.com/MustafaAhmed007",
    "https://www.linkedin.com/in/mustafa-ahmed-engineer",
    "https://huggingface.co/MustafaAhmed007",
  ],
  knowsAbout: [
    "Agentic AI",
    "RAG",
    "LLM applications",
    "AI automation",
    "Python",
    "FastAPI",
    "n8n",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
