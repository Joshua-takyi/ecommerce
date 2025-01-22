"use client";
import { Wrapper } from "@/components/wrapper";
import { GetProduct } from "@/server/apiCalls";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ProductCardSkeleton } from "@/components/skeleton";
import ImageCarousel from "@/components/carousel/productCarousel";
import ColorSelect from "@/components/color";

export default function Product({ slug }) {
	const [color, setColor] = useState("")
	const [model, setModel = useState("")
		// Fetch product data using useQuery
	const { data, isLoading, error } = useQuery({
		queryKey: ["product", slug],
		queryFn: async () => {
			try {
				const data = await GetProduct(slug);
				return data.data;
			} catch (error) {
				console.error("Error fetching product:", error);
				throw new Error(error.message || "Failed to fetch product data");
			}
		},
	});

	// Memoize product data to avoid unnecessary re-renders
	const product = useMemo(() => data, [data]);

	// Handle loading state
	if (isLoading) {
		return <ProductCardSkeleton />; // Use a skeleton loader
	}

	// Handle error state
	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-red-500">Error: {error.message}</p>
			</div>
		);
	}

	// Handle no data state
	if (!product) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>No data found</p>
			</div>
		);
	}

	return (
		<main className="min-h-screen p-3 md:p-2 text-bodySm">
			<Wrapper>
				<div className="grid grid-cols-1 md:grid-col-2">
					<div className="col-span-1">
						<ImageCarousel images={product.image} />
					</div>
					<div>
						<div className="flex flex-col space-y-4 justify-center">
							<h1 className="text-bodyLg ">{product.name}</h1>
							{/* details for the color and model */}
							<div className="flex flex-col space-y-2">
								<ColorSelect />
							</div>
						</div>
					</div>
				</div>
			</Wrapper>
		</main>
	);
}

// Correct PropTypes definition
Product.propTypes = {
	slug: PropTypes.string.isRequired,
};
