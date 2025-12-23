"use client";
import { useState, DragEvent } from "react";
import { Upload, FileText, User, Calendar, DollarSign } from "lucide-react";

interface Transaction {
	namaPengirim: string;
	namaPenerima: string;
	tanggalTransaksi: string;
	nominal: string;
}

export default function Home() {
	const [transaction, setTransaction] = useState<Transaction>();
	const [image, setImage] = useState<File | null>();
	const [isDragging, setIsDragging] = useState(false);

	const uploadImage = () => {
		if (image) {
			const formData = new FormData();
			formData.append("image", image);

			fetch("/api/upload", {
				method: "POST",
				body: formData,
			})
				.then((result) => result.json())
				.then((data) => setTransaction(JSON.parse(data.response)));
		}
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		const files = e.dataTransfer.files;
		if (files && files[0]) {
			setImage(files[0]);
		}
	};

	return (
		<main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-6 md:p-10">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="bg-blue-500 p-2 rounded-lg">
							<Upload className="w-6 h-6 text-white" />
						</div>
						<h1 className="text-2xl font-bold text-gray-800">Masukkan Pembayaran</h1>
					</div>

					<div>
						<div
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
							className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-200 ${
								isDragging
									? "border-blue-500 bg-blue-50"
									: "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
							}`}>
							<input
								onChange={(e) => setImage(e.target.files?.[0])}
								name="file"
								type="file"
								required
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								accept="image/*"
							/>
							<div className="flex flex-col items-center gap-3 pointer-events-none">
								<div
									className={`p-4 rounded-full ${
										isDragging ? "bg-blue-100" : "bg-gray-200"
									}`}>
									<FileText
										className={`w-8 h-8 ${
											isDragging ? "text-blue-500" : "text-gray-400"
										}`}
									/>
								</div>
								<div className="text-center">
									<p className="text-lg font-semibold text-gray-700">
										{image ? image.name : "Drop file di sini atau klik untuk upload"}
									</p>
									<p className="text-sm text-gray-500 mt-1">PNG, JPG atau JPEG</p>
								</div>
							</div>
						</div>

						<button
							onClick={uploadImage}
							className="w-full mt-6 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
							Upload
						</button>
					</div>
				</div>

				{transaction && (
					<div className="bg-white rounded-2xl shadow-xl p-8">
						<div className="flex items-center gap-3 mb-6">
							<div className="bg-green-500 p-2 rounded-lg">
								<DollarSign className="w-6 h-6 text-white" />
							</div>
							<h1 className="text-2xl font-bold text-gray-800">Data Pembayaran</h1>
						</div>

						<div className="space-y-4">
							<div className="flex items-start gap-4 p-4 bg-linear-to-r from-blue-50 to-transparent rounded-xl">
								<div className="bg-blue-100 p-2 rounded-lg mt-1">
									<User className="w-5 h-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm text-gray-600 font-medium">Pengirim</p>
									<p className="text-lg text-gray-800 font-semibold">
										{transaction.namaPengirim}
									</p>
								</div>
							</div>

							<div className="flex items-start gap-4 p-4 bg-linear-to-r from-purple-50 to-transparent rounded-xl">
								<div className="bg-purple-100 p-2 rounded-lg mt-1">
									<User className="w-5 h-5 text-purple-600" />
								</div>
								<div>
									<p className="text-sm text-gray-600 font-medium">Penerima</p>
									<p className="text-lg text-gray-800 font-semibold">
										{transaction.namaPenerima}
									</p>
								</div>
							</div>

							{/* <div className="flex items-start gap-4 p-4 bg-linear-to-r from-green-50 to-transparent rounded-xl">
								<div className="bg-green-100 p-2 rounded-lg mt-1">
									<Calendar className="w-5 h-5 text-green-600" />
								</div>
								<div>
									<p className="text-sm text-gray-600 font-medium">Tanggal Transaksi</p>
									<p className="text-lg text-gray-800 font-semibold">
										{transaction.tanggalTransaksi}
									</p>
								</div>
							</div> */}

							<div className="flex items-start gap-4 p-4 bg-linear-to-r from-orange-50 to-transparent rounded-xl">
								<div className="bg-orange-100 p-2 rounded-lg mt-1">
									<DollarSign className="w-5 h-5 text-orange-600" />
								</div>
								<div>
									<p className="text-sm text-gray-600 font-medium">Nominal</p>
									<p className="text-lg text-gray-800 font-semibold">
										{transaction.nominal}
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</main>
	);
}
