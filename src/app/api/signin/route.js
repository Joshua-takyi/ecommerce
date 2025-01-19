import { SignIn } from "@/server/action";
import { NextResponse } from "next/server";

export async function POST(req) {
	const { email, password } = await req.json();
	if (!email || !password) {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
	try {
		const res = await SignIn({
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
