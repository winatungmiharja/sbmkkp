import clsx from 'clsx';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR, { KeyedMutator } from 'swr';

import axiosClient from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { formatLocale, parseTimeFromAPI } from '@/lib/date';
import useDialog from '@/hooks/useDialog';

import Button from '@/components/buttons/Button';
import SelectInput from '@/components/forms/SelectInput';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import EditModalWrapper from '@/container/modal/EditModalWrapper';
import useAuthStore from '@/store/useAuthStore';

import { ApiReturn, Berkas, Jadwal } from '@/types/api';

type BerkasActionProps = {
  data: Berkas;
  mutate: KeyedMutator<ApiReturn<Berkas[]>>;
};

type EditData = Pick<Berkas, 'idJadwal'>;

export default function BerkasAction({ data, mutate }: BerkasActionProps) {
  const dialog = useDialog();

  // edit modal state
  const [isEdit, setIsEdit] = React.useState(false);

  const user = useAuthStore.useUser();

  //#region  //*=========== Form ===========
  const methods = useForm<EditData>({
    mode: 'onTouched',
    defaultValues: {
      idJadwal: data.idJadwal,
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== API Calls ===========
  const onDelete = () => {
    dialog({
      title: <>Hapus Berkas</>,
      description:
        'Setelah berkas terhapus maka data tidak bisa dikembalikan, apakah Anda yakin?',
      submitText: 'Hapus',
      variant: 'danger',
    }).then(() => {
      toast.promise(
        axiosClient
          .post('/berkas/delete', {
            berkasId: data.id,
          })
          .then(() => {
            mutate();
          }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          loading: 'Menghapus berkas',
          success: 'Berkas berhasil dihapus',
        }
      );
    });
  };
  const onUpdate: SubmitHandler<EditData> = (input) => {
    const mappedData = {
      idJadwal: input.idJadwal,
      idPendaftar: user?.id,
      status: data.status,
      foto_ktp: data.foto_ktp,
      foto_formal: data.foto_formal,
    };
    toast.promise(
      axiosClient.post('/berkas/update', mappedData).then(() => {
        mutate();
        closeModal();
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        loading: 'Mengubah berkas',
        success: 'Berkas berhasil diubah',
      }
    );
  };
  //#endregion  //*======== API Calls ===========

  //#region  //*=========== Modal ===========
  const closeModal = () => {
    setIsEdit(false);
  };
  //#endregion  //*======== Modal ===========

  //#region  //*=========== Get Jadwal Data ===========
  const { data: apiJadwal } = useSWR<ApiReturn<Jadwal[]>>('/jadwal/view');
  const jadwal: Jadwal[] = apiJadwal?.data ?? [];
  //#endregion  //*======== Get Jadwal Data ===========
  return (
    <EditModalWrapper
      title='Edit Jadwal'
      setEdit={setIsEdit}
      isEdit={isEdit}
      onDelete={onDelete}
      onCloseModal={closeModal}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onUpdate)} className='mt-8'>
          <SelectInput
            id='idJadwal'
            label=''
            placeholder='Harap Pilih Jadwal'
            validation={{
              required: 'Jadwal harus diisi',
            }}
          >
            {jadwal.map((item) => (
              <option key={item.id} value={item.id}>
                {`${item.lokasi_ujian} (
                  ${formatLocale(new Date(item.tanggal_ujian), 'FULL_DAY')})
                  ${formatLocale(
                    parseTimeFromAPI(item.waktu_mulai),
                    'FULL_TIME'
                  )} - 
            ${formatLocale(parseTimeFromAPI(item.waktu_selesai), 'FULL_TIME')}`}
              </option>
            ))}
          </SelectInput>
          <div className='mt-12 sm:flex sm:flex-row-reverse sm:mt-8'>
            <Button
              disabled={!isDirty}
              type='submit'
              className={clsxm(
                '!font-medium justify-center items-center w-full sm:ml-3 sm:w-auto sm:text-sm'
              )}
            >
              Simpan
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={closeModal}
              className={clsx(
                '!font-medium justify-center items-center mt-3 w-full sm:mt-0 sm:w-auto sm:text-sm'
              )}
            >
              Batal
            </Button>
          </div>
        </form>
      </FormProvider>
    </EditModalWrapper>
  );
}
