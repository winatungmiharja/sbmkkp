import * as React from 'react';
import { HiPlus } from 'react-icons/hi';
import { Cell, Column } from 'react-table';
import useSWR from 'swr';

import { formatLocale, parseTimeFromAPI } from '@/lib/date';
import useSWRWithToast from '@/hooks/toast/useSWRWithToast';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

import JadwalAction from '@/container/action/panitia/JadwalAction';
import MenuHeader from '@/container/text/MenuHeader';

import { ApiReturn, Jadwal } from '@/types/api';

function IndexPage() {
  const {
    data: apiJadwal,
    isLoading,
    mutate,
  } = useSWRWithToast(useSWR<ApiReturn<Jadwal[]>>('/jadwal/view'));

  const jadwal: Jadwal[] = apiJadwal?.data ?? [];
  const columns = React.useMemo<Column<Jadwal>[]>(
    () => [
      {
        Header: 'Lokasi',
        accessor: (row) => [row.lokasi_ujian],
        className: 'capitalize',
        Cell: ({ value: [name] }: Cell<Jadwal, [string]>) => (
          <span className='font-semibold text-primary-500'>{name}</span>
        ),
      },
      {
        Header: 'Tanggal Ujian',
        accessor: (row) => [row.tanggal_ujian],
        className: 'capitalize',
        Cell: ({ value: [tanggal_ujian] }: Cell<Jadwal, [string]>) => (
          <span className=''>
            {formatLocale(new Date(tanggal_ujian), 'FULL_DAY')}
          </span>
        ),
      },
      {
        Header: 'Waktu Ujian',
        accessor: (row) => [row.waktu_mulai, row.waktu_selesai],
        className: 'capitalize w-full',
        Cell: ({
          value: [waktu_mulai, waktu_selesai],
        }: Cell<Jadwal, [string, string]>) => (
          <span className=''>
            {`${formatLocale(parseTimeFromAPI(waktu_mulai), 'FULL_TIME')} - 
            ${formatLocale(parseTimeFromAPI(waktu_selesai), 'FULL_TIME')}`}
          </span>
        ),
      },
      {
        Header: 'Aksi',
        accessor: (row) => [row],
        Cell: ({ value: [jadwal] }: Cell<Jadwal, [Jadwal]>) => (
          <JadwalAction data={jadwal} mutate={mutate} />
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
      <Seo templateTitle='Jadwal' />
      <MenuHeader headerVariant='pemesanan'>
        <MenuHeader.Heading>Data Jadwal</MenuHeader.Heading>
        <MenuHeader.Subheading>
          Berikut ini merupakan daftar Jadwal
        </MenuHeader.Subheading>
        <MenuHeader.ButtonGroup>
          <MenuHeader.ButtonChild href='/panitia/jadwal/tambah'>
            <span className='hidden sm:block'>Tambah Jadwal</span>
            <HiPlus size={20} />
          </MenuHeader.ButtonChild>
        </MenuHeader.ButtonGroup>
      </MenuHeader>
      <Table
        className='mt-12'
        data={jadwal}
        columns={columns}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default withAuth(IndexPage, 'panitia');
