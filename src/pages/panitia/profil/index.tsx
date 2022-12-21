import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import axiosClient from '@/lib/axios';
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

import { ApiReturn, Panitia } from '@/types/api';

type EditPanitia = Panitia;

function IndexPage() {
  const user = useAuthStore.useUser();
  const isLoading = useLoadingToast();
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  //#region  //*=========== Initial Data ===========
  const {
    data: apiPanitia,
    isLoading: isPanitiaDataLoading,
    mutate,
  } = useSWRWithToast(
    useSWR<ApiReturn<Panitia>>(`/panitia/view?id=${user?.id}`)
  );

  const panitia = apiPanitia?.data;
  //#endregion  //*======== Initial Data ===========

  //#region  //*=========== Form ===========

  const profileDefaultValues = panitia
    ? {
        nama: panitia.nama,
        email: panitia.email,
        nomor_telepon: panitia.nomor_telepon,
      }
    : {};

  const methods = useForm<EditPanitia>({
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
    if (panitia) {
      setValue('nama', panitia.nama);
      setValue('email', panitia.email);
      setValue('nomor_telepon', panitia.nomor_telepon);
    }
  }, [isPanitiaDataLoading, panitia, setValue]);
  //#endregion  //*======== Form ===========

  //#region  //*=========== API Calls ===========
  const onSubmit: SubmitHandler<EditPanitia> = (input) => {
    const mappedData = {
      nama: input.nama,
      email: input.email,
      nomor_telepon: input.nomor_telepon,
    };

    toast.promise(
      axiosClient.post('/panitia/update', mappedData).then(() => {
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
        <MenuHeader.BackLink href='/panitia/'>Kembali</MenuHeader.BackLink>
      </MenuHeader>
      <div className='mt-8'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row gap-x-12 items-end mt-4'>
              <div className='w-full max-w-md'>
                <RegisterFactory
                  role='panitia'
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
                      reset();
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
                    disabled={isPanitiaDataLoading}
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

export default withAuth(IndexPage, 'panitia');
