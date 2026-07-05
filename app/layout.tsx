import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StickyButtons from "@/components/sticky-buttons";
import JsonLd from "@/components/json-ld";
import { CANONICAL_BASE } from "@/lib/constants";
import { SanityLive } from "@/lib/sanity";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-caveat",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F4EB",
};

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_BASE),
  title: {
    default: "Puterina — butik torti | Beograd",
    // Stranice nose pun naslov (copy §14) — template ne dodaje sufiks
    template: "%s",
  },
  description:
    "Ručno pravljene torte sa pravim puterom — bez fondana i gotovih smesa. Butik torti u Beogradu. Poručivanje pozivom ili porukom, radnim danima 08–20h.",
  keywords: [
    "torte Beograd",
    "torte za rođendan Beograd",
    "dečje torte Beograd",
    "butik torti",
    "puter krem torte",
    "kolači Beograd",
    "Puterina",
  ],
  authors: [{ name: "Puterina" }],
  creator: "Puterina",
  publisher: "Puterina",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: CANONICAL_BASE,
    siteName: "Puterina",
    title: "Puterina — butik torti | Beograd",
    // OG default opis — copy §11
    description:
      "Butik torti, Beograd. Pravi puter, bez fondana. Poručivanje porukom ili pozivom.",
    images: [
      {
        url: "/images/site/hero.jpg",
        width: 1600,
        height: 2400,
        alt: "Puterina — butik torti, Beograd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Puterina — butik torti | Beograd",
    description:
      "Butik torti, Beograd. Pravi puter, bez fondana. Poručivanje porukom ili pozivom.",
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
    <html
      lang="sr"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body className="antialiased flex min-h-screen flex-col">
        <JsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyButtons />
        <SanityLive />
      </body>
    </html>
  );
}
