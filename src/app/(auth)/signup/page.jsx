import { GetSession } from "@/utils/session";
import SignUp from "./signup";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
	const session = await GetSession();
	// if the user is signed in redirect to  users page else redirect to signin page
	if (session?.user) {
		return redirect("/");
	} else {
		return <SignUp />;
	}
}
