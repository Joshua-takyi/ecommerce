"use client";
import PropTypes from "prop-types";

export const FormSubmitButton = ({ isLoading }) => {
	return (
		<button
			type="submit"
			className="w-full md:w-auto px-8 py-3 bg-black text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
			disabled={isLoading}
		>
			{isLoading ? "Saving..." : "Save Product"}
		</button>
	);
};

FormSubmitButton.propTypes = {
	isLoading: PropTypes.bool.isRequired,
};
