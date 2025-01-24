import { GetSession } from "@/utils/session";
import axios from "axios";

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

export async function UploadProduct(data) {
	try {
		const res = await axios.post(`${API_URL}/v1/addProduct`, data);
		if (res.status !== 200) {
			const error = res.data;
			throw new Error(error.message);
		}
		return res.data;
	} catch (error) {
		if (!axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
		throw new Error(error.response.data.message);
	}
}

export async function GetByCategory({
	category,
	sortBy,
	sortOrder,
	limit,
	page,
	tags,
	model,
}) {
	try {
		const res = await axios.get(
			`${API_URL}/v1/getData?category=${category}&sortBy=${sortBy}&sortOrder=${sortOrder}&limit=${limit}&page=${page}&tags=${tags}&model=${model}`
		);
		return res.data; // Return the data directly
	} catch (error) {
		if (!axios.isAxiosError(error)) {
			throw new Error(error.message);
		}
		throw new Error(error.response?.data?.message || "Failed to fetch data");
	}
}

export async function GetProduct({ slug }) {
	try {
		// Use axios without any auth headers for public product data
		const res = await axios.get(`${API_URL}/v1/getData/${slug}`, {
			headers: {
				"Cache-Control": "no-cache",
				Pragma: "no-cache",
			},
		});

		if (res.status !== 200) {
			throw new Error(res.data.message || "Failed to fetch product data");
		}
		return res.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(
				error.response?.data?.message || "Failed to fetch product data"
			);
		}
		throw new Error(error.message || "An unexpected error occurred");
	}
}

export const AddToCart = async (data) => {
	const session = await GetSession();
	const accessToken = session?.user?.accessToken;
	try {
		const res = await axios.post(`${API_URL}/v1/cart`, data, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});

		if (res.status === 401) {
			throw new Error("Session expired. Please sign in again.");
		}

		if (res.status !== 201) {
			throw new Error(res.data?.message || "Failed to add product to cart");
		}

		return res.data;
	} catch (error) {
		// Handle specific error types
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				throw new Error("Session expired. Please sign in again.");
			}
			throw new Error(
				error.response?.data?.message || "Failed to add item to cart"
			);
		}
		throw new Error(error.message || "An unexpected error occurred");
	}
};
