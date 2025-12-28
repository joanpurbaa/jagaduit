export type Transaction = {
	namaPengirim: string;
	namaPenerima: string;
	tanggalTransaksi: string;
	nominal: number;
};

export type RegisterCredentialsType = {
	email: string;
	username: string;
	password: string;
};
