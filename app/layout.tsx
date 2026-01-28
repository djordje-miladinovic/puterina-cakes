import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import PreFooter from "@/components/pre-footer";
import Footer from "@/components/footer";
import StickyButtons from "@/components/sticky-buttons";
import { CANONICAL_BASE } from "@/lib/constants";
import { SanityLive } from "@/lib/sanity";

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F0E8",
};

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_BASE),
  title: {
    default: "Puterina Cakes - Premium Torte i Kolači",
    template: "%s | Puterina Cakes",
  },
  description:
    "Puterina Cakes - Ručno pravljene premium torte i kolači izrađeni sa ljubavlju i pažnjom. Poručite svoje omiljene slastice već danas!",
  keywords: [
    "torte",
    "kolači",
    "slastice",
    "puterina",
    "cakes",
    "dostava",
    "Beograd",
    "ručna izrada",
    "premium kolači",
  ],
  authors: [{ name: "Puterina Cakes" }],
  creator: "Puterina Cakes",
  publisher: "Puterina Cakes",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: CANONICAL_BASE,
    siteName: "Puterina Cakes",
    title: "Puterina Cakes - Premium Torte i Kolači",
    description:
      "Ručno pravljene premium torte i kolači izrađeni sa ljubavlju i pažnjom.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Puterina Cakes - Premium Torte i Kolači",
    description:
      "Ručno pravljene premium torte i kolači izrađeni sa ljubavlju i pažnjom.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: CANONICAL_BASE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="antialiased flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <PreFooter />
        <Footer />
        <StickyButtons />
        <SanityLive />
      </body>
    </html>
  );
}
