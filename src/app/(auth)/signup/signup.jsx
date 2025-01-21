"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "@/server/apiCalls";
import { toast } from "sonner";
import { Validator } from "@/utils/formValidate";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
	User,
	Mail,
	Lock,
	Loader2,
	Eye,
	EyeOff,
	ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function SignUp() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

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
		watch,
	} = Validator(formValidator);

	const password = watch("password", "");
	const passwordRequirements = [
		{ text: "At least 8 characters", met: password.length >= 8 },
		{ text: "One uppercase letter", met: /[A-Z]/.test(password) },
		{ text: "One lowercase letter", met: /[a-z]/.test(password) },
		{ text: "One number", met: /[0-9]/.test(password) },
	];

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
			toast.success("Welcome aboard! 🎉", {
				description: "Your account has been created successfully.",
				action: {
					label: "Sign In →",
					onClick: () => router.push("/signin"),
				},
				duration: 5000,
			});
			reset();
			router.push("/signin");
		},
		onError: (error) => {
			toast.error("Registration failed", {
				description:
					error.message || "Please check your details and try again.",
				action: {
					label: "Try Again",
					onClick: () => reset(),
				},
				duration: 5000,
			});
		},
	});

	const handleSubmitForm = (data) => {
		mutate({
			name: data.name,
			email: data.email,
			password: data.password,
		});
	};

	return (
		<div className="grid md:grid-cols-2 min-h-screen">
			{/* Left side - Welcome Message */}
			<div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
				<div className="max-w-md space-y-6 text-center">
					<h1 className="text-4xl font-bold text-gray-800">
						Join Our Community
					</h1>
					<p className="text-lg text-gray-600">
						Create an account to start your journey with us. It only takes a few
						minutes.
					</p>
				</div>
			</div>

			{/* Right side - Form */}
			<div className="flex items-center justify-center p-6">
				<div className="w-full max-w-md space-y-8">
					{/* Mobile welcome message */}
					<div className="md:hidden text-center space-y-2">
						<h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
						<p className="text-sm text-gray-600">Join our community today</p>
					</div>

					<form
						onSubmit={handleSubmit(handleSubmitForm)}
						method="POST"
						className="space-y-6"
					>
						<div className="space-y-4">
							{/* Name field */}
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Full Name
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<User className="h-5 w-5 text-gray-400" />
									</div>
									<input
										type="text"
										id="name"
										placeholder="John Doe"
										className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
										{...register("name")}
										disabled={isLoading}
									/>
								</div>
								{errors.name && (
									<p className="text-sm text-red-500">{errors.name.message}</p>
								)}
							</div>

							{/* Email field */}
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email Address
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Mail className="h-5 w-5 text-gray-400" />
									</div>
									<input
										type="email"
										id="email"
										placeholder="you@example.com"
										className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
										{...register("email")}
										disabled={isLoading}
									/>
								</div>
								{errors.email && (
									<p className="text-sm text-red-500">{errors.email.message}</p>
								)}
							</div>

							{/* Password field */}
							<div className="space-y-2">
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Lock className="h-5 w-5 text-gray-400" />
									</div>
									<input
										type={showPassword ? "text" : "password"}
										id="password"
										placeholder="••••••••"
										className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
										{...register("password")}
										disabled={isLoading}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute inset-y-0 right-0 pr-3 flex items-center"
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5 text-gray-400" />
										) : (
											<Eye className="h-5 w-5 text-gray-400" />
										)}
									</button>
								</div>
								{errors.password && (
									<p className="text-sm text-red-500">
										{errors.password.message}
									</p>
								)}

								{/* Password requirements */}
								<div className="mt-2 space-y-2">
									{passwordRequirements.map((req, index) => (
										<div key={index} className="flex items-center gap-2">
											<div
												className={`w-1.5 h-1.5 rounded-full ${
													req.met ? "bg-green-500" : "bg-gray-300"
												}`}
											/>
											<span
												className={`text-xs ${
													req.met ? "text-green-600" : "text-gray-500"
												}`}
											>
												{req.text}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<>
									<Loader2 className="w-5 h-5 mr-2 animate-spin" />
									Creating account...
								</>
							) : (
								<>
									Sign Up
									<ArrowRight className="ml-2 h-5 w-5" />
								</>
							)}
						</button>

						<p className="text-center text-sm text-gray-600">
							Already have an account?{" "}
							<Link
								href="/signin"
								className="font-medium text-blue-600 hover:text-blue-500"
							>
								Sign in instead
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
