"use client";
import LoginAction from "@/actions/login";
import { CircleAlert, Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);

		const result = await LoginAction(formData);

		if (result.success) {
			router.push("/");
			router.refresh();
		} else {
			setError(result.message || "Login gagal");
			setIsLoading(false);
		}
	};

	return (
		<main
			className="w-full h-screen authBackground bg-full bg-center"
			style={{ backgroundImage: "url('/authBackground.svg')" }}>
			<div className="w-full h-full flex justify-center items-center absolute z-10 bg-white/20">
				<div className="grid grid-cols-12 bg-white rounded-tl-lg rounded-bl-4xl rounded-r-lg shadow-lg">
					<div className="col-span-6 flex flex-col justify-center items-center bg-orange-500 text-white px-15 py-25 rounded-tl-lg rounded-tr-4xl rounded-bl-4xl">
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
					<div className="col-span-6 bg-white p-10 rounded-r-lg">
						<p className="font-bold text-xl text-zinc-800">Masuk</p>

						{error && (
							<div className="flex justify-center items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
								<CircleAlert className="stroke-red-600" />
								<p className="text-sm text-red-600">{error}</p>
							</div>
						)}

						<form onSubmit={handleSubmit} className="mt-5">
							<ul className="space-y-5">
								<li>
									<label className="text-sm" htmlFor="email">
										Email
									</label>
									<input
										id="email"
										onChange={(e) => setEmail(e.target.value)}
										className="mt-2 w-full text-sm outline-none p-3 border border-gray-200 rounded-lg focus:border-orange-500 transition-colors"
										type="email"
										placeholder="Masukkan email"
										required
										disabled={isLoading}
									/>
								</li>
								<li>
									<label className="text-sm" htmlFor="password">
										Password
									</label>
									<div className="mt-2 flex items-center p-3 border border-gray-200 rounded-lg focus-within:border-orange-500 transition-colors">
										<input
											id="password"
											onChange={(e) => setPassword(e.target.value)}
											className="w-full text-sm outline-none"
											type={showPassword ? "text" : "password"}
											placeholder="Masukkan password"
											required
											disabled={isLoading}
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
								</li>
								<li>
									<button
										type="submit"
										disabled={isLoading}
										className="cursor-pointer w-full bg-orange-500 hover:bg-orange-400 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md text-sm transition-colors">
										{isLoading ? "Memproses..." : "Masuk"}
									</button>
									<p className="text-sm text-end mt-3">
										Belum punya akun?{" "}
										<Link className="text-blue-500 underline" href={"/register"}>
											Daftar
										</Link>
									</p>
								</li>
							</ul>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}
