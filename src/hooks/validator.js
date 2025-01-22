import { useState } from "react";
import { z } from "zod";

const UseFormValidator = (schema) => {
	const [errors, setErrors] = useState({});

	const validateField = (field, value) => {
		try {
			schema.pick({ [field]: true }).parse({ [field]: value });
			setErrors((prev) => ({ ...prev, [field]: "" }));
			return true;
		} catch (error) {
			const fieldError = error.errors[0]?.message || "Invalid value";
			setErrors((prev) => ({ ...prev, [field]: fieldError }));
			return false;
		}
	};

	const validateForm = (formData) => {
		try {
			schema.parse(formData);
			setErrors({});
			return true;
		} catch (error) {
			const newErrors = error.errors.reduce((acc, err) => {
				const field = err.path[0];
				acc[field] = err.message;
				return acc;
			}, {});
			setErrors(newErrors);
			return false;
		}
	};

	return { errors, validateField, validateForm };
};

export default UseFormValidator;
