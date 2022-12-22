import React from 'react';
import useSWR from 'swr';

import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import BerkasCard from '@/container/card/BerkasCard';
import MenuHeader from '@/container/text/MenuHeader';

import { ApiReturn, Berkas } from '@/types/api';

function IndexPage() {
  //#region  //*=========== Get Berkas Data ===========
  const { data: apiBerkas, isLoading } = useSWRWithToast(
    useSWR<ApiReturn<Berkas>>('/berkas/view')
  );
  const dataBerkas = apiBerkas?.data;
  //#endregion  //*======== Get Berkas Data ===========

  return (
    <Layout>
      <Seo templateTitle='Riwayat Pendaftaran' />
      <MenuHeader headerVariant='barang'>
        <MenuHeader.Heading>Riwayat Pendaftaran</MenuHeader.Heading>
        <MenuHeader.Subheading>
          berikut ini riwayat pendaftaran yang sudah pernah anda ajukan
        </MenuHeader.Subheading>
      </MenuHeader>
      <div className='mt-12'>
        {!isLoading ? (
          <BerkasCard data={dataBerkas as Berkas} />
        ) : (
          <div className='min-h-[8rem] w-full bg-gray-100 rounded-md animate-pulse'></div>
        )}
      </div>
    </Layout>
  );
}

export default withAuth(IndexPage, 'pendaftar');
