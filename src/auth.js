import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserAuth } from "./models/schema";
import { connectDb } from "./utils/connect";
import logger from "./utils/logger";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const { email, password } = credentials;
					await connectDb();
					const user = await UserAuth.findOne({ email }).select("+password");
					if (!user) {
						throw new Error("Invalid email or password");
					}
					const isPasswordCorrect = await bcrypt.compare(
						password,
						user.password
					);
					if (!isPasswordCorrect) {
						throw new Error("Invalid email or password");
					}

					return {
						id: user._id,
						name: user.name,
						role: user.role,
					};
				} catch (error) {
					logger.error("Error during sign-in:", error);
					throw new Error("An unexpected error occurred during sign-in");
				}
			},
		}),
	],
	pages: {
		signIn: "/signin",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.role = token.role;
			}
			return session;
		},

		signIn: async ({ user, account }) => {
			if (account?.provider === "credentials") {
				logger.info("Sign in with credentials");
				return true;
			}

			if (account?.provider === "google") {
				const { email, name, image } = user;
				const existingUser = await UserAuth.findOne({ email });
				if (!existingUser) {
					await UserAuth.create({ email, name, image });
				}
				logger.info("Sign in with google");
				return true;
			}
			return false;
		},
	},
	secret: process.env.AUTH_SECRET,
});
