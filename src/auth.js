import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserAuth } from "./models/schema";
export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials;
				if (!email || !password) {
					throw new Error("Invalid credentials");
				}
				const user = await UserAuth.findOne({ email }).select("+password+role");
				if (!user) {
					throw new Error("Invalid credentials");
				}
				const isPasswordCorrect = await bcrypt.compare(password, user.password);
				if (!isPasswordCorrect) {
					throw new Error("Invalid credentials");
				}
				const userData = {
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
					image: user.image,
				};
				return userData;
			},
		}),
	],
});
