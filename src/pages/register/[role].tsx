/* eslint-disable unused-imports/no-unused-vars */
import axios from 'axios';
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import axiosClient from '@/lib/axios';
import { formatDateForAPI } from '@/lib/date';
import useLoadingToast from '@/hooks/toast/useLoadingToast';

import Button from '@/components/buttons/Button';
import withAuth, { WithAuthProps } from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Logo from '@/components/Logo';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { ROLES } from '@/constant/roles';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import RegisterFactory from '@/container/register/RegisterFactory';
import useAuthStore from '@/store/useAuthStore';

import { ApiRouteReturn } from '@/types/api';

type RegisterData = {
  nama: string;
  email: string;
  password: string;
  nik: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  edukasi: string;
  nomor_telepon: string;
};

type RegisterPageProps = InferGetStaticPropsType<typeof getStaticProps> &
  WithAuthProps;

function RegisterPage({ role }: RegisterPageProps) {
  const route = useRouter();
  const roles = ROLES.map((role) => role);
  const isLoading = useLoadingToast();

  //#region  //*=========== Store ===========
  const login = useAuthStore.useLogin();
  //#endregion  //*======== Store ===========

  //#region  //*============== Form ===========
  const methods = useForm<RegisterData>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*============== Form ===========

  //#region //*============== Form Submit ===========
  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    const sendData =
      role === 'pendaftar'
        ? {
            ...data,
            tanggal_lahir: formatDateForAPI(new Date(data.tanggal_lahir)),
          }
        : { ...data };

    // eslint-disable-next-line no-console
    console.log(sendData);

    toast.loading('loading ...');

    try {
      const response = await axiosClient.post<ApiRouteReturn>(
        `/${role}/register`,
        sendData
      );

      if (response.data.error) {
        toast.dismiss();
        toast.error(response.data.error ?? DEFAULT_TOAST_MESSAGE.error);
        return;
      }

      route.replace(`/masuk/${role}`);
      toast.success(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.dismiss();
        toast.error(error.response?.data.error ?? DEFAULT_TOAST_MESSAGE.error);
        return;
      }

      toast.error(DEFAULT_TOAST_MESSAGE.error);
    }
    toast.dismiss();
    return;
  };
  //#endregion //*============== Form Submit ===========

  return (
    <Layout withDashboardShell={false}>
      <Seo templateTitle='Login' />

      <main>
        <div className='flex flex-col min-h-screen bg-white sm:flex-row'>
          <div className='min-h-[60vh] block sticky top-0 w-full bg-gradient-to-b from-primary-50 to-primary-100 lg:min-h-screen'>
            <NextImage
              className='object-cover absolute inset-0 w-full h-full'
              src={`/images/illustration/${role}.svg`}
              layout='fill'
              objectFit='cover'
              alt='login background image'
            />
          </div>
          <div className='flex z-10 flex-col justify-center px-4 pt-0 pb-12 bg-white sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
            <UnstyledLink
              href='#register'
              className='block relative -mb-1 w-full h-12 bg-white sm:hidden sm:h-16'
            >
              <div className='absolute top-2 left-1/2 w-16 h-2 bg-gray-200 rounded-full -translate-x-1/2'>
                &nbsp;
              </div>
            </UnstyledLink>
            <div className='mx-auto w-full max-w-sm sm:min-w-[24rem]'>
              <div className='w-full'>
                <Logo />
                <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                  Daftar akun sebagai {role}
                </h2>
                <p className='mt-2 text-sm text-gray-600'>
                  Anda juga bisa daftar sebagai{' '}
                  {roles
                    .filter((r) => r !== role)
                    .map((role, i) => (
                      <React.Fragment key={role}>
                        <CustomLink href={`/register/${role}`}>
                          {role}
                        </CustomLink>
                        {i === 0 && <span> atau </span>}
                      </React.Fragment>
                    ))}
                </p>
              </div>

              <div className='mt-8'>
                <div className='mt-6'>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className='space-y-6'
                      id='register'
                    >
                      <RegisterFactory role={role} />
                      <div>
                        <Button
                          isLoading={isLoading}
                          className='justify-center w-full'
                          type='submit'
                        >
                          Daftar
                        </Button>
                      </div>

                      <div className='flex justify-between items-center'>
                        <p>Sudah memiliki akun?</p>
                        <div className='text-sm'>
                          <PrimaryLink href={`/masuk/${role}`}>
                            Masuk
                          </PrimaryLink>
                        </div>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default withAuth(RegisterPage, 'auth');

interface IParams extends ParsedUrlQuery {
  role: typeof ROLES[number];
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ROLES.map((role) => ({ params: { role } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { role } = params as IParams;
  return {
    props: { role },
  };
};
