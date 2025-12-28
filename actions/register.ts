"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export default async function RegisterAction(formData: FormData) {
	const salt = await bcrypt.genSalt(10);

	const email = formData.get("email") as string;
	const username = formData.get("username") as string;
	const hashedPassword = await bcrypt.hash(
		formData.get("password") as string,
		salt
	);

	await prisma.user.create({
		data: {
			email,
			username,
			password: hashedPassword,
		},
	});

	redirect("/login");
}
