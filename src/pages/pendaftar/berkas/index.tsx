import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import axiosClient from '@/lib/axios';
import { formatLocale, parseTimeFromAPI } from '@/lib/date';
import useLoadingToast from '@/hooks/toast/useLoadingToast';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import SelectInput from '@/components/forms/SelectInput';
import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { storage } from '@/../firebase/initFirebase';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import MenuHeader from '@/container/text/MenuHeader';
import SectionHeader from '@/container/text/SectionHeader';
import useAuthStore from '@/store/useAuthStore';

import { ApiReturn, Berkas, Jadwal } from '@/types/api';
import { FileWithPreview } from '@/types/dropzone';

type CreateBerkas = Pick<Berkas, 'foto_ktp' | 'foto_formal' | 'idJadwal'>;

function IndexPage() {
  const router = useRouter();
  const isLoading = useLoadingToast();

  const user = useAuthStore.useUser();

  //#region  //*=========== Form ===========
  const methods = useForm<CreateBerkas>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Firebase ===========
  const uploadToFirebase = async (
    file: FileWithPreview,
    folderName: string,
    fileName: string
  ) => {
    toast.loading(`Mengupload Berkas...`);
    const uploadTask = ref(storage, `sbmkkp/${folderName}/${fileName}`);
    const uploadImage = uploadBytes(uploadTask, file);
    const url = await uploadImage.then((snapshot) =>
      getDownloadURL(snapshot.ref)
    );

    return url;
  };
  const uploadAllFile = async (data: CreateBerkas) => {
    if (!data.foto_ktp || !data.foto_formal) {
      toast.error('Harap mengupload ulang gambar anda');
      return { url: '', success: false, message: 'File didnt exist' };
    }
    try {
      const ktp = await uploadToFirebase(
        data.foto_ktp[0],
        user?.email as string,
        `${data.idJadwal}_foto_ktp_${JSON.stringify(Date.now())}`
      );

      const foto = await uploadToFirebase(
        data.foto_formal[0],
        user?.email as string,
        `${data.idJadwal}_foto_formal_${JSON.stringify(Date.now())}`
      );

      const fileUrl = await Promise.all([ktp, foto]);
      return {
        url: await fileUrl,
        success: true,
        message: 'Success Upload File',
      };
    } catch (error) {
      return { url: '', success: false, message: JSON.stringify(error) };
    }
  };
  //#endregion  //*======== Firebase ===========

  //#region  //*=========== API Calls ===========
  const onSubmit: SubmitHandler<CreateBerkas> = async (input) => {
    //#region  //*=========== Upload file to firebase ===========
    const resUploadFile = await uploadAllFile(input as CreateBerkas);
    if (!resUploadFile?.success) {
      toast.dismiss();
      toast.error(DEFAULT_TOAST_MESSAGE.error);
      toast.error(JSON.stringify(resUploadFile.message));
      return;
    }
    toast.dismiss();
    //#endregion  //*======== Upload file to firebase ===========

    toast.promise(
      axiosClient
        .post('/berkas/create', {
          idJadwal: input.idJadwal,
          foto_ktp: resUploadFile.url[0],
          foto_formal: resUploadFile.url[1],
        })
        .then(() => {
          router.replace('/pendaftar/riwayat');
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Berkas pendaftaran berhasil dibuat',
      }
    );
  };
  //#endregion  //*======== API Calls ===========

  //#region  //*=========== Get Jadwal Data ===========
  const { data: apiJadwal } = useSWR<ApiReturn<Jadwal[]>>('/jadwal/view');
  const jadwal: Jadwal[] = apiJadwal?.data ?? [];
  //#endregion  //*======== Get Jadwal Data ===========
  return (
    <Layout>
      <Seo templateTitle='Buat Pendaftaran' />
      <MenuHeader headerVariant='pembeli'>
        <MenuHeader.Heading>Buat Pendaftaran</MenuHeader.Heading>
        <MenuHeader.Subheading>
          isi form dibawah ini untuk melakukan pendaftaran
        </MenuHeader.Subheading>
      </MenuHeader>
      <div className='mt-8'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-y-12 mt-4'>
              <div className='space-y-4'>
                <SectionHeader>
                  <SectionHeader.Heading>1. Pilih Jadwal</SectionHeader.Heading>
                  <SectionHeader.Subheading>
                    Pilih jadwal ujian yang akan diambil
                  </SectionHeader.Subheading>
                </SectionHeader>
                <hr />
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
              </div>
              <div className='space-y-4'>
                <SectionHeader>
                  <SectionHeader.Heading>
                    2. Unggah Berkas
                  </SectionHeader.Heading>
                  <SectionHeader.Subheading>
                    unggah berkas pendukung
                  </SectionHeader.Subheading>
                </SectionHeader>
                <hr />
                <div className='grid grid-cols-2 gap-4'>
                  <DropzoneInput
                    label='Foto kartu tanda penduduk'
                    id='foto_ktp'
                    accept='image/png, image/jpg, image/jpeg, application/pdf'
                    helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
                    validation={{
                      required: 'Foto kartu tanda penduduk harus diupload',
                    }}
                  />
                  <DropzoneInput
                    label='Foto formal'
                    id='foto_formal'
                    accept='image/png, image/jpg, image/jpeg, application/pdf'
                    helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
                    validation={{
                      required: 'Foto formal harus diupload',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='mt-12 space-x-2'>
              <Button
                disabled={isLoading}
                onClick={() => router.replace('/pendaftar')}
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

export default withAuth(IndexPage, 'pendaftar');
