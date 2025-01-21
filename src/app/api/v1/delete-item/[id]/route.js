import { Product } from "@/models/schema";
import { connectDb } from "@/utils/connect";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
	const { id } = await params;

	try {
		// Connect to the database
		await connectDb();

		// Find and delete the product by ID
		const deletedProduct = await Product.findByIdAndDelete(id).select("name");

		// If the product is not found, return a 404 error
		if (!deletedProduct) {
			logger.warn(`Product not found: ${id}`);
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		// Log the successful deletion
		logger.info(`Product deleted successfully: ${id}`);

		// Return the deleted product
		return NextResponse.json(
			{
				message: "Product deleted successfully",
				data: deletedProduct,
			},
			{ status: 200 }
		);
	} catch (error) {
		// Log the error with context
		logger.error(`Error deleting product: ${id}`, { error: error.message });

		// Return a 500 error with details
		return NextResponse.json(
			{ message: "Internal server error", details: error.message },
			{ status: 500 }
		);
	}
}
