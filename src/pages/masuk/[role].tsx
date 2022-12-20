/* eslint-disable unused-imports/no-unused-vars */
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import axiosClient from '@/lib/axios';
import useLoadingToast from '@/hooks/toast/useLoadingToast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import withAuth, { WithAuthProps } from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Logo from '@/components/Logo';
import Seo from '@/components/Seo';

import { ROLES } from '@/constant/roles';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import useAuthStore from '@/store/useAuthStore';

import { ApiUserDataReturn } from '@/types/api';

type LoginData = {
  email: string;
  password: string;
};

type LoginApiReturn = {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  email: string;
  passwordResetToken: string;
  passwordResetTokenExpiresAt: number;
};

type LoginPageProps = InferGetStaticPropsType<typeof getStaticProps> &
  WithAuthProps;

function LoginPage({ role }: LoginPageProps) {
  const roles = ROLES.map((role) => role);
  const isLoading = useLoadingToast();

  //#region  //*=========== Store ===========
  const login = useAuthStore.useLogin();
  //#endregion  //*======== Store ===========

  //#region  //*============== Form
  const methods = useForm<LoginData>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*============== Form

  //#region //*============== Form Submit
  const onSubmit: SubmitHandler<LoginData> = (data) => {
    toast.promise(
      axiosClient
        .post<ApiUserDataReturn<LoginApiReturn>>(`/${role}/login`, data)
        .then((res) => {
          const response = res.data;
          login({
            token: response.token,
            id: response.data.id,
            email: response.data.email,
            role: response.role,
          });
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Berhasil! Anda bisa masuk ke akun anda',
      }
    );

    return;
  };
  //#endregion //*============== Form Submit

  return (
    <Layout withDashboardShell={false}>
      <Seo templateTitle='Login' />

      <main>
        <div className='flex flex-col min-h-screen bg-white sm:flex-row'>
          <div
            className='min-h-[60vh] flex sticky top-0 w-full bg-bottom bg-no-repeat bg-cover bg-gradient-to-b from-primary-50 to-primary-100 lg:min-h-screen'
            style={{
              backgroundImage: `url(/images/illustration/${role}.svg)`,
            }}
          >
            <div className='pt-[max(calc(100vw/12),6rem)] flex absolute inset-0 z-10 w-full h-full'>
              <div className='flex z-10 flex-col gap-4 mx-4 max-w-lg leading-tight sm:mx-6 lg:mx-20 xl:mx-24'>
                <h1 className='text-[min(10vw,4rem)]'>SBMKKP</h1>
                <h2 className='text-[min(5vw,2rem)] font-normal leading-tight text-primary-900'>
                  Seleksi Bersama masuk Kementerian Kelautan dan Perikanan
                </h2>
              </div>
            </div>
          </div>
          <div className='flex z-10 flex-col justify-center px-4 pt-0 pb-12 bg-white sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
            <UnstyledLink
              href='#login'
              className='block relative -mb-1 w-full h-12 bg-white sm:hidden sm:h-16'
            >
              <div className='absolute top-2 left-1/2 w-16 h-2 bg-gray-200 rounded-full -translate-x-1/2'>
                &nbsp;
              </div>
            </UnstyledLink>
            <div className='mx-auto w-full max-w-sm sm:min-w-[24rem]'>
              <div className='w-full' id='login'>
                <Logo />
                <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                  Masuk sebagai {role}
                </h2>
                <p className='mt-2 text-sm text-gray-600'>
                  Anda juga bisa masuk sebagai{' '}
                  {roles
                    .filter((r) => r !== role)
                    .map((role, i) => (
                      <React.Fragment key={role}>
                        <CustomLink href={`/masuk/${role}`}>{role}</CustomLink>
                      </React.Fragment>
                    ))}
                </p>
              </div>

              <div className='mt-8'>
                <div className='mt-6'>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className='px-2 py-4 space-y-6 w-full rounded-md shadow-inner'
                    >
                      <Input
                        id='email'
                        label='Email'
                        validation={{ required: 'Email harus diisi' }}
                      />

                      <PasswordInput
                        id='password'
                        label='Password'
                        validation={{ required: 'Password harus diisi' }}
                      />

                      <div>
                        <Button
                          isLoading={isLoading}
                          className='justify-center w-full'
                          type='submit'
                        >
                          Login
                        </Button>
                      </div>

                      <div className='flex justify-between items-center'>
                        <p>Belum memiliki akun?</p>
                        <div className='text-sm'>
                          <PrimaryLink href={`/register/${role}`}>
                            Daftar Sekarang
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

export default withAuth(LoginPage, 'auth');

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
