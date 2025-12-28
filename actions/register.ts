"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { RegisterCredentialsType } from "@/types/type";

export default async function RegisterAction(
	registerCredentials: RegisterCredentialsType
) {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(registerCredentials.password, salt);

	await prisma.user.create({
		data: {
			email: registerCredentials.email,
			username: registerCredentials.username,
			password: hashedPassword,
		},
	});

	redirect("/login");
}
