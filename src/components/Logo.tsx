import * as React from 'react';

import clsxm from '@/lib/clsxm';

import NextImage from '@/components/NextImage';

type LogoProps = { className?: string };

export default function Logo({ className }: LogoProps) {
  return (
    <NextImage
      className={clsxm('w-20', className)}
      src='/images/logo.png'
      width={1080}
      height={1080}
      alt='logo'
    />
  );
}
