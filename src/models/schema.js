import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, select: false },
		role: {
			type: String,
			required: true,
			enum: ["admin", "user"],
			default: "user",
		},
		image: {
			type: String,
			default: null,
			required: false,
		},
		providersId: {
			type: String,
			default: null,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const ReviewSchema = new mongoose.Schema(
	{
		user: {
			ref: "UserAuth",
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		productId: {
			ref: "Product",
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
		comment: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const CommentSchema = new mongoose.Schema(
	{
		user: {
			ref: "UserAuth",
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		productId: {
			ref: "Product",
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: false,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: [String],
			required: true,
		},
		category: {
			type: [String],
			required: true,
			default: [],
		},
		sku: {
			type: String,
			required: false,
		},
		stock: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			required: false,
		},
		isOnSale: {
			type: Boolean,
			required: false,
			default: false,
		},
		available: {
			type: Boolean,
			required: false,
			default: true,
		},
		tags: {
			type: [String],
			required: true,
			default: [],
		},
		isNewItem: {
			type: Boolean,
			required: false,
			default: false,
		},
		details: {
			type: [String],
			required: true,
			default: [],
		},
		features: {
			type: [String],
			required: true,
			default: [],
		},
		materials: {
			type: [String],
			required: true,
			default: [],
		},
		colors: {
			type: [String],
			required: true,
			default: ["00FFFFFF"],
		},
		model: {
			type: [String],
			required: true,
			default: [],
		},
		reviews: {
			type: [ReviewSchema],
			required: false,
			default: [],
		},
		comments: {
			type: [CommentSchema],
			required: false,
			default: [],
		},
		discountPercentage: {
			type: Number,
			required: false,
			default: 0,
		},
		salesStartAt: {
			type: Date,
			required: false,
			default: null,
		},
		salesEndAt: {
			type: Date,
			required: false,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserAuth",
			required: true,
		},
		products: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
					unique: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				color: {
					type: String,
					required: true,
				},
				model: {
					type: String,
					required: true,
				},
				totalPrice: {
					type: Number,
					required: true,
					min: 0,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const UserAuth =
	mongoose.models?.UserAuth || mongoose.model("UserAuth", userAuthSchema);

const Product =
	mongoose.models?.Product || mongoose.model("Product", ProductSchema);
const Cart = mongoose.models?.Cart || mongoose.model("Cart", cartSchema);

export { UserAuth, Product, Cart };
