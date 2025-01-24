"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";

export const ImageCarousel = ({ images = [] }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleThumbnailClick = (index) => {
		setActiveIndex(index);
	};

	const handleMainImageClick = () => {
		window.open(images[activeIndex], "_blank");
	};

	const nextImage = () => {
		setActiveIndex((prev) => (prev + 1) % images.length);
	};

	const previousImage = () => {
		setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	if (!images.length) {
		return <div>No images available</div>;
	}

	return (
		<div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto w-full p-6">
			{/* Main Image Container - Mobile-First Larger Design */}
			<div className="relative w-full sm:aspect-[16/10] aspect-square rounded-lg overflow-hidden group bg-transparent">
				{/* Navigation Buttons */}
				<button
					onClick={previousImage}
					className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					aria-label="Previous image"
				>
					<ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
				</button>
				<button
					onClick={nextImage}
					className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					aria-label="Next image"
				>
					<ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
				</button>

				{/* Main Image with Maximize Icon */}
				<div
					className="relative w-full h-full bg-transparent cursor-pointer group"
					onClick={handleMainImageClick}
				>
					<Image
						src={images[activeIndex]}
						fill
						alt={`Main Image ${activeIndex + 1}`}
						sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 80vw"
						className="object-contain transition-all duration-500 ease-in-out imgBg"
						priority={true}
					/>
					<div className="absolute top-4 right-4 bg-white/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
						<Maximize className="w-5 h-5 text-gray-800" />
					</div>
				</div>
			</div>

			{/* Thumbnails - Responsive Design */}
			<div className="flex gap-2 sm:gap-4 overflow-x-auto max-w-full pb-2 px-2">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => handleThumbnailClick(index)}
						className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 
              ${
								activeIndex === index
									? "ring-2 ring-blue-500 scale-105 shadow-lg"
									: "ring-1 ring-gray-200 hover:ring-blue-300 opacity-70 hover:opacity-100"
							}`}
					>
						<div className="relative w-16 sm:w-24 h-16 sm:h-24">
							<Image
								src={image}
								fill
								alt={`Thumbnail ${index + 1}`}
								className="object-cover transition-transform duration-300"
								sizes="(max-width: 640px) 64px, 96px"
							/>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default ImageCarousel;
