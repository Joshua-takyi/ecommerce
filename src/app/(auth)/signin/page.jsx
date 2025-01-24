import { GetSession } from "@/utils/session";
import { SignIn } from "./signin";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Sign In",
	description: "Sign In to your account",
};

export default async function SignInPage() {
	const session = await GetSession();
	// if the user is signed in redirect to  users page else redirect to signin page
	if (session?.user) {
		return redirect("/profile/user");
	} else {
		return <SignIn />;
	}
}
