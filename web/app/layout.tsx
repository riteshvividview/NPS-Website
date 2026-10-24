import PageEntranceRunner from "@/components/pages/shared/PageEntranceRunner";
import RouteTransitionRunner from "@/components/pages/shared/RouteTransitionRunner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Public_Sans, IBM_Plex_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { buildMetadata, schoolJsonLd } from "@/lib/seo";
import Header from "@/components/layout/Header/Header";
import HeaderInteractionsRunner from "@/components/layout/Header/HeaderInteractionsRunner";
import Footer from "@/components/layout/Footer/Footer";
import SmoothScrollProvider from "@/components/home/SmoothScrollProvider";
import Script from "next/script";

// --- Bulgash, headline role only (2026-10-13, revised 2026-10-14) ---
// First tried everywhere site-wide; the user asked to pull it back to just
// big display text (headlines/pull-quotes â€” the --font-fraunces role) once
// they saw it on body copy and labels too. Everything else below is back
// to the original fonts. See the project memory record for the full
// before/after if this needs adjusting again.
const fraunces = localFont({
  src: "../fonts/CodecPro-Regular.ttf",
  variable: "--font-fraunces",
  display: "swap",
});
// --- end Bulgash ---

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["500"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const script = localFont({
  src: "../fonts/Sondra Script.ttf",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${publicSans.variable} ${ibmPlexMono.variable} ${poppins.variable} ${script.variable}`}
    >
      <body>
        {/* Font Awesome, for pages that want ready-made icons (e.g. NPS
            Vision) instead of hand-drawn inline SVGs. */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css" />
        <Script src="/home-fx-init.js" strategy="beforeInteractive" />        <SmoothScrollProvider>
          <Header />
          {/* Must mount (and run its effect) before {children} â€” it pushes
              the hero down by the header's real height, and the Home page's
              own animation hook measures hero/section positions assuming
              that offset is already applied. React fires sibling effects in
              JSX order, so this has to come first. */}
          <HeaderInteractionsRunner />
          <RouteTransitionRunner />
          {children}
          <PageEntranceRunner />
          <Footer />
        </SmoothScrollProvider>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd()) }}
        />
      </body>
    </html>
  );
}
