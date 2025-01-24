/**
 * Cart API endpoint for managing shopping cart operations
 * POST: Add/Update items in cart
 */

import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDb } from "@/utils/connect";
import { Cart, Product } from "@/models/schema";
import { auth } from "@/auth";
import logger from "@/utils/logger";

/**
 * Add or update item in user's cart
 * @route POST /api/v1/cart
 */
export async function POST(req) {
	try {
		const { productSlug, quantity, color, model } = await req.json();

		// Input validation with detailed error messages
		if (!productSlug) {
			return NextResponse.json(
				{ message: "Product slug is required" },
				{ status: 400 }
			);
		}
		if (!quantity || quantity <= 0) {
			return NextResponse.json(
				{ message: "Valid quantity is required" },
				{ status: 400 }
			);
		}
		if (!model) {
			return NextResponse.json(
				{ message: "Product model is required" },
				{ status: 400 }
			);
		}
		if (!color) {
			return NextResponse.json(
				{ message: "Product color is required" },
				{ status: 400 }
			);
		}

		// Ensure database connection
		if (mongoose.connection.readyState !== 1) {
			await connectDb();
		}

		// Authenticate user and get session
		const session = await auth();
		if (!session?.user?.accessToken) {
			return NextResponse.json(
				{ message: "Authentication required" },
				{ status: 401 }
			);
		}
		const userId = session?.user?.id;
		if (!userId) {
			return NextResponse.json(
				{ message: "User ID not found" },
				{ status: 401 }
			);
		}

		// Fetch product with essential fields only
		const product = await Product.findOne({ slug: productSlug })
			.select("price discount available stock name image")
			.lean();

		if (!product) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		// Validate product availability and stock
		if (!product.available) {
			return NextResponse.json(
				{ message: "Product is currently unavailable" },
				{ status: 400 }
			);
		}
		if (product.stock < quantity) {
			return NextResponse.json(
				{
					message: "Insufficient stock",
					availableStock: product.stock,
				},
				{ status: 400 }
			);
		}

		// Calculate final price with discount
		const calculatedPrice = product.price * (1 - (product.discount || 0) / 100);

		// Find or create user's cart
		let cart = await Cart.findOneAndUpdate(
			{ userId },
			{},
			{
				upsert: true,
				new: true,
				setDefaultsOnInsert: true,
			}
		);

		// Check for existing product in cart
		const existingProductIndex = cart.products.findIndex(
			(item) =>
				item.productId.equals(product._id) &&
				item.color === color &&
				item.model === model
		);

		// Update cart based on existing product
		if (existingProductIndex > -1) {
			// Update existing product quantity and price
			const newQuantity =
				cart.products[existingProductIndex].quantity + quantity;

			// Validate combined quantity against stock
			if (newQuantity > product.stock) {
				return NextResponse.json(
					{
						message: "Combined quantity exceeds available stock",
						availableStock: product.stock,
						currentCartQuantity: cart.products[existingProductIndex].quantity,
					},
					{ status: 400 }
				);
			}

			cart.products[existingProductIndex].quantity = newQuantity;
			cart.products[existingProductIndex].totalPrice =
				calculatedPrice * newQuantity;
		} else {
			// Add new product to cart
			cart.products.push({
				productId: product._id,
				quantity,
				color,
				model,
				totalPrice: calculatedPrice * quantity,
			});
		}

		// Update cart timestamp and save
		cart.updatedAt = new Date();
		await cart.save();

		// Return success response with details
		return NextResponse.json(
			{
				message: "Item added to cart successfully",
				data: {
					cartId: cart._id,
					totalItems: cart.products.length,
					updatedProduct: {
						name: product.name,
						price: calculatedPrice,
						quantity,
						color,
						model,
						image: product.image[0],
					},
				},
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Cart operation failed:", error);
		return NextResponse.json(
			{
				message: "Failed to process cart operation",
				error: error.message,
			},
			{ status: 500 }
		);
	}
}

export async function GET(req) {
	try {
		const session = await auth();
		if (!session?.user?.accessToken) {
			return NextResponse.json(
				{ message: "Authentication required" },
				{ status: 401 }
			);
		}
		const userId = session?.user?.id;
		if (!userId) {
			return NextResponse.json(
				{ message: "User ID not found" },
				{ status: 401 }
			);
		}

		if (mongoose.connection.readyState !== 1) {
			await connectDb();
		}

		// Get cart with populated product details
		const cart = await Cart.findOne({ userId }).populate({
			path: "products.productId",
			select: "name price discount image slug stock available",
		});

		if (!cart) {
			return NextResponse.json(
				{
					message: "Cart not found",
					data: { products: [], total: 0 },
				},
				{ status: 200 }
			);
		}

		// Calculate total and format response
		const formattedProducts = cart.products.map((item) => {
			const product = item.productId;
			const calculatedPrice =
				product.price * (1 - (product.discount || 0) / 100);
			return {
				productId: product._id,
				slug: product.slug,
				name: product.name,
				price: calculatedPrice,
				originalPrice: product.price,
				discount: product.discount,
				quantity: item.quantity,
				color: item.color,
				model: item.model,
				totalPrice: calculatedPrice * item.quantity,
				image: product.image[0],
				stock: product.stock,
				available: product.available,
			};
		});

		const cartTotal = formattedProducts.reduce(
			(sum, item) => sum + item.totalPrice,
			0
		);

		return NextResponse.json({
			data: {
				products: formattedProducts,
				total: cartTotal,
				updatedAt: cart.updatedAt,
			},
		});
	} catch (error) {
		console.error("Failed to fetch cart:", error);
		return NextResponse.json(
			{ message: "Failed to fetch cart", error: error.message },
			{ status: 500 }
		);
	}
}

export async function DELETE(req) {
	try {
		const { productId, color, model } = await req.json();

		// Input validation
		if (!productId) {
			return NextResponse.json(
				{ message: "Product ID is required" },
				{ status: 400 }
			);
		}

		// Authenticate user and get session
		const session = await auth();
		if (!session?.user?.accessToken) {
			return NextResponse.json(
				{ message: "Authentication required" },
				{ status: 401 }
			);
		}
		const userId = session?.user?.id;
		if (!userId) {
			return NextResponse.json(
				{ message: "User ID not found" },
				{ status: 401 }
			);
		}

		// Ensure database connection
		if (mongoose.connection.readyState !== 1) {
			await connectDb();
		}

		// Find user's cart
		const cart = await Cart.findOne({ userId });
		if (!cart) {
			return NextResponse.json({ message: "Cart not found" }, { status: 404 });
		}

		// Find the product in the cart
		const productIndex = cart.products.findIndex(
			(item) =>
				item.productId.toString() === productId &&
				item.color === color &&
				item.model === model
		);

		if (productIndex === -1) {
			return NextResponse.json(
				{ message: "Product not found in cart" },
				{ status: 404 }
			);
		}

		// Remove the product from the cart
		const removedProduct = cart.products[productIndex];
		cart.products.splice(productIndex, 1);
		cart.updatedAt = new Date();
		await cart.save();

		return NextResponse.json({
			message: "Product removed from cart successfully",
			data: {
				cartId: cart._id,
				totalItems: cart.products.length,
				removedProduct: {
					productId: removedProduct.productId,
					color: removedProduct.color,
					model: removedProduct.model,
					quantity: removedProduct.quantity,
				},
			},
		});
	} catch (error) {
		console.error("Failed to remove product from cart:", error);
		return NextResponse.json(
			{ message: "Failed to remove product from cart", error: error.message },
			{ status: 500 }
		);
	}
}

export async function PATCH(req) {
	const { productId, quantity, color, model, action } = await req.json();
	try {
		if (!productId || !quantity || !action) {
			return NextResponse.json({ message: "Invalid request" }, { status: 400 });
		}

		if (action !== "increment" && action !== "decrement") {
			return NextResponse.json({ message: "Invalid action" }, { status: 400 });
		}
		const session = await auth();
		if (!session?.user?.accessToken) {
			return NextResponse.json(
				{ message: "Authentication required" },
				{ status: 401 }
			);
		}
		const userId = session?.user?.id;
		if (!userId) {
			return NextResponse.json(
				{ message: "User ID not found" },
				{ status: 401 }
			);
		}
		if (mongoose.connection.readyState !== 1) {
			await connectDb();
		}

		// Fetch the product to get current price
		const productDetails = await Product.findById(productId)
			.select("price discount")
			.lean();
		if (!productDetails) {
			return NextResponse.json(
				{ message: "Product not found" },
				{ status: 404 }
			);
		}

		// Calculate price with discount
		const calculatedPrice =
			productDetails.price * (1 - (productDetails.discount || 0) / 100);

		const cart = await Cart.findOne({ userId });
		if (!cart) {
			return NextResponse.json({ message: "Cart not found" }, { status: 404 });
		}
		const productIndex = cart.products.findIndex(
			(item) =>
				item.productId.toString() === productId &&
				(!color || item.color === color) &&
				(!model || item.model === model)
		);
		if (productIndex === -1) {
			return NextResponse.json(
				{ message: "Product not found in cart" },
				{ status: 404 }
			);
		}
		if (quantity <= 0) {
			return NextResponse.json(
				{ message: "Quantity must be a positive number" },
				{ status: 400 }
			);
		}
		// Update the quantity based on the action
		const product = cart.products[productIndex];
		if (action === "increment") {
			product.quantity += quantity;
		} else if (action === "decrement") {
			product.quantity -= quantity;
		}

		// Update total price using the calculated price
		product.totalPrice = calculatedPrice * product.quantity;

		await cart.save();
		return NextResponse.json({
			message: `Product quantity ${action}ed successfully`,
			data: {
				cartId: cart._id,
				totalItems: cart.products.length,
				updatedProduct: {
					productId: product.productId,
					color: product.color,
					model: product.model,
					quantity: product.quantity,
					totalPrice: product.totalPrice,
				},
			},
		});
	} catch (error) {
		logger.error("failed to update cart", error.message);
		return NextResponse.json(
			{ message: "Failed to update cart", error: error.message },
			{ status: 500 }
		);
	}
}
