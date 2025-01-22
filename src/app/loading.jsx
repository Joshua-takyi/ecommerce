"use client"
import { motion } from "framer-motion";

export default function LoadingPage() {
	return (
		<div className="fixed inset-0 bg-white">
			<div className="flex items-center justify-center min-h-screen">
				<motion.div
					className="flex gap-2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{[1, 2, 3].map((dot) => (
						<motion.div
							key={dot}
							className="w-4 h-4 bg-black rounded-full"
							animate={{
								y: ["0%", "-50%", "0%"],
							}}
							transition={{
								duration: 0.8,
								repeat: Infinity,
								delay: dot * 0.15,
								ease: "easeInOut",
							}}
						/>
					))}
				</motion.div>
			</div>
		</div>
	);
}
