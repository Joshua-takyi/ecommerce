"use client";
import { AddToCart, GetProduct } from "@/server/apiCalls";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingPage from "../loading";
import ImageCarousel from "@/components/carousel/productCarousel";
import { Wrapper } from "@/components/wrapper";
import TabComponent from "@/components/tabs/tab";
import { useState } from "react";
import SelectPhoneModel from "@/components/productAccordion/accordion";
import { Star, Heart, Truck } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { GetSession } from "@/utils/session";

export default function ProductPage({ slug }) {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedModel, setSelectedModel] = useState("");
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const { data, isLoading, error } = useQuery({
		queryKey: ["products", slug],
		queryFn: async () => {
			try {
				const res = await GetProduct({ slug });
				return res.data;
			} catch (error) {
				throw new Error(error.message || `Failed to get data for ${slug}`);
			}
		},
		staleTime: 1000 * 60 * 5, // Data will be considered fresh for 5 minutes
		cacheTime: 1000 * 60 * 30, // Cache will be kept for 30 minutes
	});

	const formattedCurrency = (price) =>
		new Intl.NumberFormat("en-GH", {
			style: "currency",
			currency: "GHS",
		}).format(price);

	// note: add to cart
	const { mutate: addToCart, isLoading: isAddingToCart } = useMutation({
		mutationFn: async (data) => {
			// Validate required fields
			const requiredFields = ["productSlug", "quantity", "color", "model"];
			const missingFields = requiredFields.filter((field) => !data[field]);

			if (missingFields.length > 0) {
				throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
			}

			// Validate quantity
			if (data.quantity <= 0) {
				throw new Error("Quantity must be greater than 0");
			}

			const res = await axios.post(`${API_URL}/v1/cart`, data);
			if (res.status !== 201) {
				throw new Error(res.data.message || "Failed to add item to cart");
			}
			return res.data;
		},
		onSuccess: (data) => {
			toast.success(data.message, {
				description: `Added ${data.data.updatedProduct.quantity}x ${data.data.updatedProduct.name} to cart`,
				duration: 3000,
			});
		},
		onError: (error) => {
			// Handle specific error cases
			if (error.message.includes("stock")) {
				toast.error("Stock Error", {
					description: error.message,
					duration: 5000,
				});
			} else if (error.message.includes("authentication")) {
				toast.error("Authentication Required", {
					description: "Please sign in to add items to cart",
					duration: 3000,
				});
			} else {
				toast.error("Error", {
					description: error.message || "Failed to add item to cart",
					duration: 3000,
				});
			}
		},
	});

	const incrementQuantity = () => {
		// Prevent exceeding stock limit
		if (selectedQuantity >= product.stock) {
			toast.error("Stock Limit Reached", {
				description: `Only ${product.stock} items available`,
				duration: 3000,
			});
			return;
		}
		setSelectedQuantity((prev) => prev + 1);
	};

	const decrementQuantity = () => {
		// Prevent going below 1
		if (selectedQuantity <= 1) {
			return;
		}
		setSelectedQuantity((prev) => prev - 1);
	};

	const handleAddToCart = () => {
		// Validate quantity
		if (selectedQuantity <= 0) {
			toast.error("Invalid Quantity", {
				description: "Please select a valid quantity",
				duration: 3000,
			});
			return;
		}

		if (selectedQuantity > product.stock) {
			toast.error("Insufficient Stock", {
				description: `Only ${product.stock} items available`,
				duration: 3000,
			});
			return;
		}

		// Validate color and model selection
		if (!selectedColor) {
			toast.error("Color Required", {
				description: "Please select a color",
				duration: 3000,
			});
			return;
		}

		if (!selectedModel) {
			toast.error("Model Required", {
				description: "Please select a model",
				duration: 3000,
			});
			return;
		}

		addToCart({
			productSlug: slug,
			quantity: selectedQuantity,
			color: selectedColor,
			model: selectedModel,
		});
	};

	if (isLoading) {
		return <LoadingPage />;
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<p className="text-lg font-semibold text-red-600">
					Error: {error.message}
				</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
				>
					Try Again
				</button>
			</div>
		);
	}

	if (!data) {
		return <div>Product data is not available</div>;
	}

	const product = data;

	return (
		<main className="bg-gray-50">
			<Wrapper>
				{/* Product Details Section */}
				<div className="grid md:grid-cols-6 gap-8 p-4">
					{/* Product Image Gallery */}
					<div className="md:col-span-3 col-span-1">
						<ImageCarousel images={product.image} lazyLoad={true} />
					</div>

					{/* Product Information */}
					<div className="md:col-span-3 col-span-1">
						<div className="flex flex-col gap-6">
							{/* Product Title and Price */}
							<div>
								<h1 className="text-3xl font-bold text-gray-900 leading-tight">
									{product.name}
								</h1>
								<div className="flex items-center gap-2 mt-2">
									<div className="flex items-center gap-1 text-yellow-500">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-5 h-5 ${
													i < product.rating ? "fill-yellow-500" : "fill-none"
												}`}
											/>
										))}
									</div>
									<span className="text-sm text-gray-600">
										({product.reviews} reviews)
									</span>
								</div>
								<div className="mt-4">
									{product.discount > 0 ? (
										<>
											<span className="text-3xl font-bold text-gray-900">
												{formattedCurrency(product.price - product.discount)}
											</span>
											<span className="ml-2 text-xl text-gray-500 line-through">
												{formattedCurrency(product.price)}
											</span>
											<span className="ml-2 text-lg text-green-600">
												{Math.round((product.discount / product.price) * 100)}%
												off
											</span>
										</>
									) : (
										<span className="text-3xl font-bold text-gray-900">
											{formattedCurrency(product.price)}
										</span>
									)}
								</div>
							</div>

							{/* Color Options */}
							<div>
								<div className="flex flex-col space-y-2">
									<label className="text-sm font-medium text-gray-700">
										Available Colors
									</label>
									<div className="flex flex-wrap gap-2">
										{product.colors.map((color) => (
											<button
												key={color}
												onClick={() => setSelectedColor(color)}
												className={`w-10 h-10 rounded-none  border-2 border-gray-900 ${
													selectedColor === color
														? "border-gray-900"
														: "border-transparent"
												}`}
												style={{ backgroundColor: color }}
												title={color.charAt(0).toUpperCase() + color.slice(1)}
											/>
										))}
									</div>
									{selectedColor && (
										<p className="text-sm text-gray-600 mt-2">
											Selected Color:{" "}
											<span className="font-medium">
												{selectedColor.charAt(0).toUpperCase() +
													selectedColor.slice(1)}
											</span>
										</p>
									)}
								</div>
							</div>

							{/* Model/Variants Selector */}
							<div>
								<SelectPhoneModel
									itemModel={product.model}
									value={selectedModel}
									onChange={setSelectedModel}
									title="Select Model"
								/>
							</div>
							{/* Quantity Controls */}
							<div className="flex gap-5 items-center">
								<button
									onClick={decrementQuantity}
									disabled={selectedQuantity <= 1 || isAddingToCart}
									className={`bg-gray-900 text-white py-2 px-4 rounded-md transition-colors
										${
											selectedQuantity <= 1
												? "opacity-50 cursor-not-allowed"
												: "hover:bg-gray-800"
										}`}
								>
									-
								</button>
								<span className="text-lg font-medium">{selectedQuantity}</span>
								<button
									onClick={incrementQuantity}
									disabled={selectedQuantity >= product.stock || isAddingToCart}
									className={`bg-gray-900 text-white py-2 px-4 rounded-md transition-colors
										${
											selectedQuantity >= product.stock
												? "opacity-50 cursor-not-allowed"
												: "hover:bg-gray-800"
										}`}
								>
									+
								</button>
							</div>
							{/* Add to Cart Button */}
							<button
								className={`w-full bg-gray-900 text-white py-3 px-6 rounded-md transition-colors
									${isAddingToCart ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
								onClick={handleAddToCart}
								disabled={isAddingToCart}
							>
								{isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
							</button>

							{/* Availability and Shipping */}
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Truck className="w-5 h-5" />
								<span>
									{product.stock > 0
										? `In Stock (${product.stock} available)`
										: "Out of Stock"}
								</span>
								<span>|</span>
								<span>Free shipping available</span>
							</div>

							{/* Wishlist Button */}
							<button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
								<Heart className="w-5 h-5" />
								<span>Add to Wishlist</span>
							</button>
						</div>
					</div>
				</div>

				{/* Product Description and Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
					<TabComponent
						data={{
							description: product.description,
							materials: product.materials,
							features: product.features,
							details: product.details,
						}}
					/>
				</div>

				{/* Reviews Section */}
				<div className="p-4">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Customer Reviews
					</h2>
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-1 text-yellow-500">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-5 h-5 ${
										i < product.rating ? "fill-yellow-500" : "fill-none"
									}`}
								/>
							))}
						</div>
						<span className="text-sm text-gray-600">
							({product.reviews} reviews)
						</span>
					</div>
					<button className="mt-4 text-gray-900 hover:underline">
						Read All Reviews
					</button>
				</div>
			</Wrapper>
		</main>
	);
}

// Optional: Add default props
ProductPage.defaultProps = {
	slug: "",
};
