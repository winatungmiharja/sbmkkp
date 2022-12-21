import clsx from 'clsx';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { KeyedMutator } from 'swr';

import axiosClient from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { formatDateForAPI, formatLocale, parseTimeFromAPI } from '@/lib/date';
import useDialog from '@/hooks/useDialog';

import Button from '@/components/buttons/Button';

import { timeOption } from '@/constant/form';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import JadwalForm from '@/container/form/JadwalForm';
import EditModalWrapper from '@/container/modal/EditModalWrapper';

import { ApiReturn, Jadwal } from '@/types/api';

type JadwalActionProps = {
  data: Jadwal;
  mutate: KeyedMutator<ApiReturn<Jadwal[]>>;
};

type EditData = Pick<
  Jadwal,
  'lokasi_ujian' | 'tanggal_ujian' | 'waktu_mulai' | 'waktu_selesai'
>;

const JadwalAction = ({ data, mutate }: JadwalActionProps) => {
  const dialog = useDialog();

  // edit modal state
  const [isEdit, setIsEdit] = React.useState(false);

  //#region  //*=========== Form ===========
  const methods = useForm<EditData>({
    mode: 'onTouched',
    defaultValues: {
      lokasi_ujian: data.lokasi_ujian,
      tanggal_ujian: data.tanggal_ujian,
      waktu_mulai: data.waktu_mulai,
      waktu_selesai: data.waktu_selesai,
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isDirty },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== API Calls ===========
  const onUpdate: SubmitHandler<EditData> = (input) => {
    const mappedData = {
      jadwalId: data.id,
      lokasi_ujian: input.lokasi_ujian,
      tanggal_ujian: formatDateForAPI(new Date(input.tanggal_ujian)),
      waktu_mulai: formatLocale(parseTimeFromAPI(input.waktu_mulai), 'TIME'),
      waktu_selesai: formatLocale(
        parseTimeFromAPI(input.waktu_selesai),
        'TIME'
      ),
    };

    toast.promise(
      axiosClient.post('/jadwal/update', mappedData).then(() => {
        mutate();
        closeModal();
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        loading: 'Mengubah jadwal',
        success: 'Jadwal berhasil diubah',
      }
    );
  };

  const onDelete = () => {
    dialog({
      title: (
        <>
          Hapus Jadwal{' '}
          <span className='font-bold'>
            {formatLocale(new Date(data.tanggal_ujian), 'FULL_DAY')}
          </span>
        </>
      ),
      description:
        'Setelah jadwal terhapus maka data tidak bisa dikembalikan, apakah Anda yakin?',
      submitText: 'Hapus',
      variant: 'danger',
    }).then(() => {
      toast.promise(
        axiosClient
          .post('/jadwal/delete', {
            jadwalId: data.id,
          })
          .then(() => {
            mutate();
          }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          loading: 'Menghapus jadwal',
          success: 'Jadwal berhasil dihapus',
        }
      );
    });
  };
  //#endregion  //*======== API Calls ===========

  //#region  //*=========== Modal ===========
  const closeModal = () => {
    setIsEdit(false);
    reset();
  };
  //#endregion  //*======== Modal ===========

  React.useEffect(() => {
    if (watch('waktu_mulai') !== data.waktu_mulai) {
      const nextOption = timeOption.find(
        (item) =>
          parseTimeFromAPI(item.value) > parseTimeFromAPI(watch('waktu_mulai'))
      );
      setValue('waktu_selesai', nextOption?.value as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('waktu_mulai')]);

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
          <JadwalForm />
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
};

export default JadwalAction;
