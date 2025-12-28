import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
	const salt = bcrypt.genSaltSync(10);
	const body = await request.formData();

	const hashedPassword = bcrypt.hashSync(body.get("password") as string, salt);

	await prisma.user.create({
		data: {
			username: body.get("username") as string,
			email: body.get("email") as string,
			password: hashedPassword,
		},
	});

	return NextResponse.json({ status: 200 });
}
