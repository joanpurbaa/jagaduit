"use server";
import { RegisterCredentialsType } from "@/types/type";
import { redirect } from "next/navigation";

export default async function RegisterAction(
	registerCredentials: RegisterCredentialsType
) {
	const formData = new FormData();

	formData.append("email", registerCredentials.email);
	formData.append("username", registerCredentials.username);
	formData.append("password", registerCredentials.password);

	await fetch(`http://localhost:3000/api/register`, {
		method: "POST",
		body: formData,
	});

	redirect("/login");
}
