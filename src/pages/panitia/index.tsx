import * as React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

function IndexPage() {
  return (
    <Layout>
      <Seo templateTitle='Index' />

      <h1>Index Panitia</h1>
    </Layout>
  );
}

export default withAuth(IndexPage, 'panitia');
