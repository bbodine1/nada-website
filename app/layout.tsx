import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { CtaLeadPopup, CtaPopupProvider } from "@/components/cta-lead-popup";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { FormSubmitTracker } from "@/components/form-submit-tracker";
import { InPageAnchorHandler } from "@/components/in-page-anchor-handler";
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
	metadataBase: new URL("https://www.northaldroneapplicators.com"),
	title: "Agricultural Drone Services - North Alabama",
	description:
		"North Alabama Drone Applicators: drone spraying and spreading for Tennessee Valley farms. Download the free field guide—see where drones save time and yield on your acres.",
	alternates: {
		canonical: "/",
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
	manifest: "/favicon/site.webmanifest",
	icons: {
		icon: [
			{ url: "/favicon/favicon.ico", type: "image/x-icon" },
			{ url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
		],
		apple: [
			{
				url: "/favicon/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
		shortcut: ["/favicon/favicon.ico"],
	},
	openGraph: {
		title: "Agricultural Drone Services - North Alabama",
		description:
			"Free North Alabama field guide: where drone spraying and spreading pays off on your fields—time, yield, and real Tennessee Valley conditions.",
		url: "/",
		siteName: "North Alabama Drone Applicators",
		locale: "en_US",
		type: "website",
		images: [
			{
				url: "/og-image.png",
				secureUrl: "/og-image.png",
				type: "image/png",
				width: 1200,
				height: 630,
				alt: "North Alabama Drone Applicators social preview",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Agricultural Drone Services - North Alabama",
		description:
			"Free North Alabama field guide: where drone spraying and spreading pays off on your fields—time, yield, and real Tennessee Valley conditions.",
		images: ["/og-image.png"],
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
			data-scroll-behavior="smooth"
			className={`${inter.variable} ${playfair.variable} ${geistMono.variable} h-full antialiased`}
		>
			{/* suppressHydrationWarning: browser extensions often inject attributes on <body> before hydration */}
			<body
				className="flex min-h-full flex-col bg-[color:var(--background)]"
				suppressHydrationWarning
			>
				<CtaPopupProvider>
					<InPageAnchorHandler />
					<FormSubmitTracker />
					<span id="top" />
					<SiteHeader />
					<main className="flex-1">{children}</main>
					<SiteFooter />
					<ExitIntentPopup />
					<CtaLeadPopup />
				</CtaPopupProvider>
				<Script
					id="leadconnector-chat-widget"
					src="https://widgets.leadconnectorhq.com/loader.js"
					data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
					data-widget-id="69e93c47a2b60a3c434db22a"
					strategy="afterInteractive"
				/>
				<Analytics />
			</body>
		</html>
	);
}
