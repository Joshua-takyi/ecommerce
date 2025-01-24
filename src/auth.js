import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserAuth } from "./models/schema";
import { connectDb } from "./utils/connect";
import jwt from "jsonwebtoken";
import { log } from "loglevel";

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

					// Generate JWT
					const accessToken = jwt.sign(
						{ id: user._id, name: user.name, role: user.role },
						process.env.JWT_SECRET,
						{
							expiresIn: "1h",
						}
					);

					// Return user data with accessToken
					return {
						id: user._id,
						name: user.name,
						role: user.role,
						accessToken: accessToken,
					};
				} catch (error) {
					log.error("Error during sign-in:", error);
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
			// Add user data to the token
			if (user) {
				token.id = user.id;
				token.role = user.role;
				token.accessToken = user.accessToken; // Add accessToken to the token
			}
			return token;
		},
		async session({ session, token }) {
			// Add token data to the session
			if (token) {
				session.user.id = token.id;
				session.user.role = token.role;
				session.user.accessToken = token.accessToken; // Add accessToken to the session
			}
			return session;
		},
		async signIn({ user, account }) {
			if (account?.provider === "credentials") {
				log.info("Sign in with credentials");
				return true;
			}

			if (account?.provider === "google") {
				const { email, name, image } = user;
				await connectDb();
				const existingUser = await UserAuth.findOne({ email });
				if (!existingUser) {
					await UserAuth.create({ email, name, image });
				}

				// Generate JWT for Google sign-in
				const accessToken = jwt.sign(
					{ id: existingUser?._id || email, name, role: "user" },
					process.env.JWT_SECRET,
					{
						expiresIn: "1h",
					}
				);

				// Add accessToken to the user object
				user.accessToken = accessToken;

				log.info("Sign in with google");
				return true;
			}
			return false;
		},
	},
	secret: process.env.AUTH_SECRET,
});
