"use client";
import { Transaction } from "@/types/type";
import { FormEvent, useState } from "react";

export default function Home() {
	const [prompt, setPrompt] = useState<string>("");
	const [transaction, setTransaction] = useState<Transaction>();

	const upload = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await fetch("http://172.16.0.2:3000/api/upload", {
			method: "POST",
			body: JSON.stringify({ prompt }),
		})
			.then((res) => res.json())
			.then((data) => setTransaction(JSON.parse(data.response)));
	};

	return (
		<main className="p-10">
			<h1 className="text-xl font-bold">Masukkan pembayaran</h1>
			<form onSubmit={upload} className="mt-3" action="">
				{/* <input type="file" /> */}
				<input onChange={(e) => setPrompt(e.target.value)} type="text" />
				<button type="submit">Upload</button>
			</form>

			<h1 className="text-xl font-bold mt-10">Data pembayaran</h1>
			{transaction && (
				<div className="mt-3">
					<p>Pengirim : {transaction.namaPengirim}</p>
					<p>Penerima : {transaction.namaPenerima}</p>
					<p>Tanggal transaksi : {transaction.tanggalTransaksi}</p>
					<p>Nominal : {transaction.nominal}</p>
				</div>
			)}
		</main>
	);
}
