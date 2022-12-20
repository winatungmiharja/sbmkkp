import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <Layout withDashboardShell={false}>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center text-black'>
            <RiAlarmWarningFill
              size={60}
              className='animate-flicker drop-shadow-glow text-red-500'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>
              Halaman tidak ditemukan
            </h1>
            <ArrowLink className='mt-4 md:text-lg' href='/' direction='left'>
              Kembali ke halaman utama
            </ArrowLink>
          </div>
        </section>
      </main>
    </Layout>
  );
}
