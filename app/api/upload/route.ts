import { NextResponse } from "next/server";
import { del, put } from "@vercel/blob";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
	try {
		const apiKey = process.env.GEMINI_API_KEY;

		const ai = new GoogleGenAI({ apiKey });

		const formData = await request.formData();
		const image = formData.get("image") as File;

		const fileType = image?.type.split("/")[1].toLowerCase();
		const fileName = Math.random().toString().split(".")[1];
		const fullFileName = fileName + "." + fileType;

		const blob = await put(fullFileName, image, {
			access: "public",
		});

		const imageResp = await fetch(blob.url).then((response) =>
			response.arrayBuffer()
		);

		const contents = [
			{
				inlineData: {
					mimeType: "image/jpeg",
					data: Buffer.from(imageResp).toString("base64"),
				},
			},
			{
				text: `
      Analisis gambar bukti transfer berikut.

      Tugas:
      Ekstrak informasi berikut jika ada:
      - namaPengirim
      - namaPenerima
      - tanggalTransaksi
      - nominal

      Aturan WAJIB:
      - Jawaban HARUS berupa JSON object saja
      - Tidak boleh ada teks penjelasan
      - Tidak boleh ada markdown
      - Jika data tidak ditemukan, isi dengan null
      - Format nominal hanya angka (tanpa Rp, titik, atau koma)
      - Format tanggal: YYYY-MM-DD

      Contoh output yang benar:
      {
        "namaPengirim": "Budi Santoso",
        "namaPenerima": "PT ABC Indonesia",
        "tanggalTransaksi": "2025-01-10",
        "nominal": 150000
      }
      `,
			},
		];

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: contents,
		});

		del(blob.url);

		return NextResponse.json({ response: response.text });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Upload failed" }, { status: 400 });
	}
}
