"use client";
import ProductCard from "@/components/card/productCard";
import { GetByCategory } from "@/server/apiCalls";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function ColPage() {
	const searchparams = useSearchParams();
	const category = searchparams.get("category") || "";
	const tags = searchparams.get("tag") || "";
	const sortOrder = searchparams.get("sort") || "desc";
	const sortBy = searchparams.get("sortBy") || "createdAt";
	const page = parseInt(searchparams.get("page") || "1", 10);
	const limit = parseInt(searchparams.get("limit") || "12", 10);
	const model = searchparams.get("model");

	const { data, isLoading, error } = useQuery({
		queryKey: [
			"products",
			category,
			tags,
			sortOrder,
			sortBy,
			page,
			limit,
			model,
		],
		queryFn: async () => {
			const res = await GetByCategory({
				category,
				sortBy,
				sortOrder,
				limit,
				page,
				tags,
				model,
			});
			return res.data;
		},
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	if (!data || data.length === 0) return <div>No data found</div>;
	return (
		<main className="p-3">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{data.map((product) => (
					<ProductCard
						key={product._id}
						slug={product.slug}
						image={product.image[0]}
						name={product.name}
						price={product.price}
						alt={product.name}
						discount={product.discount}
					/>
				))}
			</div>
		</main>
	);
}
