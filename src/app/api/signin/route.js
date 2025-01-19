import { UserAuth } from "@/models/schema";
import { SignInAction } from "@/server/action";
import { connectDb } from "@/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
	const { email, password } = await req.json();
	if (!email || !password) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
	try {
		const res = await SignInAction({
			email,
			password,
		});
		return NextResponse.json({
			message: "Sign in successful",
			data: res,
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}

export async function GET() {
	try {
		await connectDb();
		const users = await UserAuth.find({});
		return NextResponse.json({
			message: "Sign in successful",
			data: users,
		});
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}
