import { Product } from "@/models/schema";
import { NextResponse } from "next/server";
import NodeCache from "node-cache";
import mongoose from "mongoose";
import { connectDb } from "@/utils/connect";
// Initialize cache with a TTL of 60 seconds
import logger from "@/utils/logger";
/**
 * Initialize in-memory cache with 60 seconds Time-To-Live (TTL)
 * This helps reduce database load for frequently accessed products
 */
const cache = new NodeCache({ stdTTL: 60 });

/**
 * GET endpoint to fetch a single product by its slug
 * Features:
 * - In-memory caching
 * - MongoDB aggregation pipeline for efficient querying
 * - Computed fields for pricing and statistics
 *
 * @param {Object} request - Next.js request object
 * @param {Object} params - URL parameters containing the product slug
 * @returns {Promise<NextResponse>} JSON response with product data or error
 */
export async function GET(request, { params }) {
	const { slug } = await params;

	try {
		// First check the cache to avoid unnecessary database queries
		const cachedProduct = cache.get(slug);
		if (cachedProduct) {
			return NextResponse.json({ data: cachedProduct });
		}

		// Ensure database connection is established
		if (mongoose.connection.readyState !== 1) {
			await connectDb();
		}

		// MongoDB Aggregation Pipeline
		const product = await Product.aggregate([
			// Stage 1: Filter by slug
			// This acts as our initial query filter
			{ $match: { slug } },

			// Stage 2: Add computed fields for pricing and sale status
			{
				$addFields: {
					// Calculate if the product is currently discounted
					// Conditions:
					// 1. Must be marked as on sale
					// 2. Must have a discount percentage > 0
					// 3. Current date must be within the sale period
					isDiscounted: {
						$and: [
							{ $eq: ["$isOnSale", true] },
							{ $gt: ["$discountPercentage", 0] },
							{ $lt: ["$salesEndAt", new Date()] },
							{ $gt: ["$salesStartAt", new Date()] },
						],
					},
					// Calculate the final price based on discount status
					// If product is on sale, apply discount percentage
					// Otherwise, use original price
					finalPrice: {
						$cond: {
							if: {
								$and: [
									{ $eq: ["$isOnSale", true] },
									{ $gt: ["$discountPercentage", 0] },
									{ $lt: ["$salesEndAt", new Date()] },
									{ $gt: ["$salesStartAt", new Date()] },
								],
							},
							then: {
								$subtract: [
									"$price",
									{
										$multiply: [
											"$price",
											{ $divide: ["$discountPercentage", 100] },
										],
									},
								],
							},
							else: "$price",
						},
					},
				},
			},

			// Stage 3: Calculate review and comment statistics
			// These computations happen at the database level for better performance
			{
				$addFields: {
					// Calculate average rating from all reviews
					averageRating: { $avg: "$reviews.rating" },
					// Count total number of reviews
					reviewCount: { $size: "$reviews" },
					// Count total number of comments
					commentCount: { $size: "$comments" },
				},
			},
		]).exec();

		// Handle case where product is not found
		if (!product || product.length === 0) {
			logger.warn(`Product not found: ${slug}`);
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		// Extract the product data (aggregate returns an array)
		const productData = product[0];

		// Store computed result in cache for future requests
		cache.set(slug, productData);

		return NextResponse.json({ data: productData });
	} catch (error) {
		// Log error details and return appropriate error response
		logger.error(`Error fetching product: ${slug}`, { error: error.message });
		return NextResponse.json(
			{ message: "Internal server error", details: error.message },
			{ status: 500 }
		);
	}
}
