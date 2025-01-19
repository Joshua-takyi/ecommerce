import { connectDb } from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserAuth } from "@/models/schema";
import logger from "@/utils/logger";
export async function POST(req) {
	const { name, email, password } = await req.json();
	try {
		await connectDb();
		if (!name || !email || !password) {
			return NextResponse.json({ error: "Invalid request" }, { status: 400 });
		}
		// check if user already exist in the database

		const user = await UserAuth.findOne({ email });
		if (user) {
			return NextResponse.json(
				{ error: "User already exist" },
				{ status: 400 }
			);
		}
		// hash password

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await UserAuth.create({
			name,
			email,
			password: hashedPassword,
			role: "user",
		});
		return NextResponse.json(
			{ message: "User created successfully", user: newUser.id },
			{ status: 201 }
		);
	} catch (error) {
		logger.error("failed to create user");
		return NextResponse.json(
			{
				error: error.message,
			},
			{
				status: 500,
			}
		);
	}
}
