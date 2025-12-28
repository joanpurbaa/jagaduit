import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

const providers: Provider[] = [
	Credentials({
		credentials: {
			email: { label: "Email", type: "email" },
			password: { label: "Password", type: "password" },
		},
		authorize: async (credentials) => {
			if (!credentials?.email || !credentials?.password) {
				throw new Error("Email dan password harus diisi");
			}

			const user = await prisma.user.findUnique({
				where: {
					email: credentials.email as string,
				},
			});

			if (!user) {
				throw new Error("Email atau password salah");
			}

			const isPasswordValid = await bcrypt.compare(
				credentials.password as string,
				user.password
			);

			if (!isPasswordValid) {
				throw new Error("Email atau password salah");
			}

			return {
				id: user.id.toString(),
				email: user.email,
				username: user.username,
			};
		},
	}),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers,
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.username = user.name;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.name = token.username as string;
			}
			return session;
		},
	},
});
