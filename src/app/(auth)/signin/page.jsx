import { SignIn } from "./signin";

const meta = {
	title: "Sign In",
	description: "Sign In to your account",
};
export default function SignInPage() {
	return (
		<>
			<meta {...meta} />
			<SignIn />
		</>
	);
}
