import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "node:path";

export async function POST() {
	const apiKey = process.env.GEMINI_API_KEY;

	const ai = new GoogleGenAI({ apiKey });

	const base64ImageFile = fs.readFileSync(
		path.join(process.cwd(), "public", "test.jpeg"),
		{ encoding: "base64" }
	);

	const contents = [
		{
			inlineData: {
				mimeType: "image/jpeg",
				data: base64ImageFile,
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

	return NextResponse.json({ response: response.text });
}
