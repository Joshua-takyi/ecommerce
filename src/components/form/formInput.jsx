"use client";
import PropTypes from "prop-types";

export const FormInput = ({
	label,
	name,
	value,
	onChange,
	placeholder,
	required,
	type,
	error
}) => {
	return (
		<div className="space-y-2">
			<label htmlFor={name} className="text-sm font-medium text-gray-700">
				{label} {required && <span className="text-red-500">*</span>}
			</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className="w-full p-3 border border-gray-200 rounded-lg outline-none transition-all"
				placeholder={placeholder}
				required={required}
			/>
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	);
};

FormInput.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	type: PropTypes.string,
	error: PropTypes.string,
};

FormInput.defaultProps = {
	type: "text",
};
