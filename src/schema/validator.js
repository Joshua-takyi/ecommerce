import { z } from "zod";

// Define the validation schema
const ProductSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	description: z.string().min(1, "Description is required"),
	price: z.number().min(0, "Price is required"),
	image: z.array(z.string()).min(1, "At least one image is required"),
	category: z.array(z.string()).min(1, "At least one category is required"),
	stock: z.number().min(0, "Stock is required"),
	discountPercentage: z.number().min(0).max(100).optional().default(0),
	model: z.array(z.string()).min(1, "At least one model is required"),
	tags: z.array(z.string()).min(1, "At least one tag is required"),
	details: z.array(z.string()).min(1, "At least one detail is required"),
	features: z.array(z.string()).min(1, "At least one feature is required"),
	materials: z.array(z.string()).min(1, "At least one material is required"),
	colors: z.array(z.string()).min(1, "At least one color is required"),
	isOnSale: z.boolean().optional().default(false),
	salesStartAt: z.coerce.date().nullable().optional(),
	salesEndAt: z.coerce.date().nullable().optional(),
	isNewItem: z.boolean().optional().default(false),
});

export default ProductSchema;
