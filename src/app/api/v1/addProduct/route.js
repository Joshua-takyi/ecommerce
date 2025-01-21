import { Product } from "@/models/schema";
import { connectDb } from "@/utils/connect";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define validation schema
const productSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	price: z.number().min(0, "Price must be a positive number"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	image: z.array(z.string()).min(1, "At least one image is required"),
	category: z.array(z.string()).min(1, "At least one category is required"),
	stock: z.number().min(0, "Stock must be a positive number"),
	available: z.boolean().optional().default(true),
	tags: z.array(z.string()).min(1, "At least one tag is required"),
	isNewItem: z.boolean().optional().default(false),
	details: z.array(z.string()).min(1, "At least one detail is required"),
	features: z.array(z.string()).min(1, "At least one feature is required"),
	materials: z.array(z.string()).min(1, "At least one material is required"),
	colors: z.array(z.string()).min(1, "At least one color is required"),
	model: z.array(z.string()).min(1, "At least one model is required"),
	reviews: z.array(z.string()).optional().default([]),
	comments: z.array(z.string()).optional().default([]),
	discountPercentage: z.number().min(0).max(100).optional().default(0),
	rating: z.number().min(0).max(5).optional().default(0),
	salesStartAt: z.date().nullable().optional(),
	salesEndAt: z.date().nullable().optional(),
	isOnSale: z.boolean().optional().default(false),
	sku: z.string().min(1, "SKU is required").optional(),
});

// generate an sku
const generateSku = (name, price, category) => {
	const namePrefix = name.slice(0, 3).toUpperCase();
	const pricePrefix = price.toFixed(2);
	const categoryPrefix = category[0].slice(0, 3).toUpperCase();
	const sku = `${namePrefix}-${pricePrefix}-${categoryPrefix}`;
	return sku;
};

export async function POST(req) {
	try {
		// Parse and validate request data
		const data = await req.json();
		const validationResult = productSchema.safeParse(data);

		// Handle validation errors
		if (!validationResult.success) {
			const errors = validationResult.error.issues.map((issue) => ({
				field: issue.path.join("."),
				message: issue.message,
			}));
			return NextResponse.json(
				{ error: "Validation failed", errors },
				{ status: 400 }
			);
		}

		// Connect to the database
		await connectDb();

		// generate sku
		const generatedSku = generateSku(
			validationResult.data.name,
			validationResult.data.price,
			validationResult.data.category
		);

		// Create product
		const item = await Product.create({
			name: validationResult.data.name,
			price: validationResult.data.price,
			description: validationResult.data.description,
			image: validationResult.data.image,
			category: validationResult.data.category,
			stock: validationResult.data.stock,
			available: validationResult.data.available,
			tags: validationResult.data.tags,
			isNewItem: validationResult.data.isNewItem,
			details: validationResult.data.details,
			features: validationResult.data.features,
			materials: validationResult.data.materials,
			colors: validationResult.data.colors,
			model: validationResult.data.model,
			reviews: validationResult.data.reviews,
			comments: validationResult.data.comments,
			discountPercentage: validationResult.data.discountPercentage,
			rating: validationResult.data.rating,
			salesStartAt: validationResult.data.salesStartAt,
			salesEndAt: validationResult.data.salesEndAt,
			isOnSale: validationResult.data.isOnSale,
			sku: generatedSku,
		});
		logger.info("Product added successfully", { productId: item._id });

		// Return success response
		return NextResponse.json(
			{ message: "Product added successfully", productId: item._id },
			{ status: 201 }
		);
	} catch (error) {
		logger.error("Error adding product", { error: error.message });
		return NextResponse.json(
			{ error: "Internal server error", details: error.message },
			{ status: 500 }
		);
	}
}
