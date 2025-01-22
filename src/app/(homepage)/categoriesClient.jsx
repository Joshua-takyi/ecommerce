"use client";

import Image from "next/image";
import Link from "next/link";
import { Wrapper } from "@/components/wrapper";
import { categoryItems } from "@/database/db";
import Carousel from "@/components/carousel/cardsCarousel";

export default function CategoriesClient() {
	if (!categoryItems || categoryItems.length === 0) {
		return <div>No categories available.</div>;
	}

	return (
		<section className="bg-[#F9FAFB] py-16 md:py-24">
			<Wrapper>
				<div className="flex flex-col space-y-8">
					{/* Header Section */}
					<div className="flex flex-col space-y-4">
						<h2 className="text-h3 font-semibold text-gray-900">
							Shop by Category
						</h2>
						<p className="text-bodySm text-gray-600 max-w-2xl">
							Explore our curated selection of categories, each offering unique
							premium products.
						</p>
					</div>

					{/* Carousel Section */}
					<Carousel>
						{categoryItems.map((item) => (
							<Link
								key={item.id}
								href={`/collection?category=${item.search}&sortBy=price&sortOrder=desc&limit=10&page=1`}
								prefetch={true}
								className="flex flex-col justify-center items-center p-4 group cursor-pointer"
							>
								<div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-full">
									<Image
										src={item.image}
										alt={`Category: ${item.name}`}
										fill
										loading="lazy"
										sizes="(max-width: 640px) 100px, (max-width: 768px) 150px, (max-width: 1024px) 200px, 220px"
										priority={item.id === 0}
										className="object-cover transition-all duration-500"
									/>
								</div>
								<p className="mt-4 text-body font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
									{item.name}
								</p>
							</Link>
						))}
					</Carousel>
				</div>
			</Wrapper>
		</section>
	);
}
