import { Geist, Space_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/provider";
import { Toaster } from "sonner";
import Nav from "@/components/nav/nav";

// Load custom fonts using next/font
const spaceMono = Space_Mono({
	variable: "--font-space-mono",
	subsets: ["latin"],
	weight: ["400", "700"],
	display: "swap", // Ensure fonts are loaded without blocking the render
});

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap",
});

// Metadata for SEO and social media
export const metadata = {
	title: {
		default: "PhoneXcess | Premium Phone Accessories", // Default title
		template: "%s | PhoneXcess", // Dynamic title for child pages
	},
	description:
		"Discover premium phone accessories at PhoneXcess. Shop cases, chargers, screen protectors, and more for your favorite devices.",
	keywords: [
		"PhoneXcess",
		"phone accessories",
		"phone cases",
		"chargers",
		"screen protectors",
		"premium phone gear",
	],
	openGraph: {
		title: "PhoneXcess | Premium Phone Accessories",
		description:
			"Discover premium phone accessories at PhoneXcess. Shop cases, chargers, screen protectors, and more for your favorite devices.",
		url: "https://www.phonexcess.com", // Replace with your domain
		siteName: "PhoneXcess",
		images: [
			{
				url: "https://www.phonexcess.com/og-image.jpg", // Replace with your OG image URL
				width: 1200,
				height: 630,
				alt: "PhoneXcess - Premium Phone Accessories",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "PhoneXcess | Premium Phone Accessories",
		description:
			"Discover premium phone accessories at PhoneXcess. Shop cases, chargers, screen protectors, and more for your favorite devices.",
		images: ["https://www.phonexcess.com/og-image.jpg"], // Replace with your OG image URL
	},
	robots: {
		index: true, // Allow search engines to index the page
		follow: true, // Allow search engines to follow links on the page
		nocache: false, // Allow search engines to cache the page
	},
	alternates: {
		canonical: "https://www.phonexcess.com", // Replace with your domain
	},
	verification: {
		google: "your-google-verification-code", // Replace with your Google verification code
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				{/* Add favicon */}
				<link rel="icon" href="/favicon.ico" />
				{/* Add theme color for PWA */}
				<meta name="theme-color" content="#ffffff" />
				{/* Add Apple Touch Icon for iOS devices */}
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
			</head>
			<body
				className={`${spaceMono.variable} ${geistSans.className} antialiased`}
			>
				{/* Toast notifications */}
				<Toaster richColors position="top-right" />

				{/* Wrap the app with React Query Provider */}
				<QueryProvider>
					{/* Navigation bar */}
					<Nav />

					{/* Main content */}
					<main>{children}</main>
				</QueryProvider>
			</body>
		</html>
	);
}
