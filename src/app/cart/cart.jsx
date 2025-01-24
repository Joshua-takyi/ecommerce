"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { ShoppingCart, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Loader from "@/app/loading";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
	// Fetch cart items
	const {
		data: cartItems,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["cartItems"],
		queryFn: async () => {
			try {
				const res = await axios.get(`${API_URL}/v1/cart`);
				if (res.status !== 200) throw new Error("Failed to fetch cart items");
				return res.data;
			} catch (error) {
				throw new Error(
					error.response?.data?.message || "Failed to fetch cart"
				);
			}
		},
		onError: (error) => {
			toast.error(error.message || "Failed to fetch cart items");
		},
	});

	// Mutation for updating cart
	const { mutate: updateCart } = useMutation({
		mutationKey: ["updateCart"],
		mutationFn: async (data) => {
			const res = await axios.patch(`${API_URL}/v1/cart`, data);
			if (res.status !== 200) throw new Error("Failed to update cart");
			return res.data;
		},
		onSuccess: () => {
			toast.success("Cart updated successfully!");
			refetch();
		},
		onError: (error) => {
			toast.error(error.message || "Failed to update cart");
		},
	});

	// Handler for incrementing quantity
	const incrementQuantity = (productId) => {
		const item = cartItems?.data?.products.find(
			(item) => item.productId._id === productId
		);
		if (item) {
			updateCart({
				model: item.model,
				color: item.color,
				productId, // Send the product ID
				quantity: item.quantity + 1, // Increment the quantity
				action: "increment", // Optional: Only include if the backend requires it
			});
		}
	};

	// Handler for decrementing quantity
	const decrementQuantity = (productId) => {
		const item = cartItems?.data?.products.find(
			(item) => item.productId._id === productId
		);
		if (item && item.quantity > 1) {
			updateCart({
				model: item.model,
				color: item.color,
				productId, // Send the product ID
				quantity: item.quantity - 1, // Decrement the quantity
				action: "decrement", // Optional: Only include if the backend requires it
			});
		}
	};

	// Mutation for removing item from cart
	const { mutate: removeFromCart } = useMutation({
		mutationKey: ["removeFromCart"],
		mutationFn: async (data) => {
			const res = await axios.delete(`${API_URL}/v1/cart`, {
				data: {
					productId: data.productId,
					color: data.color,
					model: data.model,
				},
			});
			if (res.status !== 200)
				throw new Error("Failed to remove item from cart");
			return res.data;
		},
		onSuccess: () => {
			toast.success("Item removed from cart!");
			refetch();
		},
		onError: (error) => {
			toast.error(error.message || "Failed to remove item from cart");
		},
	});

	// Delivery information state
	const [deliveryInfo, setDeliveryInfo] = useState({
		address: "",
		phoneNumber: "",
	});

	// Format price in Ghana Cedis (GHS)
	const formatPrice = (price) => {
		return new Intl.NumberFormat("en-GH", {
			style: "currency",
			currency: "GHS",
		}).format(price);
	};

	// Handler for removing item from cart
	const handleRemoveItem = (item) => {
		removeFromCart({
			productId: item.productId,
			color: item.color,
			model: item.model,
		});
	};

	const cartItemsData = cartItems?.data?.products || [];
	const hasItems = cartItemsData.length > 0;

	const calculateTotal = () => {
		return cartItemsData.reduce((total, item) => total + item.totalPrice, 0);
	};

	return (
		<div className="container mx-auto p-6 bg-gray-100 min-h-screen">
			<div className="grid md:grid-cols-2 gap-8">
				{/* Cart Items */}
				<div className="space-y-4">
					<h2 className="text-3xl font-bold text-gray-800 flex items-center">
						<ShoppingCart className="mr-2" /> Your Cart
					</h2>

					{isLoading && (
						<div className="flex justify-center items-center h-full">
							<Loader />
						</div>
					)}
					{isError && (
						<div className="text-red-500 text-center">
							{error?.message || "Something went wrong"}
						</div>
					)}
					{!isLoading && !isError && !hasItems && (
						<div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md text-center">
							<ShoppingBag className="w-16 h-16 mb-4 stroke-1 text-gray-400" />
							<h3 className="text-2xl font-semibold text-gray-700 mb-2">
								Your Cart is Empty
							</h3>
							<p className="text-gray-500 mb-6">
								Looks like you haven't added any items to your cart yet.
							</p>
							<Link
								href="/collection?category=phone-cases&sortBy=price&sortOrder=desc&limit=10&page=1"
								className="bg-black text-white px-6 py-3 rounded-lg hover:bg-[#f4340d] transition-colors"
							>
								Continue Shopping
							</Link>
						</div>
					)}
					{!isLoading &&
						!isError &&
						hasItems &&
						cartItemsData.map((item, index) => (
							<div
								key={`${item.productId}-${item.color}-${item.model}`}
								className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md transition-transform duration-200 hover:shadow-lg"
							>
								<Link
									href={`/product/${item.slug}`}
									className="flex items-center flex-1"
								>
									<div className="relative w-20 h-20 rounded-md overflow-hidden bg-white mr-4">
										<Image
											src={item.image}
											alt={item.slug}
											fill
											className="object-cover"
										/>
									</div>
									<div>
										<h3 className="font-semibold text-lg">
											{item.productId.name}
										</h3>
										<div className="text-gray-500 space-y-1">
											<p>Model: {item.model}</p>
											<div className="flex items-center gap-2">
												<span>Color:</span>
												<span
													className="w-3 h-3 rounded-full border"
													style={{ backgroundColor: item.color }}
												/>
											</div>
										</div>
									</div>
								</Link>
								<div className="flex items-center">
									<div className="flex items-center mr-4">
										<button
											onClick={() => decrementQuantity(item.slug)}
											className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
										>
											-
										</button>
										<span className="mx-2">{item.quantity}</span>
										<button
											onClick={() => incrementQuantity(item.productId._id)}
											className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
										>
											+
										</button>
									</div>
									<span className="mr-4 font-bold text-lg">
										{formatPrice(item.totalPrice)}
									</span>
									<button
										onClick={() => handleRemoveItem(item)}
										className="text-red-500 hover:text-red-700 transition-colors"
									>
										<Trash2 />
									</button>
								</div>
							</div>
						))}
				</div>

				{/* Checkout Section */}
				{hasItems ? (
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-3xl font-bold mb-6">Checkout</h2>
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Delivery Address"
								value={deliveryInfo.address}
								onChange={(e) =>
									setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
								}
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
							/>
							<input
								type="tel"
								placeholder="Phone Number"
								value={deliveryInfo.phoneNumber}
								onChange={(e) =>
									setDeliveryInfo({
										...deliveryInfo,
										phoneNumber: e.target.value,
									})
								}
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
							/>
							<div className="flex justify-between items-center pt-4 border-t">
								<span className="text-xl font-bold">Total</span>
								<span className="text-xl font-bold">
									{formatPrice(calculateTotal())}
								</span>
							</div>
							<button
								disabled={!hasItems}
								className={`w-full bg-black text-white p-3 rounded-md hover:bg-[#f4340d] transition-colors disabled:opacity-50`}
							>
								Proceed to Checkout
							</button>
						</div>
					</div>
				) : (
					<div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
						<ShoppingBag className="w-16 h-16 mb-4 stroke-1 text-gray-400" />
						<h3 className="text-2xl font-semibold text-gray-700 mb-2">
							No Items to Checkout
						</h3>
						<p className="text-gray-500 mb-6">
							Add some items to your cart before proceeding to checkout.
						</p>
						<Link
							href="/products"
							className="bg-black text-white px-6 py-3 rounded-lg hover:bg-[#f4340d] transition-colors"
						>
							Browse Products
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
