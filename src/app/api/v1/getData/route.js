import { Product } from "@/models/schema";
import { buildQuery, BuildSort } from "@/utils/buildQuery";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDb } from "@/utils/connect";

export async function GET(req) {
	try {
		// Connect to the database
		if (mongoose.connection.readyState !== 1) {
			await connectDb();
		}

		// Parse query parameters
		const searchParams = req.nextUrl.searchParams;
		const sortBy = searchParams.get("sortBy");
		const order = searchParams.get("order");
		const page = parseInt(searchParams.get("page")) || 1;
		const limit = parseInt(searchParams.get("limit")) || 10;
		const skip = (page - 1) * limit;

		// Build query and sort
		const matchStage = buildQuery(searchParams);
		const sortStage = BuildSort(sortBy, order);

		// Use aggregation pipeline
		const [result] = await Product.aggregate([
			{ $match: matchStage },
			{
				$facet: {
					data: [{ $sort: sortStage }, { $skip: skip }, { $limit: limit }],
					totalCount: [{ $count: "count" }],
				},
			},
		]);

		const products = result.data;
		const total = result.totalCount[0]?.count || 0;

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
