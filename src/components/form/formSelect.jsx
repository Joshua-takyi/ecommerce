"use client";
import { Tag, X } from "lucide-react";
import PropTypes from "prop-types";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectLabel,
	SelectGroup,
} from "@/components/ui/select";

export const FormSelect = ({
	options,
	value,
	onChange,
	placeholder,
	className,
	isMulti = false,
	label,
	required,
	error,
}) => {
	const handleRemoveItem = (itemValue) => {
		if (isMulti) {
			const updatedValue = value.filter((val) => val !== itemValue);
			onChange(updatedValue);
		} else {
			onChange("");
		}
	};

	const findLabel = (value) => {
		for (const group of options) {
			for (const item of group.items) {
				// Check main category items
				if (item.value === value) return item.label;
				// Check subcategories
				if (item.subcategories) {
					const subcategory = item.subcategories.find(
						(sub) => sub.value === value
					);
					if (subcategory) return subcategory.label;
				}
			}
		}
		return value; // Return value if label is not found
	};

	return (
		<div className="space-y-2">
			{label && (
				<label className="block text-sm font-medium text-gray-700">
					{label} {required && <span className="text-red-500">*</span>}
				</label>
			)}
			{error && <p className="text-red-500 text-sm">{error}</p>}

			{isMulti && value.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-2">
					{value.map((itemValue) => (
						<div
							key={itemValue}
							className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-md"
						>
							<Tag size={16} />
							<span className="text-sm font-medium">
								{findLabel(itemValue)}
							</span>
							<button
								type="button"
								onClick={() => handleRemoveItem(itemValue)}
								className="hover:bg-blue-100 rounded-full p-1"
							>
								<X size={16} />
							</button>
						</div>
					))}
				</div>
			)}

			{!isMulti && value && (
				<div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-md mb-3">
					<Tag size={16} />
					<span className="text-sm font-medium">{findLabel(value)}</span>
					<button
						type="button"
						onClick={() => handleRemoveItem(value)}
						className="hover:bg-blue-100 rounded-full p-1"
					>
						<X size={16} />
					</button>
				</div>
			)}

			<Select
				onValueChange={(selectedValue) => {
					if (isMulti) {
						if (!value.includes(selectedValue)) {
							onChange([...value, selectedValue]);
						}
					} else {
						onChange(selectedValue);
					}
				}}
				value={isMulti ? "" : value || ""}
			>
				<SelectTrigger className={className}>
					<SelectValue
						placeholder={
							isMulti
								? value.length > 0
									? `${value.length} selected`
									: placeholder
								: value
								? findLabel(value)
								: placeholder
						}
					/>
				</SelectTrigger>
				<SelectContent>
					{options.map((group) => (
						<SelectGroup key={group.label}>
							<SelectLabel className="font-bold text-sm text-gray-700">
								{group.label}
							</SelectLabel>
							{group.items.map((item) => (
								<div key={item.value}>
									{/* Main category item */}
									<SelectItem
										value={item.value}
										className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
									>
										{item.label}
									</SelectItem>
									{/* Subcategories */}
									{item.subcategories &&
										item.subcategories.map((subcategory) => (
											<SelectItem
												key={subcategory.value}
												value={subcategory.value}
												className="pl-8 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
											>
												{subcategory.label}
											</SelectItem>
										))}
								</div>
							))}
						</SelectGroup>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

FormSelect.propTypes = {
	options: PropTypes.array.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // Allow array for multi-select
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	isMulti: PropTypes.bool, // Add multi-select prop
	label: PropTypes.string, // Add label prop
	required: PropTypes.bool, // Add required prop
	error: PropTypes.string,
};
