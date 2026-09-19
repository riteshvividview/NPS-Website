import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces, Public_Sans, IBM_Plex_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { buildMetadata, schoolJsonLd } from "@/lib/seo";
import Header from "@/components/layout/Header/Header";
import HeaderInteractionsRunner from "@/components/layout/Header/HeaderInteractionsRunner";
import Footer from "@/components/layout/Footer/Footer";
import SmoothScrollProvider from "@/components/home/SmoothScrollProvider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

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
        <script
          // Adds html.fx (pre-hides tagged text/cards until useHomeFx is
          // ready) only when motion is allowed; 6s safety net removes it.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('fx');setTimeout(function(){d.classList.remove('fx')},6000)}}catch(e){}})();",
          }}
        />
        <SmoothScrollProvider>
          <Header />
          {/* Must mount (and run its effect) before {children} — it pushes
              the hero down by the header's real height, and the Home page's
              own animation hook measures hero/section positions assuming
              that offset is already applied. React fires sibling effects in
              JSX order, so this has to come first. */}
          <HeaderInteractionsRunner />
          {children}
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
