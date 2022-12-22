import * as React from 'react';
import { HiPrinter } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';
import { handlePrint } from '@/lib/print-page';

import Button from '@/components/buttons/Button';

type PrintButtonProps = React.ComponentPropsWithoutRef<'div'>;

export default function PrintButton({ className, ...rest }: PrintButtonProps) {
  return (
    <div
      className={clsxm('mt-4 flex justify-start print:hidden', className)}
      {...rest}
    >
      <Button
        onClick={handlePrint}
        className='inline-flex gap-2 my-2'
        type='button'
      >
        <HiPrinter />
        <span>Cetak</span>
      </Button>
    </div>
  );
}
