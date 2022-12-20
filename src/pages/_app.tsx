import { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { SWRConfig } from 'swr';

import 'react-quill/dist/quill.snow.css';
import '@/styles/globals.css';
import '@/styles/nprogress.css';

import axiosClient from '@/lib/axios';

import DismissableToast from '@/components/DismissableToast';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <DismissableToast />

      <SWRConfig
        value={{
          fetcher: (url) => axiosClient.get(url).then((res) => res.data),
        }}
      >
        <Component {...pageProps} key={router.asPath} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
