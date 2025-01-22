import { Wrapper } from "@/components/wrapper";
import { ChevronRight, Shield, Truck, Clock } from "lucide-react";

export default function Hero() {
	return (
		<div className="bg-gradient-to-br from-blue-700 to-blue-600 min-h-[80vh] text-white relative overflow-hidden">
			<Wrapper className="relative z-10">
				<div className="grid md:grid-cols-12 grid-cols-1 items-center min-h-[70vh] gap-8">
					{/* Content Section */}
					<div className="col-span-6 flex flex-col gap-6 py-12 md:py-0">
						{/* Announcement Banner */}
						<div className="inline-flex items-center gap-2 bg-blue-600/30 px-4 py-2 rounded-full backdrop-blur-sm text-banner">
							<span className="animate-pulse bg-green-400 h-2 w-2 rounded-full"></span>
							New iPhone 15 Pro Max Available
						</div>

						{/* Main Heading */}
						<h1 className="text-display-hero font-bold leading-[1.1] tracking-tight">
							Your Premium Phone Shopping Destination
						</h1>

						{/* Subheading */}
						<p className="text-body-lg text-blue-100 leading-relaxed max-w-2xl">
							Discover an extensive collection of premium smartphones,
							accessories, and gadgets. Get the latest technology with exclusive
							deals and expert support.
						</p>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 mt-4">
							<button className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors text-body">
								Shop Now
								<ChevronRight className="w-4 h-4" />
							</button>
							<button className="inline-flex items-center justify-center gap-2 bg-blue-600/30 backdrop-blur-sm px-8 py-3 rounded-full font-semibold hover:bg-blue-600/40 transition-colors text-body">
								View Deals
							</button>
						</div>

						{/* Features */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
							<div className="flex items-center gap-2 text-body-sm">
								<Truck className="w-4 h-4 shrink-0" />
								<span>Free Express Delivery</span>
							</div>
							<div className="flex items-center gap-2 text-body-sm">
								<Shield className="w-4 h-4 shrink-0" />
								<span>2 Year Warranty</span>
							</div>
							<div className="flex items-center gap-2 text-body-sm">
								<Clock className="w-4 h-4 shrink-0" />
								<span>24/7 Support</span>
							</div>
						</div>
					</div>

					{/* Image Section */}
					<div className="col-span-6 relative h-full flex items-center justify-center p-4">
						<div className="relative w-full aspect-square">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-blue-600/30 backdrop-blur-sm rounded-full animate-pulse"></div>
							{/* <img
								src="/api/placeholder/500/500"
								alt="Latest Smartphones"
								className="absolute inset-0 w-full h-full object-contain"
							/> */}
						</div>
					</div>
				</div>
			</Wrapper>

			{/* Background Decorative Elements */}
			<div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-400/20 to-blue-600/20 blur-3xl"></div>
			<div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-400/20 to-blue-600/20 blur-3xl"></div>
		</div>
	);
}
