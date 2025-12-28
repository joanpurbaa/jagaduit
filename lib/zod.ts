import { z } from "zod";

export const RegisterSchema = z.object({
	username: z.string().trim().nonempty("Username tidak boleh kosong"),
	email: z.string().trim().email("Format email tidak valid"),
	password: z
		.string()
		.min(8, "Password minimal 8 karakter")
		.regex(/[A-Z]/, "Password harus mengandung huruf besar")
		.regex(/[a-z]/, "Password harus mengandung huruf kecil")
		.regex(/[0-9]/, "Password harus mengandung angka"),
});

export type RegisterState = {
	form?: {
		username?: string;
		email?: string;
		password?: string;
	};
	errors?: {
		username?: string[];
		email?: string[];
		password?: string[];
	};
};
