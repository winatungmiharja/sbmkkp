import { FileWithPreview } from './dropzone';

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

export enum StatusBerkas {
  'pending',
  'verified',
  'cancelled',
}

export interface Berkas {
  id: number;
  foto_ktp: FileWithPreview[];
  foto_formal: FileWithPreview[];
  idPendaftar: number;
  idJadwal: number;
  idUjian: number;
  status: keyof typeof StatusBerkas;
}

export interface BerkasData {
  id: number;
  foto_ktp: File;
  foto_formal: File;
  idPendaftar: number;
  idJadwal: number;
  status: keyof typeof StatusBerkas;
}
