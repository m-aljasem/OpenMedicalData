import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "OMeD - Open Medical Datasets",
  description: "A search engine and community platform for sharing links to real-world, open, and free medical datasets",
  keywords: ["medical datasets", "open data", "healthcare", "research", "datasets"],
  authors: [{ name: "Mohamad AlJasem", url: "https://AlJasem.eu.org" }],
  openGraph: {
    title: "OMeD - Open Medical Datasets",
    description: "A search engine and community platform for sharing links to real-world, open, and free medical datasets",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
