import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { redirect } from "next/navigation";

const formatCurrency = (price) =>
	new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }).format(
		price
	);

const formattedName = (name) =>
	name?.length > 20 ? name.trim().slice(0, 20) + "..." : name;

const handleClick = (e, slug) => {
	e.preventDefault();
	redirect(`/product/${slug}`);
};

export default function ProductCard({ slug, image, name, price, discount }) {
	const { discountPrice } = discount
		? { discountPrice: price - (price * discount) / 100 }
		: { discountPrice: price };

	return (
		<div
			className="relative w-full aspect-[3/4] group cursor-pointer"
			onClick={(e) => handleClick(e, slug)}
		>
			<div className="relative w-full h-[80%]">
				<Image
					fill
					src={image}
					alt={name}
					loading="lazy"
					className="object-cover group-hover:scale-105 transition-transform duration-300"
					sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
				/>
				{discount && (
					<div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs">
						{discount}% OFF
					</div>
				)}
			</div>
			<div className="mt-2 flex flex-col  gap-2">
				<p className="text-sm">{formattedName(name)}</p>
				<div className="flex items-center gap-2">
					{discount ? (
						<>
							<p className="text-sm line-through text-gray-400">
								{formatCurrency(price)}
							</p>
							<p className="text-sm font-semibold">
								{formatCurrency(discountPrice)}
							</p>
						</>
					) : (
						<p className="text-sm font-semibold">{formatCurrency(price)}</p>
					)}
				</div>
			</div>
		</div>
	);
}

ProductCard.propTypes = {
	slug: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	discount: PropTypes.number,
};
