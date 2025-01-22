"use client";
import { Plus, X } from "lucide-react";
import PropTypes from "prop-types";

export const FormDynamicList = ({
	label,
	items,
	onAddItem,
	onChangeItem,
	onDeleteItem,
	placeholder,
	className,
	error,
}) => {
	return (
		<div className={`space-y-4 ${className}`}>
			<p className="text-xl font-semibold text-gray-800">{label}</p>
			{error && <p className="text-red-500 text-sm">{error}</p>}
			{items.map((item, index) => (
				<div key={index} className="flex items-center gap-2">
					<input
						type="text"
						value={item}
						onChange={(e) => onChangeItem(index, e.target.value)}
						className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
						placeholder={placeholder}
					/>
					<button
						type="button"
						onClick={() => onDeleteItem(index)}
						className="p-2 text-red-500 hover:bg-red-50 rounded-sm"
					>
						<X size={16} />
					</button>
				</div>
			))}
			<button
				type="button"
				onClick={onAddItem}
				className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors"
			>
				<Plus size={16} />
				<span>Add {label}</span>
			</button>
		</div>
	);
};

FormDynamicList.propTypes = {
	label: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
	onAddItem: PropTypes.func.isRequired,
	onChangeItem: PropTypes.func.isRequired,
	onDeleteItem: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	error: PropTypes.string,
};
