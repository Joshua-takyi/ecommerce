"use client";

import React from "react";
import { Wrapper } from "@/components/wrapper";
import { ChevronRight, Shield, Truck, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
	return (
		<motion.div
			className="bg-gradient-to-br from-amber-600 to-orange-500 min-h-[50dvh] md:min-h-[70dvh] text-white relative overflow-hidden "
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-300 via-orange-400 to-amber-600"></div>

			<Wrapper className="relative z-10 h-full">
				<motion.div
					className="flex flex-col justify-center h-full text-center"
					initial={{ y: -50 }}
					animate={{ y: 0 }}
					transition={{ duration: 1, ease: "easeOut" }}
				>
					<div className="max-w-3xl mx-auto space-y-6 ">
						{/* Announcement Badge */}
						<motion.div
							className="inline-flex items-center gap-2 bg-amber-500/30 px-4 py-2 rounded-full mx-auto"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							<span className="animate-pulse bg-green-400 h-2 w-2 rounded-full"></span>
							New iPhone 15 Pro Max Available
						</motion.div>

						{/* Hero Heading */}
						<motion.h1
							className="font-bold leading-tight font-spaceMono"
							style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }} // h1 font size
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						>
							Your Premium Phone Shopping Destination
						</motion.h1>

						{/* Hero Subheading */}
						<motion.p
							className="text-amber-100 max-w-2xl mx-auto leading-relaxed"
							style={{ fontSize: "clamp(1rem, 1.25vw, 1.125rem)" }} // body font size
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.7 }}
						>
							Discover an extensive collection of premium smartphones,
							accessories, and gadgets. Get the latest technology with exclusive
							deals and expert support.
						</motion.p>

						{/* Call to Action Buttons */}
						<motion.div
							className="flex  justify-center gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.9 }}
						>
							<button
								className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors"
								style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }} // bodySm font size
							>
								Shop Now
								<ChevronRight className="w-4 h-4" />
							</button>
							<button
								className="inline-flex items-center justify-center gap-2 bg-amber-500/30 backdrop-blur-sm px-8 py-3 rounded-full font-semibold hover:bg-amber-500/40 transition-colors"
								style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }} // bodySm font size
							>
								View Deals
							</button>
						</motion.div>

						{/* Features Section */}
						<motion.div
							className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-4xl mx-auto"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.1 }}
						>
							<div
								className="flex items-center justify-center gap-2"
								style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }} // bodySm font size
							>
								<Truck className="w-5 h-5 text-amber-200" />
								<span>Free Express Delivery</span>
							</div>
							<div
								className="flex items-center justify-center gap-2"
								style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }} // bodySm font size
							>
								<Shield className="w-5 h-5 text-amber-200" />
								<span>2 Year Warranty</span>
							</div>
							<div
								className="flex items-center justify-center gap-2"
								style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }} // bodySm font size
							>
								<Clock className="w-5 h-5 text-amber-200" />
								<span>24/7 Support</span>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</Wrapper>
		</motion.div>
	);
}
