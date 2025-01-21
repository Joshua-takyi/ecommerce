import { Product } from "@/models/schema";
import { connectDb } from "@/utils/connect";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
	const { slug } = await params;
	try {
		if (!slug || typeof slug !== "string") {
			logger.warn(`Invalid slug: ${slug}`);
			return NextResponse.json(
				{ message: "slug is required and must be a string" },
				{ status: 400 }
			);
		}
		await connectDb();

		const reqBody = await req.json();
		if (!reqBody || Object.keys(reqBody).length === 0) {
			logger.warn(`Request body is empty: ${slug}`);
			return NextResponse.json(
				{ message: "request body is required" },
				{ status: 400 }
			);
		}

		const updatedProduct = await Product.findOneAndUpdate(
			{ slug },
			{ $set: reqBody },
			{ new: true, runValidators: true }
		);
		if (!updatedProduct) {
			logger.warn(`Product not found: ${slug}`);
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}
		logger.info(`Product updated successfully: ${slug}`);
		return NextResponse.json({ data: updatedProduct });
	} catch (error) {
		logger.error(`Error updating product: ${slug}`, { error: error.message });
		return NextResponse.json(
			{ message: "Internal server error", details: error.message },
			{ status: 500 }
		);
	}
}
