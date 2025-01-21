// sign up
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const RegisterUser = async ({ name, email, password }) => {
	try {
		const response = await fetch(`${API_URL}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, password }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const SignInUser = async ({ email, password }) => {
	try {
		const response = await fetch(`${API_URL}/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
