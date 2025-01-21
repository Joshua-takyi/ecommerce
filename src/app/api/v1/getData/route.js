import { Product } from "@/models/schema";
import { buildQuery, BuildSort } from "@/utils/buildQuery";
import { connectDb } from "@/utils/connect";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		// Connect to the database
		await connectDb();

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

		// Fetch products with pagination
		const products = await Product.find(query)
			.sort(sort)
			.skip(skip)
			.limit(limit);
		// Get total count for pagination metadata
		const total = await Product.countDocuments(query);

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
