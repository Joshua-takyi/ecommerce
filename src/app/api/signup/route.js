import { connectDb } from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserAuth } from "@/models/schema";
import logger from "@/utils/logger";
import z from "zod";

// Define validation schema
const signUpSchema = z.object({
	name: z.string().min(3).max(30),
	email: z.string().email(),
	password: z.string().min(8),
});

// CORS headers
const corsHeaders = {
	"Access-Control-Allow-Origin": "https://ecommerce-mu-blush-89.vercel.app", // Replace with your frontend URL
	"Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS
	"Access-Control-Allow-Headers": "Content-Type", // Allow Content-Type header
};

export async function POST(req) {
	try {
		// Handle preflight request (OPTIONS)
		if (req.method === "OPTIONS") {
			return NextResponse.json({}, { headers: corsHeaders });
		}

		// Parse and validate request body
		const { name, email, password } = await req.json();
		const validationResult = signUpSchema.safeParse({ name, email, password });

		// Handle validation errors
		if (!validationResult.success) {
			const errors = validationResult.error.issues.map((issue) => ({
				field: issue.path[0],
				message: issue.message,
			}));
			logger.warn("Invalid sign-up request", { errors });
			return NextResponse.json(
				{ error: "Validation failed", errors },
				{ status: 400, headers: corsHeaders }
			);
		}

		// Connect to the database
		await connectDb();

		// Check if user already exists
		const existingUser = await UserAuth.findOne({ email });
		if (existingUser) {
			logger.warn(`User already exists: ${email}`);
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400, headers: corsHeaders }
			);
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new user
		const newUser = await UserAuth.create({
			name,
			email,
			password: hashedPassword,
			role: "user",
		});

		// Log successful user creation
		logger.info(`User created successfully: ${newUser.email}`);

		// Return success response
		return NextResponse.json(
			{
				message: "User created successfully",
				user: { id: newUser._id, email: newUser.email },
			},
			{ status: 201, headers: corsHeaders }
		);
	} catch (error) {
		// Log unexpected errors
		logger.error("Failed to create user", { error: error.message });

		// Return generic error response
		return NextResponse.json(
			{ error: "An unexpected error occurred during sign-up" },
			{ status: 500, headers: corsHeaders }
		);
	}
}
