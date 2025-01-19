"use client";
import { SignInAction } from "@/server/action";
import { Validator } from "@/utils/formValidate";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignIn = () => {
	const router = useRouter();
	const schema = z.object({
		email: z.string().email("Please enter a valid email"),
		password: z.string().min(1, "Password is required"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm(Validator(schema));

	const onSubmit = async (data) => {
		if (!data.email || !data.password) {
			toast.error("Please fill all fields");
			return;
		}
		const res = await SignInAction(data);
		if (res.error) {
			toast.error(res.error);
		} else {
			toast.success("Sign in successful");
			router.push("/");
		}
	};

	return (
		<main className="min-h-screen grid md:grid-cols-2">
			<div className="bg-gray-100 flex items-center justify-center">
				<h1 className="text-4xl font-bold text-gray-800">Welcome Back</h1>
			</div>
			<div className="flex items-center justify-center p-8">
				<form
					className="flex flex-col w-full max-w-md space-y-6"
					onSubmit={handleSubmit(onSubmit)}
					method="post"
				>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="email"
							className="text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							placeholder="Enter your email"
							className="input-field"
							{...register("email")}
						/>
						{errors.email && (
							<span className="text-sm text-red-500">
								{errors.email.message}
							</span>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<label
							htmlFor="password"
							className="text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							placeholder="Enter your password"
							className="input-field"
							{...register("password")}
						/>
						{errors.password && (
							<span className="text-sm text-red-500">
								{errors.password.message}
							</span>
						)}
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<>
								<span className="animate-spin mr-2">⏳</span>
								Signing in...
							</>
						) : (
							"Sign In"
						)}
					</button>
				</form>
			</div>
		</main>
	);
};
