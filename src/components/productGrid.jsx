import { ProductCard } from "@/components/card/productCard";
import { ProductCardSkeleton } from "@/components/skeleton";

const ProductGrid = ({ isLoading, data, limit }) => {
	if (isLoading) {
		return (
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{[...Array(limit)].map((_, idx) => (
					<ProductCardSkeleton key={idx} />
				))}
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

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{data.data.map((item) => (
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
			))}
		</div>
	);
};

export default ProductGrid;
