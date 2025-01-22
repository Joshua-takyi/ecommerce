"use client";
import PropTypes from "prop-types";

export const FormDateTimeInput = ({
	label,
	value,
	onChange,
	placeholder,
	required,
	error,
}) => {
	return (
		<div className="space-y-2">
			<label className="text-sm font-medium text-gray-700">
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<input
				type="datetime-local"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
				placeholder={placeholder}
				required={required}
			/>
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	);
};

FormDateTimeInput.propTypes = {
	label: PropTypes.string.isRequired, // Label for the input
	value: PropTypes.string.isRequired, // Current value of the input (in ISO format)
	onChange: PropTypes.func.isRequired, // Function to handle input changes
	placeholder: PropTypes.string, // Placeholder for the input
	required: PropTypes.bool, // Whether the input is required
	error: PropTypes.string,
};
