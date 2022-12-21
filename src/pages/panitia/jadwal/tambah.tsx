import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import axiosClient from '@/lib/axios';
import { formatDateForAPI, formatLocale, parseTimeFromAPI } from '@/lib/date';
import useLoadingToast from '@/hooks/toast/useLoadingToast';

import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { timeOption } from '@/constant/form';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import JadwalForm from '@/container/form/JadwalForm';
import MenuHeader from '@/container/text/MenuHeader';

import { Jadwal } from '@/types/api';

type CreateJadwal = Pick<
  Jadwal,
  'lokasi_ujian' | 'tanggal_ujian' | 'waktu_mulai' | 'waktu_selesai'
>;

function TambahPage() {
  const router = useRouter();
  const isLoading = useLoadingToast();

  //#region  //*=========== Form ===========
  const methods = useForm<CreateJadwal>({
    mode: 'onTouched',
  });
  const { handleSubmit, watch, setValue } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== API Calls ===========
  const onSubmit: SubmitHandler<CreateJadwal> = (input) => {
    const mappedData = {
      lokasi_ujian: input.lokasi_ujian,
      tanggal_ujian: formatDateForAPI(new Date(input.tanggal_ujian)),
      waktu_mulai: formatLocale(parseTimeFromAPI(input.waktu_mulai), 'TIME'),
      waktu_selesai: formatLocale(
        parseTimeFromAPI(input.waktu_selesai),
        'TIME'
      ),
    };
    toast.promise(
      axiosClient.post('/jadwal/create', mappedData).then(() => {
        router.replace('/panitia/jadwal');
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Jadwal berhasil ditambahkan',
      }
    );
  };
  //#endregion  //*======== API Calls ===========

  React.useEffect(() => {
    if (watch('waktu_mulai')) {
      const nextOption = timeOption.find(
        (item) =>
          parseTimeFromAPI(item.value) > parseTimeFromAPI(watch('waktu_mulai'))
      );
      setValue('waktu_selesai', nextOption?.value as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('waktu_mulai')]);

  return (
    <Layout>
      <Seo templateTitle='Tambah Jadwal' />
      <MenuHeader headerVariant='pemesanan'>
        <MenuHeader.Heading>Tambah Jadwal</MenuHeader.Heading>
        <MenuHeader.BackLink href='/panitia/jadwal'>
          Kembali
        </MenuHeader.BackLink>
      </MenuHeader>
      <div className='mt-8'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row gap-x-12 items-end mt-4'>
              <div className='w-full max-w-md'>
                <JadwalForm />
              </div>
            </div>
            <hr className='mt-4' />
            <div className='mt-4 space-x-2'>
              <Button
                disabled={isLoading}
                onClick={() => router.replace('/panitia/jadwal')}
                type='button'
                variant='light'
              >
                Batal
              </Button>
              <Button isLoading={isLoading} type='submit'>
                Tambah
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
}

export default withAuth(TambahPage, 'panitia');
