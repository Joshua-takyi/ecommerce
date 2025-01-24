import AddTask from "./add";
import { Metadata } from "next/types";

export const metadata = {
	title: "Admin | Add Product",
	description: "Add a new product to your store.",
	keywords: ["admin", "add product", "ecommerce", "store management"],
	openGraph: {
		title: "Admin | Add Product",
		description: "Add a new product to your store.",
		url: "https://yourdomain.com/admin/add-product",
		siteName: "Your Store Name",
		images: [
			{
				url: "https://ecommerce-mu-blush-89.vercel.app/og-image.jpg", // Replace with your OG image URL
				width: 1200,
				height: 630,
				alt: "Admin Add Product",
			},
		],
		locale: "en_US",
		type: "website",
	},

	robots: {
		index: false, // Prevent search engines from indexing this page
		follow: true,
		nocache: true,
	},
	alternates: {
		canonical: "https://yourdomain.com/admin/add-product",
	},
	verification: {
		google: "your-google-verification-code", // Replace with your Google verification code
	},
};

export default function AddTaskPage() {
	return (
		<div>
			<AddTask />
		</div>
	);
}
