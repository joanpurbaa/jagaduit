"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export default async function LoginAction(signInCredentials: FormData) {
	try {
		await signIn("credentials", {
			email: signInCredentials.get("email"),
			password: signInCredentials.get("password"),
			redirect: false,
		});

		return { success: true };
	} catch (error) {
		if (error instanceof AuthError) {
			return {
				success: false,
				message: "Email atau password salah",
			};
		}
		return {
			success: false,
			message: "Terjadi kesalahan. Silakan coba lagi.",
		};
	}
}
