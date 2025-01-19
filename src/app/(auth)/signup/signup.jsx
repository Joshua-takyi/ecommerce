"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "@/server/apiCalls";
import { toast } from "sonner";
import { Validator } from "@/utils/formValidate";
import { z } from "zod";
import { useRouter } from "next/navigation";

export default function SignUp() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const formValidator = z.object({
		name: z.string().min(3, "Name must be at least 3 characters"),
		email: z.string().email("Invalid email address"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[0-9]/, "Password must contain at least one number"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = Validator(formValidator);

	const { mutate } = useMutation({
		mutationKey: ["register-user"],
		mutationFn: async (data) => {
			setIsLoading(true);
			try {
				const res = await RegisterUser(data);
				return res;
			} catch (error) {
				throw new Error(
					error?.response?.data?.message || "Something went wrong"
				);
			} finally {
				setIsLoading(false);
			}
		},
		onSuccess: (data) => {
			toast.success(data.message || "Registration successful!");
			reset(); // Clear form
			router.push("/signin"); // Redirect to login
		},
		onError: (error) => {
			toast.error(error.message);
		},
		enabled: false,
	});

	const handleSubmitForm = (data) => {
		mutate({
			name: data.name,
			email: data.email,
			password: data.password,
		});
	};

	return (
		<div className="grid md:grid-cols-2 gap-4 h-screen p-3">
			<div className="flex items-center justify-center">
				<form
					onSubmit={handleSubmit(handleSubmitForm)}
					method="POST"
					className="w-full max-w-md space-y-6 p-8 bg-white rounded-lg shadow-md"
				>
					<h2 className="text-2xl font-bold text-center text-gray-800">
						Sign Up
					</h2>

					<div className="space-y-2">
						<label htmlFor="name" className="text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							id="name"
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							{...register("name")}
							disabled={isLoading}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm">{errors.name.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<label
							htmlFor="email"
							className="text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							{...register("email")}
							disabled={isLoading}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<label
							htmlFor="password"
							className="text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							{...register("password")}
							disabled={isLoading}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full normal-button disabled:opacity-50 flex items-center justify-center"
					>
						{isLoading ? (
							<>
								<span className="animate-spin mr-2">⏳</span>
								Signing up...
							</>
						) : (
							"Sign Up"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
