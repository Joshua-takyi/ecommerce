import { Product } from "@/models/schema";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";
import NodeCache from "node-cache";
import mongoose from "mongoose";
// Initialize cache with a TTL of 60 seconds

const cache = new NodeCache({ stdTTL: 60 });

export async function GET(req, { params }) {
	const { slug } = await params;

	try {
		// Check if the product is in the cache
		const cachedProduct = cache.get(slug);
		if (cachedProduct) {
			logger.info(`Product fetched from cache: ${slug}`);
			return NextResponse.json({ data: cachedProduct });
		}

		// Connect to the database
		if (mongoose.connection.readyState !== 1) {
			logger.error("failed to connect to database");
			return NextResponse.json(
				{ error: "failed to connect to database" },
				{ status: 500 }
			);
		}

		// Fetch product from the database
		const product = await Product.findOne({ slug }).lean(); // Convert Mongoose document to plain JavaScript object

		if (!product) {
			logger.warn(`Product not found: ${slug}`);
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		// Cache the product
		cache.set(slug, product);

		return NextResponse.json({ data: product });
	} catch (error) {
		logger.error(`Error fetching product: ${slug}`, { error: error.message });
		return NextResponse.json(
			{ message: "Internal server error", details: error.message },
			{ status: 500 }
		);
	}
}
