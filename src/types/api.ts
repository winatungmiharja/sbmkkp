export enum Role {
  'pendaftar',
  'panitia',
}

export interface ApiReturn<D> {
  message: string;
  data: D;
}

export interface ApiRouteReturn {
  message: string;
  error: string;
}

export interface ApiUserDataReturn<D> {
  message: string;
  data: D;
  role: keyof typeof Role;
  token: string;
}

export interface Jadwal {
  id: number;
  tanggal_ujian: string;
  waktu_mulai: string;
  waktu_selesai: string;
  lokasi_ujian: string;
}

export interface Panitia {
  nama: string;
  email: string;
  nomor_telepon: string;
}

export interface Pendaftar {
  nama: string;
  email: string;
  nik: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  edukasi: string;
  nomor_telepon: string;
}
