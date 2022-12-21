import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import axiosClient from '@/lib/axios';
import { formatDateForAPI } from '@/lib/date';
import useLoadingToast from '@/hooks/toast/useLoadingToast';
import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import Button from '@/components/buttons/Button';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import RegisterFactory from '@/container/register/RegisterFactory';
import MenuHeader from '@/container/text/MenuHeader';
import useAuthStore from '@/store/useAuthStore';

import { ApiReturn, Pendaftar } from '@/types/api';

type EditPendaftar = Pendaftar;

function IndexPage() {
  const user = useAuthStore.useUser();
  const isLoading = useLoadingToast();
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  //#region  //*=========== Initial Data ===========
  const {
    data: apiPendaftar,
    isLoading: isPendaftarDataLoading,
    mutate,
  } = useSWRWithToast(
    useSWR<ApiReturn<Pendaftar>>(`/pendaftar/view?id=${user?.id}`)
  );

  const pendaftar = apiPendaftar?.data;
  //#endregion  //*======== Initial Data ===========

  //#region  //*=========== Form ===========

  const profileDefaultValues = pendaftar
    ? {
        nama: pendaftar.nama,
        email: pendaftar.email,
        nomor_telepon: pendaftar.nomor_telepon,
      }
    : {};

  const methods = useForm<EditPendaftar>({
    mode: 'onTouched',
    defaultValues: profileDefaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isDirty },
    reset,
  } = methods;

  React.useEffect(() => {
    if (pendaftar) {
      setValue('nama', pendaftar.nama);
      setValue('email', pendaftar.email);
      setValue('nik', pendaftar.nik);
      setValue('jenis_kelamin', pendaftar.jenis_kelamin);
      setValue('tempat_lahir', pendaftar.tempat_lahir);
      setValue('tanggal_lahir', pendaftar.tanggal_lahir);
      setValue('edukasi', pendaftar.edukasi);
      setValue('nomor_telepon', pendaftar.nomor_telepon);
    }
  }, [isPendaftarDataLoading, pendaftar, setValue]);
  //#endregion  //*======== Form ===========

  //#region  //*=========== API Calls ===========
  const onSubmit: SubmitHandler<EditPendaftar> = (input) => {
    const mappedData = {
      ...input,
      tanggal_lahir: formatDateForAPI(new Date(input.tanggal_lahir)),
    };

    toast.promise(
      axiosClient.post('/pendaftar/update', mappedData).then(() => {
        mutate();
        setIsEdit(false);
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'data berhasil diubah',
      }
    );
  };
  //#endregion  //*======== API Calls ===========

  return (
    <Layout>
      <Seo templateTitle='Profil Pengguna' />
      <MenuHeader headerVariant='karyawan'>
        <MenuHeader.Heading>Profil</MenuHeader.Heading>
        <MenuHeader.BackLink href='/pendaftar/'>Kembali</MenuHeader.BackLink>
      </MenuHeader>
      <div className='mt-8'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row gap-x-12 items-end mt-4'>
              <div className='w-full max-w-md'>
                <RegisterFactory
                  role='pendaftar'
                  includePassword={false}
                  readOnly={!isEdit}
                />
              </div>
            </div>
            <hr className='mt-4' />
            <div className='mt-4 space-x-2'>
              {isEdit ? (
                <>
                  <Button
                    onClick={() => {
                      setIsEdit(false);
                      reset(pendaftar);
                    }}
                    type='button'
                    variant='light'
                  >
                    Batal
                  </Button>
                  <Button
                    isLoading={isLoading}
                    disabled={!isDirty}
                    type='submit'
                  >
                    Simpan
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setIsEdit(true)}
                    type='button'
                    variant='light'
                    disabled={isPendaftarDataLoading}
                  >
                    Ubah
                  </Button>
                </>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
}

export default withAuth(IndexPage, 'pendaftar');
