"use client";
import { GetProduct } from "@/server/apiCalls";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../loading";
import ImageCarousel from "@/components/carousel/productCarousel";
import { Wrapper } from "@/components/wrapper";
import TabComponent from "@/components/tabs/tab";
import { useState } from "react";
import SelectPhoneModel from "@/components/productAccordion/accordion";

export default function ProductPage({ slug }) {
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
	});

	const [selectedColor, setSelectedColor] = useState("");
	const [selectedModel, setSelectedModel] = useState("");

	if (isLoading) {
		return <LoadingPage />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!data) {
		return <div>Product data is not available</div>;
	}

	const product = data;

	return (
		<main>
			<Wrapper>
				<div className="grid md:grid-cols-6 gap-4 p-3">
					<div className="md:col-span-3 col-span-1 border-r-2">
						<ImageCarousel images={product.image} />
					</div>
					<div className="md:col-span-3 col-span-1">
						<div className="flex flex-col gap-4">
							<h1 className="text-bodyMd font-semibold">{product.name}</h1>
							<div>
								<label className="text-sm font-medium text-gray-700">
									Color
								</label>
								<select
									value={selectedColor}
									onChange={(e) => setSelectedColor(e.target.value)}
									className="w-full rounded-none focus:ring-0 outline-none"
								>
									{product.colors.map((color) => (
										<option key={color} value={color}>
											{color}
										</option>
									))}
								</select>
							</div>
							<div>
								<SelectPhoneModel
									itemModel={product.model}
									value={selectedModel}
									onChange={setSelectedModel}
									title="Model"
								/>
							</div>
							<button className="bg-blue-500 text-white py-2 px-4 rounded">
								Add to Cart
							</button>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
					<TabComponent
						data={{
							description: product.description,
							materials: product.materials,
							features: product.features,
							details: product.details,
						}}
					/>
				</div>
			</Wrapper>
		</main>
	);
}

// Optional: Add default props
ProductPage.defaultProps = {
	slug: "",
};
