"use server";
import { RegisterCredentialsType } from "@/types/type";
import { redirect } from "next/navigation";

export default async function RegisterAction(
	registerCredentials: RegisterCredentialsType
) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.BASE_URL;
	const formData = new FormData();

	formData.append("email", registerCredentials.email);
	formData.append("username", registerCredentials.username);
	formData.append("password", registerCredentials.password);

	await fetch(`${baseUrl}/api/register`, {
		method: "POST",
		body: formData,
	});

	redirect("/login");
}
