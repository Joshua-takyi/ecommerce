import Hero from "./hero";
import Categories from "./categories";
import HotSales from "./hotSales";

export const metadata = {
	title: "Premium Phone Accessories | PhoneXcess - Official Store",
	description:
		"Shop the latest phone cases, chargers, and accessories for iPhone, Samsung & more. Free shipping & 2-year warranty on all products. Find your perfect device protection today!",
	keywords:
		"phone cases, smartphone accessories, iPhone cases, Samsung cases, wireless chargers, screen protectors, phoneXcess",
	openGraph: {
		title: "Premium Phone Accessories | PhoneXcess - Official Store",
		description:
			"Shop the latest phone accessories with free shipping & warranty",
		url: "https://yourdomain.com",
		siteName: "PhoneXcess",
		images: [
			{
				url: "/og-image.jpg", // Recommended: 1200x630px
				width: 1200,
				height: 630,
				alt: "PhoneXcess Accessories Collection",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Premium Phone Accessories | PhoneXcess",
		description:
			"Shop the latest phone accessories with free shipping & warranty",
		images: ["/twitter-image.jpg"], // Recommended: 1200x628px
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "https://yourdomain.com",
	},
	// Optional but recommended for eCommerce:
	verification: {
		google: "your-google-verification-code",
		yandex: "your-yandex-verification-code",
	},
};

export default function Homepage() {
	return (
		<>
			<Hero />
			<Categories />
			<HotSales />

			{/* Add structured data for SEO */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "WebSite",
						name: "PhoneXcess",
						url: "https://yourdomain.com",
						potentialAction: {
							"@type": "SearchAction",
							target: "https://yourdomain.com/search?q={search_term_string}",
							"query-input": "required name=search_term_string",
						},
					}),
				}}
			/>
		</>
	);
}
