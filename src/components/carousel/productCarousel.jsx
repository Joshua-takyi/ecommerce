"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useSwipeable } from "react-swipeable";

export const ImageCarousel = ({ images = [] }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isFullScreen, setIsFullScreen] = useState(false); // State for full-screen mode

	// Swipe Handlers
	const handlers = useSwipeable({
		onSwipedLeft: () => nextImage(),
		onSwipedRight: () => previousImage(),
		preventScrollOnSwipe: true,
		trackMouse: true,
	});

	const handleThumbnailClick = (index) => {
		setActiveIndex(index);
	};

	const nextImage = () => {
		setActiveIndex((prev) => (prev + 1) % images.length);
	};

	const previousImage = () => {
		setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const toggleFullScreen = () => {
		setIsFullScreen(!isFullScreen); // Toggle full-screen mode
	};

	if (!images.length) {
		return <div>No images available</div>;
	}

	return (
		<div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto w-full p-6">
			{/* Main Image Container */}
			<div
				{...handlers} // Attach swipe handlers
				className={`relative w-full aspect-[16/10] rounded-lg overflow-hidden group bg-transparent ${
					isFullScreen
						? "fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
						: ""
				}`}
			>
				{/* Navigation Buttons */}
				{!isFullScreen && (
					<>
						<button
							onClick={previousImage}
							className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							aria-label="Previous image"
						>
							<ChevronLeft className="w-8 h-8 text-gray-800" />
						</button>
						<button
							onClick={nextImage}
							className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							aria-label="Next image"
						>
							<ChevronRight className="w-8 h-8 text-gray-800" />
						</button>
					</>
				)}

				{/* Main Image - Clickable to toggle full-screen */}
				<div
					className={`relative w-full h-full bg-transparent ${
						isFullScreen ? "max-w-[90vw] max-h-[90vh]" : ""
					}`}
					onClick={toggleFullScreen}
				>
					<Image
						src={images[activeIndex]}
						fill
						alt={`Main Image ${activeIndex + 1}`}
						sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 80vw"
						className={`object-contain transition-all duration-500 ease-in-out ${
							isFullScreen ? "cursor-zoom-out" : "cursor-zoom-in"
						}`}
						priority={true}
					/>
				</div>

				{/* Close Button for Full-Screen */}
				{isFullScreen && (
					<button
						onClick={toggleFullScreen}
						className="absolute top-4 right-4 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg z-10"
						aria-label="Close full screen"
					>
						<X className="w-8 h-8 text-gray-800" />
					</button>
				)}
			</div>

			{/* Thumbnails */}
			{!isFullScreen && (
				<div className="flex gap-4 overflow-x-auto max-w-full pb-2 px-2">
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
							<div className="relative w-24 h-24">
								<Image
									src={image}
									fill
									alt={`Thumbnail ${index + 1}`}
									className="object-cover transition-transform duration-300"
									sizes="96px"
								/>
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default ImageCarousel;
