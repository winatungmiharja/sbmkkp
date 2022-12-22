import React from 'react';
import { HiOutlinePrinter } from 'react-icons/hi';
import useSWR from 'swr';

import clsxm from '@/lib/clsxm';
import { formatLocale, parseTimeFromAPI } from '@/lib/date';
import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import ButtonLink from '@/components/links/ButtonLink';

import BerkasPreview from '../action/pendaftar/BerkasPreview';

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
    <div
      className={clsxm(
        ' bg-white border relative border-gray-100 flex  p-4 rounded-md shadow-inner',
        ''
      )}
    >
      <div className='flex z-10 gap-12 justify-between w-full'>
        {!isLoading ? (
          <div>
            <div className='flex gap-4 items-center'>
              <p className='text-xs tracking-wider text-gray-500 uppercase'>
                Status :
              </p>
              <span
                className={clsxm(
                  'px-4 py-1 rounded-full text-xs font-semibold tracking-wide',
                  [
                    data.status === 'pending' && 'bg-yellow-100 ',
                    data.status === 'cancelled' && 'bg-red-100 ',
                    data.status === 'verified' && 'bg-green-100 ',
                  ]
                )}
              >
                {data.status}
              </span>
            </div>
            <div className='grid grid-cols-2 gap-y-1 mt-4 w-full max-w-lg'>
              <div className=''>
                <p className='text-primary-500'>Lokasi</p>
                <p className='text-primary-500'>Tanggal Ujian</p>
                <p className='text-primary-500'>Waktu Ujian</p>
              </div>
              <div className='pl-4 border-l'>
                <p>{jadwal.lokasi_ujian}</p>
                <p>
                  {formatLocale(new Date(jadwal.tanggal_ujian), 'FULL_DAY')}
                </p>
                <p>{`${formatLocale(
                  parseTimeFromAPI(jadwal.waktu_mulai),
                  'FULL_TIME'
                )} - 
            ${formatLocale(
              parseTimeFromAPI(jadwal.waktu_selesai),
              'FULL_TIME'
            )}`}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='min-h-[5rem] w-1/2 bg-gray-100 rounded-md animate-pulse'></div>
        )}
        <div className='flex justify-between mt-auto'>
          <BerkasPreview data={data} />
          {data.status === 'verified' && (
            <ButtonLink variant='ghost' href='/pendaftar/print'>
              <span className='inline-flex gap-2 items-center'>
                <HiOutlinePrinter size={16} /> <p>Print Kartu Ujian</p>
              </span>
            </ButtonLink>
          )}
        </div>
      </div>
      <div
        className={clsxm(
          'absolute bg-no-repeat h-full bg-cover inset-0 opacity-20 w-full',
          [
            data.status === 'pending' && 'bg-header-amber',
            data.status === 'cancelled' && 'bg-header-rose',
            data.status === 'verified' && 'bg-header-emerald',
          ]
        )}
      ></div>
    </div>
  );
}
