import React from 'react';
import { Cell, Column } from 'react-table';
import useSWR from 'swr';

import clsxm from '@/lib/clsxm';
import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

import BerkasAction from '@/container/action/panitia/BerkasAction';
import BerkasPreview from '@/container/action/pendaftar/BerkasPreview';
import MenuHeader from '@/container/text/MenuHeader';

import { ApiReturn, Berkas, StatusBerkas } from '@/types/api';

function IndexPage() {
  const {
    data: apiBerkas,
    isLoading,
    mutate,
  } = useSWRWithToast(useSWR<ApiReturn<Berkas[]>>(`/berkas/view/`));

  const berkas: Berkas[] = apiBerkas?.data ?? [];
  const columns = React.useMemo<Column<Berkas>[]>(
    () => [
      {
        Header: 'id Berkas',
        accessor: (row) => [row.id],
        className: 'capitalize',
        Cell: ({ value: [name] }: Cell<Berkas, [string]>) => (
          <span className='font-semibold text-primary-500'>{name}</span>
        ),
      },
      {
        Header: 'id Jadwal',
        accessor: (row) => [row.idJadwal],
        className: 'capitalize',
        Cell: ({ value: [name] }: Cell<Berkas, [string]>) => (
          <span className='font-semibold text-primary-500'>{name}</span>
        ),
      },
      {
        Header: 'Status',
        accessor: (row) => [row.status],
        className: 'capitalize w-full',
        Cell: ({
          value: [status],
        }: Cell<Berkas, [keyof typeof StatusBerkas]>) => (
          <span
            className={clsxm(
              'px-4 py-1 rounded-full text-xs font-semibold tracking-wide',
              [
                status === 'pending' && 'bg-yellow-100 ',
                status === 'cancelled' && 'bg-red-100 ',
                status === 'verified' && 'bg-green-100 ',
              ]
            )}
          >
            {status}
          </span>
        ),
      },

      {
        Header: 'Aksi',
        accessor: (row) => [row],
        Cell: ({ value: [berkas] }: Cell<Berkas, [Berkas]>) => (
          <BerkasAction data={berkas} mutate={mutate} />
        ),
        disableSortBy: true,
        className: 'capitalize',
      },
      {
        Header: 'Detail',
        accessor: (row) => [row],
        Cell: ({ value: [berkas] }: Cell<Berkas, [Berkas]>) => (
          <BerkasPreview data={berkas} />
        ),
        disableSortBy: true,
        className: 'capitalize',
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <Layout>
      <Seo templateTitle='Riwayat Pendaftaran' />
      <MenuHeader headerVariant='barang'>
        <MenuHeader.Heading>Riwayat Pendaftaran</MenuHeader.Heading>
        <MenuHeader.Subheading>
          berikut ini riwayat pendaftaran yang sudah pernah anda ajukan
        </MenuHeader.Subheading>
      </MenuHeader>
      <Table
        className='mt-12'
        data={berkas}
        columns={columns}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default withAuth(IndexPage, 'panitia');
