"use client";
import { Plus, X } from "lucide-react";
import PropTypes from "prop-types";

export const FormColors = ({
	colors,
	onAddColor,
	onChangeColor,
	onDeleteColor,
}) => {
	return (
		<div className="space-y-4">
			<p className="text-xl font-semibold text-gray-800">Colors</p>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{colors.map((color, index) => (
					<div
						key={index}
						className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
					>
						<input
							type="color"
							value={color}
							onChange={(e) => onChangeColor(index, e.target.value)}
							className="w-12 h-12 p-1 rounded cursor-pointer"
						/>
						<div className="flex-1">
							<p className="text-sm font-medium">{color}</p>
						</div>
						<button
							type="button"
							onClick={() => onDeleteColor(index)}
							className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
						>
							<X size={16} />
						</button>
					</div>
				))}
			</div>
			<button
				type="button"
				onClick={onAddColor}
				className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
			>
				<Plus size={16} />
				<span>Add Color</span>
			</button>
		</div>
	);
};

FormColors.propTypes = {
	colors: PropTypes.array.isRequired,
	onAddColor: PropTypes.func.isRequired,
	onChangeColor: PropTypes.func.isRequired,
	onDeleteColor: PropTypes.func.isRequired,
};
