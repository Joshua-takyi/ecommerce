"use client";
import PropTypes from "prop-types";

export const FormCheckbox = ({ label, name, checked, onChange, error }) => {
	return (
		<div className="flex items-center gap-3 p-2">
			<input
				type="checkbox"
				name={name}
				checked={checked}
				onChange={onChange}
				className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
			/>
			<label
				htmlFor={name}
				className="text-sm font-medium text-gray-700 cursor-pointer"
			>
				{label}
			</label>
			{error && <p className="text-red-500 text-xs mt-1">{error}</p>}
		</div>
	);
};

FormCheckbox.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
};
