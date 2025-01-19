"use server";
import { signIn } from "@/auth";

export const SignInAction = async ({ email, password }) => {
	try {
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (result?.error) {
			return { error: "Invalid email or password" };
		}

		return { success: "Sign-in successful!" };
	} catch (error) {
		console.error("Sign-in error:", error);
		return { error: "An unexpected error occurred during sign-in" };
	}
};
