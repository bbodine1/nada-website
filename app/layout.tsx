import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northalabamadroneapplicators.com"),
  title: "Agricultural Drone Services - North Alabama",
  description:
    "North Alabama Drone Applicators provides precision spray applications and NDVI crop mapping for Tennessee Valley farms.",
  openGraph: {
    title: "Agricultural Drone Services - North Alabama",
    description:
      "Reserve your free field assessment for Fall 2026 drone spray applications and crop scouting.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions often inject attributes on <body> before hydration */}
      <body
        className="flex min-h-full flex-col bg-[color:var(--background)]"
        suppressHydrationWarning
      >
        <span id="top" />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
