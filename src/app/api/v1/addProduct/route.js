import { Product } from "@/models/schema";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";
import { z } from "zod";
import slugify from "slugify";
import { connectDb } from "@/utils/connect";

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
	salesStartAt: z.coerce.date().nullable().optional(),
	salesEndAt: z.coerce.date().nullable().optional(),
	isOnSale: z.boolean().optional().default(false),
});

// generate an sku
const generateSku = (name, price, category) => {
	const namePrefix = name.slice(0, 3).toUpperCase();
	const pricePrefix = Math.floor(price).toString().padStart(4, "0");
	const categoryPrefix = category[0].slice(0, 3).toUpperCase();
	const sku = `${namePrefix}-${pricePrefix}-${categoryPrefix}`;
	return sku;
};

const generateSlug = (name) => {
	return slugify(name, { lower: true, strict: true });
};

export async function POST(req) {
	try {
		// Parse and validate request data
		const data = await req.json();
		const validationResult = productSchema.safeParse(data);

		// Handle validation errors
		if (!validationResult.success) {
			const errors = validationResult.error.issues.reduce((acc, issue) => {
				const field = issue.path.join(".");
				acc[field] = acc[field] || [];
				acc[field].push(issue.message);
				return acc;
			}, {});
			return NextResponse.json(
				{ error: "Validation failed", errors },
				{ status: 400 }
			);
		}

		// Connect to the database
		try {
			await connectDb();
		} catch (error) {
			logger.error("Failed to connect to the database", {
				error: error.message,
			});
			return NextResponse.json(
				{ error: "Failed to connect to the database" },
				{ status: 500 }
			);
		}

		// generate sku and slug
		const generatedSku = generateSku(
			validationResult.data.name,
			validationResult.data.price,
			validationResult.data.category
		);
		const generatedSlug = generateSlug(validationResult.data.name);

		// Create product
		const item = await Product.create({
			...validationResult.data,
			sku: generatedSku,
			slug: generatedSlug,
		});

		if (!item) {
			logger.error("Failed to create product", {
				error: "Failed to create product",
			});
			throw new Error("Failed to create product");
		}
		logger.info("Product added successfully", {
			productId: item._id,
			name: item.name,
		});

		// Return success response
		return NextResponse.json(
			{ message: "Product added successfully", productId: item._id },
			{ status: 201 }
		);
	} catch (error) {
		logger.error("Error adding product", {
			error: error.message,
			stack: error.stack,
		});
		return NextResponse.json(
			{ error: "Internal server error", details: error.message },
			{ status: 500 }
		);
	}
}
