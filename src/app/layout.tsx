import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Lora, Playfair_Display } from "next/font/google";
import { siteConfig } from "~/data/site-config";
import { StarField } from "~/components/effects/StarField";
import { Navbar } from "~/components/ui/Navbar";
import { Footer } from "~/components/ui/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.author,
    images: [{ url: siteConfig.ogImage }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${lora.variable} font-sans antialiased bg-[#0a0a0a] text-[#fafafa]`}
      >
        <StarField />
        <Navbar />
        <main className="relative z-10 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
