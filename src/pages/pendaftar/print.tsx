import React from 'react';
import useSWR from 'swr';

import { formatLocale, parseTimeFromAPI } from '@/lib/date';
import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import withAuth from '@/components/hoc/withAuth';

import PrintButton from '@/container/action/PrintButton';
import useAuthStore from '@/store/useAuthStore';

import { ApiReturn, Berkas, Jadwal, Pendaftar } from '@/types/api';

function IndexPage() {
  const user = useAuthStore.useUser();

  //#region  //*=========== Get Berkas Data ===========
  const { data: apiBerkas, isLoading: isBerkasLoading } = useSWRWithToast(
    useSWR<ApiReturn<Berkas>>('/berkas/view'),
    {
      loading: 'Memuat data berkas',
    }
  );
  const berkas = apiBerkas?.data;
  //#endregion  //*======== Get Berkas Data ===========

  //#region  //*=========== Get Jadwal Data ===========
  const { data: apiJadwal, isLoading: isJadwalLoading } = useSWRWithToast(
    useSWR<ApiReturn<Jadwal>>(() =>
      berkas?.idJadwal ? `/jadwal/view?id=${berkas.idJadwal}` : null
    ),
    {
      loading: 'Memuat data Jadwal',
    }
  );
  const jadwal = apiJadwal?.data as Jadwal;
  //#endregion  //*======== Get Jadwal Data ===========

  //#region  //*=========== Initial Data ===========
  const { data: apiPendaftar, isLoading: isPendaftarDataLoading } =
    useSWRWithToast(
      useSWR<ApiReturn<Pendaftar>>(`/pendaftar/view?id=${user?.id}`),
      {
        loading: 'Memuat data pendaftar',
      }
    );

  const pendaftar = apiPendaftar?.data as Pendaftar;
  //#endregion  //*======== Initial Data ===========

  const isLoading =
    isBerkasLoading || isJadwalLoading || isPendaftarDataLoading;
  return (
    <div className='py-16 space-y-8 min-h-screen bg-primary-50 bg-no-repeat bg-cover'>
      <div className='layout'>
        {!isLoading ? (
          <div className='space-y-8'>
            <div className='text-center'>
              <h1 className='font-semibold uppercase'>
                Kartu Peserta Ujian CPNS 2022
              </h1>
              <h2 className='font-normal uppercase'>Formasi Lulusan Terbaik</h2>
              <p className='mt-4'>
                Kementrian Kelautan dan Perikanan <br />
                Jl. Merdeka Timur No. 16, Jakarta Pusat Telp.: (62-21) 3500041,
                3519070. Fax. (62-21) 35100049, 3500042
              </p>
            </div>
            <hr className='border-black' />
            <div className='flex gap-16 justify-between'>
              <div className='grid grid-cols-2'>
                <div className='col-span-2'>
                  <p> Nomor Ujian Peserta :</p>
                  <p className='text-xl font-bold text-primary-600'>
                    {' '}
                    {berkas?.idUjian}
                  </p>
                </div>
                {/* Peserta */}
                <div className='col-span-2 my-4'>
                  <hr />
                </div>
                <p>NIK</p>
                <p className='font-bold'>: {pendaftar?.nik}</p>
                <p>Nama</p>
                <p className='font-bold'>: {pendaftar?.nama}</p>
                <p>Jenis Kelamin</p>
                <p>: {pendaftar?.jenis_kelamin}</p>
                <p>Tempat / Tanggal Lahir</p>
                <p>
                  :{' '}
                  {`${pendaftar?.tempat_lahir} /${formatLocale(
                    new Date(pendaftar?.tanggal_lahir),
                    'FULL'
                  )}`}
                </p>
                <p>Kualifikasi Pendidikan</p>
                <p>: {pendaftar?.edukasi}</p>
                {/* Jadwal */}
                <div className='col-span-2 my-4'>
                  <hr />
                </div>
                <p>Lokasi</p>
                <p> : {jadwal.lokasi_ujian}</p>
                <p>Tanggal Ujian</p>
                <p>
                  : {formatLocale(new Date(jadwal.tanggal_ujian), 'FULL_DAY')}
                </p>
                <p>Waktu Ujian</p>
                <p>{`: ${formatLocale(
                  parseTimeFromAPI(jadwal.waktu_mulai),
                  'FULL_TIME'
                )} - ${formatLocale(
                  parseTimeFromAPI(jadwal.waktu_selesai),
                  'FULL_TIME'
                )}`}</p>
              </div>
              <div className='min-w-[20%]'>
                <div
                  className='aspect-[3/4] w-full bg-center bg-cover'
                  style={{
                    backgroundImage: `url(${berkas?.foto_formal})`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className='min-h-[50vh] bg-gray-50 rounded-lg animate-pulse'></div>
        )}

        <div className='flex justify-end'>
          <PrintButton />
        </div>
      </div>
    </div>
  );
}

export default withAuth(IndexPage, 'pendaftar');
