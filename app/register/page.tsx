"use client";
import RegisterAction from "@/actions/register";
import { CheckCircle2Icon, Eye, EyeClosed, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useTransition } from "react";

export default function Register() {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();

	const [credentialsError, setCredentialsError] = useState<{
		username?: string[];
		email?: string[];
		password?: string[];
	}>();

	const passwordValidation = useMemo(() => {
		return {
			minLength: password.length >= 8,
			hasUppercase: /[A-Z]/.test(password),
			hasLowercase: /[a-z]/.test(password),
			hasNumber: /[0-9]/.test(password),
		};
	}, [password]);

	const handleSubmit = (formData: FormData) => {
		const errors: { username?: string[]; email?: string[]; password?: string[] } =
			{};

		if (!username) errors.username = ["Username tidak boleh kosong"];
		if (!email.includes("@")) errors.email = ["Format email tidak valid"];

		const passwordErrors = [];
		if (!passwordValidation.minLength)
			passwordErrors.push("Password minimal 8 karakter");
		if (!passwordValidation.hasUppercase)
			passwordErrors.push("Password harus mengandung huruf besar");
		if (!passwordValidation.hasLowercase)
			passwordErrors.push("Password harus mengandung huruf kecil");
		if (!passwordValidation.hasNumber)
			passwordErrors.push("Password harus mengandung angka");

		if (passwordErrors.length > 0) errors.password = passwordErrors;

		if (Object.keys(errors).length > 0) {
			setCredentialsError(errors);
			return;
		}

		setCredentialsError(undefined);
		startTransition(() => {
			RegisterAction(formData);
		});
	};

	return (
		<main
			className="w-full h-screen bg-full bg-center"
			style={{ backgroundImage: "url('/authBackground.svg')" }}>
			<div className="w-full h-full flex justify-center items-center absoulute z-10 bg-white/20">
				<div className="grid grid-cols-12 bg-orange-500 rounded-tl-lg rounded-bl-4xl rounded-r-lg shadow-lg">
					<div className="col-span-6 bg-white p-10 rounded-tl-lg rounded-tr-4xl rounded-bl-4xl">
						<p className="font-bold text-xl text-zinc-800">Daftar</p>
						<form action={handleSubmit} className="mt-5">
							<ul className="space-y-5">
								<li>
									<label className="text-sm" htmlFor="username">
										Username
									</label>
									<input
										id="username"
										name="username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										className="mt-2 w-full text-sm outline-none p-3 border border-gray-200 rounded-lg focus:border-orange-500 transition-colors"
										type="text"
										placeholder="Masukkan username"
										disabled={isPending}
									/>
									{credentialsError?.username && (
										<p className="text-xs text-red-500 mt-1">
											{credentialsError.username[0]}
										</p>
									)}
								</li>
								<li>
									<label className="text-sm" htmlFor="email">
										Email
									</label>
									<input
										id="email"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="mt-2 w-full text-sm outline-none p-3 border border-gray-200 rounded-lg focus:border-orange-500 transition-colors"
										type="text"
										placeholder="Masukkan email"
										disabled={isPending}
									/>
									{credentialsError?.email && (
										<p className="text-xs text-red-500 mt-1">
											{credentialsError.email[0]}
										</p>
									)}
								</li>
								<li>
									<label className="text-sm" htmlFor="password">
										Password
									</label>
									<div className="mt-2 flex items-center p-3 border border-gray-200 rounded-lg focus-within:border-orange-500 transition-colors">
										<input
											id="password"
											name="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="w-full text-sm outline-none"
											type={showPassword ? "text" : "password"}
											placeholder="Masukkan password"
											disabled={isPending}
										/>
										{showPassword ? (
											<Eye
												onClick={() => setShowPassword(!showPassword)}
												className="text-gray-400 cursor-pointer"
											/>
										) : (
											<EyeClosed
												onClick={() => setShowPassword(!showPassword)}
												className="text-gray-400 cursor-pointer"
											/>
										)}
									</div>

									{password.length > 0 && (
										<div className="mt-2 border bg-gray-100 border-gray-200 rounded-lg p-3 space-y-1">
											<div className="flex items-center gap-1">
												{passwordValidation.minLength ? (
													<CheckCircle2Icon className="w-5 h-5 fill-green-500 stroke-white" />
												) : (
													<XCircleIcon className="w-5 h-5 fill-red-500 stroke-white" />
												)}
												<p
													className={`text-xs ${
														passwordValidation.minLength ? "text-green-600" : "text-red-600"
													}`}>
													Minimal 8 karakter
												</p>
											</div>
											<div className="flex items-center gap-1">
												{passwordValidation.hasUppercase ? (
													<CheckCircle2Icon className="w-5 h-5 fill-green-500 stroke-white" />
												) : (
													<XCircleIcon className="w-5 h-5 fill-red-500 stroke-white" />
												)}
												<p
													className={`text-xs ${
														passwordValidation.hasUppercase
															? "text-green-600"
															: "text-red-600"
													}`}>
													Harus mengandung huruf besar
												</p>
											</div>
											<div className="flex items-center gap-1">
												{passwordValidation.hasLowercase ? (
													<CheckCircle2Icon className="w-5 h-5 fill-green-500 stroke-white" />
												) : (
													<XCircleIcon className="w-5 h-5 fill-red-500 stroke-white" />
												)}
												<p
													className={`text-xs ${
														passwordValidation.hasLowercase
															? "text-green-600"
															: "text-red-600"
													}`}>
													Harus mengandung huruf kecil
												</p>
											</div>
											<div className="flex items-center gap-1">
												{passwordValidation.hasNumber ? (
													<CheckCircle2Icon className="w-5 h-5 fill-green-500 stroke-white" />
												) : (
													<XCircleIcon className="w-5 h-5 fill-red-500 stroke-white" />
												)}
												<p
													className={`text-xs ${
														passwordValidation.hasNumber ? "text-green-600" : "text-red-600"
													}`}>
													Harus mengandung angka
												</p>
											</div>
										</div>
									)}
								</li>
								<li>
									<button
										type="submit"
										disabled={isPending}
										className="cursor-pointer w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md text-sm transition-colors">
										{isPending ? "Memproses..." : "Daftar"}
									</button>
									<p className="text-sm text-end mt-3">
										Sudah punya akun?{" "}
										<Link className="text-blue-500 underline" href={"/login"}>
											Masuk
										</Link>
									</p>
								</li>
							</ul>
						</form>
					</div>
					<div className="col-span-6 flex flex-col justify-center items-center bg-orange-500 text-white px-15 py-25 rounded-r-lg">
						<p className="font-bold text-xl">Selamat datang di Jaga Duit!</p>
						<p className="text-sm mt-2">Tempat untuk mengatur keuangan kamu</p>
						<Image
							src={"/icon.png"}
							className="mt-10 w-20 h-20"
							width={100}
							height={100}
							alt="logo"
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
