"use client";
import React, {
	Suspense,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { CategoryContent } from "@/database/db";
import { Wrapper } from "@/components/wrapper";
import dynamic from "next/dynamic";
import { ProductCardSkeleton } from "@/components/skeleton";
import LoadingPage from "../loading";
import ColSideBar from "@/components/collectionSidebar/collectionSidebar";

// const ColSideBar = dynamic(
// 	() =>
// 		import("@/components/collectionSidebar/collectionSidebar").then(
// 			(mod) => mod.default
// 		),
// 	{ ssr: false, loading: () => <div>Loading Sidebar...</div> }
// );
const ProductCard = dynamic(
	() => import("@/components/card/productCard").then((mod) => mod.default),
	{ ssr: false, loading: () => <div>Loading Product Card...</div> }
);

const formatCategory = (id) =>
	CategoryContent[id]?.title ||
	id
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

const getSidebarCategory = (id) => {
	const categoryMap = {
		case: "Phone Cases",
		"phone-cases": "Phone Cases",
		"airpod-cases": "AirPod Cases",
		"watch-straps": "Watch Straps",
		chargers: "Chargers",
		adapters: "Chargers", // Map adapters to Chargers category
		"screen-protectors": "Screen Protectors",
		"watch-protectors": "Watch Protectors",
	};
	return categoryMap[id] || "Phone Cases";
};

const CollectionContent = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const category = searchParams.get("category") || "";
	const sortBy = searchParams.get("sortBy") || "";
	const sortOrder = searchParams.get("sortOrder") || "";
	const limit = parseInt(searchParams.get("limit") || "15", 10);
	const page = parseInt(searchParams.get("page") || "1", 10);
	const model = searchParams.get("model");
	const tags = searchParams.get("tags") || "";

	useEffect(() => {
		if (model) {
			try {
				const parsedModel = JSON.parse(model);
				setSelectedFilters(parsedModel);
			} catch (e) {
				console.error("Error parsing model:", e);
				setSelectedFilters([]);
			}
		} else {
			setSelectedFilters([]);
		}
	}, [model]);

	useEffect(() => {
		if (tags) {
			try {
				const parsedTags = JSON.parse(tags);
				setSelectedTags(Array.isArray(parsedTags) ? parsedTags : [tags]);
			} catch (e) {
				setSelectedTags([tags]);
			}
		} else {
			setSelectedTags([]);
		}
	}, [tags]);

	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const { data, isLoading, error } = useQuery({
		queryKey: [
			"colData",
			category,
			sortBy,
			sortOrder,
			limit,
			page,
			selectedFilters,
			selectedTags,
		],
		queryFn: async () => {
			const res = await axios.get(
				`${API_URL}/v1/getData?category=${category}&sortBy=${sortBy}&sortOrder=${sortOrder}&limit=${limit}&page=${page}&model=${JSON.stringify(
					selectedFilters
				)}&tags=${tags}`
			);
			if (res.status !== 200) {
				throw new Error("Failed to fetch data");
			}
			return res.data;
		},
		staleTime: 1000 * 60 * 10, // 10 minutes
		cacheTime: 1000 * 60 * 30, // 30 minutes
		enabled: !!category,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		keepPreviousData: true, // Smooth pagination
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});

	const handlePageChange = useCallback(
		(newPage) => {
			const currentParams = new URLSearchParams(searchParams.toString());
			currentParams.set("page", newPage.toString());
			router.push(`?${currentParams.toString()}`);
		},
		[router, searchParams]
	);

	const handleFilterChange = useCallback(
		(filters) => {
			const currentParams = new URLSearchParams(searchParams.toString());
			if (filters.length > 0) {
				currentParams.set("model", JSON.stringify(filters));
			} else {
				currentParams.delete("model");
			}
			router.push(`?${currentParams.toString()}`, { scroll: false });
		},
		[router, searchParams]
	);

	const renderProducts = useMemo(() => {
		if (isLoading) {
			return [...Array(limit)].map((_, idx) => (
				<ProductCardSkeleton key={idx} />
			));
		}

		if (error) {
			return (
				<div className="text-red-400 text-center col-span-full py-8">
					Error fetching products: {error.message}
				</div>
			);
		}

		if (!data?.data.length) {
			return (
				<div className="text-red-400 text-center col-span-full py-8">
					No products found matching your filters
				</div>
			);
		}

		return data.data.map((item) => (
			<ProductCard
				key={item._id}
				image={item.image[0]}
				images={item.image}
				name={item.name}
				color={item.color}
				slug={item.slug}
				discount={item.discount}
				price={item.price}
				category={item.category}
			/>
		));
	}, [isLoading, error, data, limit]);

	return (
		<main className="min-h-screen p-3 md:p-2">
			<Wrapper>
				<div>
					<Head
						headers={formatCategory(category || "case")}
						description={CategoryContent[category || "case"]?.description}
					/>

					<div className="flex flex-col md:flex-row gap-2">
						<div className="w-full md:w-1/4">
							<div className="md:sticky md:top-4">
								<ColSideBar
									category={getSidebarCategory(category || "case")}
									onFilterChange={handleFilterChange}
								/>
							</div>
						</div>
						<div className="w-full md:w-3/4">
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{renderProducts}
							</div>

							{data?.pagination && (
								<div className="flex gap-2 justify-center items-center mt-8">
									<button
										onClick={() => handlePageChange(page - 1)}
										disabled={page === 1}
										className="px-6 py-2.5 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
										aria-label="Previous page"
									>
										Previous
									</button>
									<span className="px-4 py-2">
										Page {page} of {data.pagination.totalPages}
									</span>
									<button
										onClick={() => handlePageChange(page + 1)}
										disabled={page === data.pagination.totalPages}
										className="px-6 py-2.5 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
										aria-label="Next page"
									>
										Next
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</Wrapper>
		</main>
	);
};

export default function Collection() {
	return (
		<Suspense
			fallback={
				<div>
					<LoadingPage />
				</div>
			}
		>
			<CollectionContent />
		</Suspense>
	);
}

const Head = React.memo(({ headers, description }) => (
	<div className="flex flex-col gap-4 md:py-6 mb-8">
		<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-[#011627]">
			{headers}
		</h1>
		<div className="text-gray-600">
			<p className="text-pretty w-full max-w-4xl text-sm md:text-base">
				{description}
			</p>
		</div>
	</div>
));

Head.propTypes = {
	headers: PropTypes.string.isRequired,
	description: PropTypes.string,
};
