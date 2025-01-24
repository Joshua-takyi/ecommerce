"use client";
import React from "react";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";

export default function SelectPhoneColor({
	itemColor = [],
	value,
	onChange,
	title,
}) {
	// Sort colors with a preference for certain orders
	const sortedColors = React.useMemo(() => {
		const preferredOrder = [
			"black",
			"white",
			"silver",
			"gold",
			"blue",
			"red",
			"green",
		];

		return itemColor.sort((a, b) => {
			const indexA = preferredOrder.indexOf(a.toLowerCase());
			const indexB = preferredOrder.indexOf(b.toLowerCase());

			// Sort based on preferred order if present
			if (indexA !== -1 && indexB !== -1) {
				return indexA - indexB;
			}
			if (indexA !== -1) return -1; // Prioritize items in the preferred order
			if (indexB !== -1) return 1;

			// Fallback to lexicographical sorting if not in the preferred order
			return a.localeCompare(b);
		});
	}, [itemColor]);

	return (
		<div className="w-full max-w-full space-y-2">
			{title && (
				<label className="text-sm font-medium text-gray-700">{title}</label>
			)}

			<Select value={value} onValueChange={onChange}>
				<SelectTrigger className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500">
					<SelectValue placeholder="Choose a color" />
				</SelectTrigger>
				<SelectContent className="rounded-md">
					{sortedColors.map((color) => (
						<SelectItem key={color} value={color} className="capitalize">
							{/* Properly capitalize the first letter of each color */}
							{color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
