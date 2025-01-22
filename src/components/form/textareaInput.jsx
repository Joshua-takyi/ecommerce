"use client";
import PropTypes from "prop-types";

export const FormTextarea = ({
	label,
	name,
	value,
	onChange,
	placeholder,
	rows = 4,
	error,
}) => {
	return (
		<div className="space-y-2">
			<label htmlFor={name} className="text-sm font-medium text-gray-700">
				{label}
			</label>
			<textarea
				name={name}
				value={value}
				onChange={onChange}
				rows={rows}
				className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
				placeholder={placeholder}
			/>
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	);
};

FormTextarea.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	rows: PropTypes.number,
	error: PropTypes.string,
};
