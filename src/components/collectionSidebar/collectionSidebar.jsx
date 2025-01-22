"use client";
import { useState, useEffect } from "react";
import { ChevronRight, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { filterData } from "@/database/db";

export default function ColSideBar({
	category = "Phone Cases",
	onFilterChange,
}) {
	const [openCategory, setOpenCategory] = useState(null);
	const [selectedModels, setSelectedModels] = useState([]);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const searchParams = useSearchParams();

	const normalizeCategory = (category) => {
		return category.replace(/-/g, " ");
	};

	const currentCategories = filterData[normalizeCategory(category)] || {};

	useEffect(() => {
		const model = searchParams.get("model");
		if (model) {
			try {
				const parsedModel = JSON.parse(model);
				setSelectedModels(parsedModel);
			} catch (e) {
				console.error("Error parsing model:", e);
				setSelectedModels([]);
			}
		} else {
			setSelectedModels([]);
		}
	}, [category, searchParams]);

	useEffect(() => {
		if (isMobileOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isMobileOpen]);

	const handleCheckboxChange = (model) => {
		const normalizedModel = model.toLowerCase();
		const newSelectedModels = selectedModels.includes(normalizedModel)
			? selectedModels.filter((m) => m !== normalizedModel)
			: [...selectedModels, normalizedModel];

		setSelectedModels(newSelectedModels);
		onFilterChange(newSelectedModels);
	};

	const handleSelectAll = (subCategory) => {
		const subCategoryModels = currentCategories[subCategory].map((m) =>
			m.toLowerCase()
		);
		const allSelected = subCategoryModels.every((model) =>
			selectedModels.includes(model)
		);

		const newSelectedModels = allSelected
			? selectedModels.filter((model) => !subCategoryModels.includes(model))
			: [...new Set([...selectedModels, ...subCategoryModels])];

		setSelectedModels(newSelectedModels);
		onFilterChange(newSelectedModels);
	};

	const getFilterTitle = () => {
		switch (category.toLowerCase()) {
			case "phone-cases":
			case "cases":
			case "phone case":
			case "case":
				return "Phone Models";

			case "airpod-cases":
			case "airpod":
			case "airpods":
			case "airpods-case":
				return "AirPods Models";

			case "straps":
			case "watch-straps":
			case "watch strap":
			case "watch straps":
			case "iwatch-straps":
			case "iwatch strap":
				return "Watch Straps";

			case "chargers":
			case "charger":
			case "charging-cables":
			case "charging cable":
			case "usb-chargers":
			case "usb charger":
				return "Charger Models";

			case "iwatch-protectors":
			case "iwatch protector":
			case "apple-watch-protectors":
			case "apple watch protector":
				return "iWatch Protectors";

			case "watch protector":
			case "watch-protector":
			case "screen protectors":
			case "screen protector":
				return "Watch Protectors";
		}
	};

	return (
		<>
			{/* Mobile Filter Button */}
			<button
				onClick={() => setIsMobileOpen(true)}
				className="fixed bottom-4 right-4 md:hidden z-30 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2"
			>
				<span>Filters</span>
				<span className="bg-blue-500 px-2 py-0.5 rounded-full text-sm">
					{selectedModels.length}
				</span>
			</button>

			{/* Mobile Overlay */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			<aside
				className={`
					md:block bg-white z-50
					w-[280px] md:w-full max-w-xs
					transition-transform duration-300 ease-in-out
					${
						isMobileOpen
							? "fixed inset-y-0 right-0 translate-x-0"
							: "fixed inset-y-0 right-0 translate-x-full md:relative md:translate-x-0"
					}
				`}
			>
				<div className="flex flex-col h-full">
					{/* Mobile Header */}
					<div className="flex items-center justify-between p-4 md:hidden border-b border-gray-100">
						<h2 className="text-lg font-medium">Filters</h2>
						<button
							onClick={() => setIsMobileOpen(false)}
							className="p-2 hover:bg-gray-100 rounded-full"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Desktop Header */}
					<h2 className="hidden md:block text-sm font-medium text-gray-500 px-4 py-3 uppercase tracking-wider border-b border-gray-100">
						{getFilterTitle()}
					</h2>

					{/* Filters Content */}
					<div className="flex-1 overflow-y-auto">
						<div className="flex flex-col divide-y divide-gray-100">
							{Object.entries(currentCategories).map(
								([subCategory, models]) => (
									<div key={subCategory}>
										<div className="flex flex-col">
											<button
												onClick={() =>
													setOpenCategory(
														openCategory === subCategory ? null : subCategory
													)
												}
												className="flex items-center justify-between w-full px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
											>
												<div className="flex items-center justify-between w-full">
													<span className="font-medium text-gray-900">
														{subCategory}
													</span>
													<ChevronRight
														className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
															openCategory === subCategory ? "rotate-90" : ""
														}`}
													/>
												</div>
											</button>

											<div
												className={`transition-all duration-200 ease-in-out
                        ${openCategory === subCategory ? "block" : "hidden"}
                      `}
											>
												<div className="px-4 py-2 space-y-1">
													<button
														onClick={() => handleSelectAll(subCategory)}
														className="text-xs text-blue-600 hover:text-blue-700 mb-2"
													>
														Select All
													</button>
													<div className="space-y-1">
														{models.map((model) => (
															<label
																key={model}
																className="flex items-center py-1 cursor-pointer group"
															>
																<input
																	type="checkbox"
																	checked={selectedModels.includes(
																		model.toLowerCase()
																	)}
																	onChange={() => handleCheckboxChange(model)}
																	className="w-4 h-4 rounded border-gray-300 text-blue-500 
                                  focus:ring-1 focus:ring-blue-500 focus:ring-offset-0"
																/>
																<span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900">
																	{model}
																</span>
															</label>
														))}
													</div>
												</div>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>

					{/* Mobile Apply Button */}
					<div className="p-4 border-t border-gray-100 md:hidden">
						<button
							onClick={() => setIsMobileOpen(false)}
							className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
						>
							Apply Filters
						</button>
					</div>
				</div>
			</aside>
		</>
	);
}
