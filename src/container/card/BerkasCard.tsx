import React from 'react';
import useSWR from 'swr';

import { formatLocale, parseTimeFromAPI } from '@/lib/date';
import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import { ApiReturn, Berkas, Jadwal } from '@/types/api';

export default function BerkasCard({ data }: { data: Berkas }) {
  const { data: apiJadwal, isLoading } = useSWRWithToast(
    useSWR<ApiReturn<Jadwal>>(`/jadwal/view?id=${data.idJadwal}`)
  );
  const jadwal = apiJadwal?.data ?? {
    lokasi_ujian: '',
    tanggal_ujian: '',
    waktu_mulai: '',
    waktu_selesai: '',
  };
  return (
    <div className='flex gap-12'>
      <div className='aspect-square min-w-[6rem] flex-shrink-0 bg-red-500'></div>
      <div>
        {!isLoading && (
          <div className='grid grid-cols-2 gap-y-1 max-w-md'>
            <p>Lokasi</p>
            <p>{jadwal.lokasi_ujian}</p>

            <p>Tanggal Ujian</p>
            <p>{formatLocale(new Date(jadwal.tanggal_ujian), 'FULL_DAY')}</p>

            <p>Waktu Ujian</p>
            <p>{`${formatLocale(
              parseTimeFromAPI(jadwal.waktu_mulai),
              'FULL_TIME'
            )} - 
            ${formatLocale(
              parseTimeFromAPI(jadwal.waktu_selesai),
              'FULL_TIME'
            )}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}
