import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mustafa Ahmed — AI Automation Engineer | Agentic AI Systems Designer",
  description:
    "Mustafa Ahmed builds agentic AI systems, adaptive RAG applications, intelligent automation, developer tooling and premium digital experiences.",
  metadataBase: new URL("https://mustafa-portfolio.vercel.app"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body>{children}</body>
    </html>
  );
}
