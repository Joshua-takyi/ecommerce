import { Product } from "@/models/schema";
import { buildQuery, BuildSort } from "@/utils/buildQuery";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(req) {
	try {
		// Connect to the database
		if (mongoose.connection.readyState !== 1) {
			logger.error("failed to connect to database");
			return NextResponse.json(
				{ error: "failed to connect to database" },
				{ status: 500 }
			);
		}

		// Parse query parameters
		const searchParams = req.nextUrl.searchParams;
		const sortBy = searchParams.get("sortBy");
		const order = searchParams.get("order");
		const page = parseInt(searchParams.get("page")) || 1; // Default to page 1
		const limit = parseInt(searchParams.get("limit")) || 10; // Default to 10 items per page
		const skip = (page - 1) * limit;

		// Build query and sort
		const query = buildQuery(searchParams);
		const sort = BuildSort(sortBy, order);

		// Fetch products and total count in parallel
		const [products, total] = await Promise.all([
			Product.find(query).sort(sort).skip(skip).limit(limit).lean(),
			Product.countDocuments(query),
		]);

		// Return response with pagination metadata
		return NextResponse.json({
			data: products,
			pagination: {
				page,
				limit,
				total,
				totalPages: Math.ceil(total / limit),
			},
		});
	} catch (error) {
		logger.error("Error fetching products:", error);
		return NextResponse.json(
			{ error: "Internal server error", details: error.message },
			{ status: 500 }
		);
	}
}
