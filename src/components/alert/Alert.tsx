import * as React from 'react';
import { HiExclamation } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

type AlertProps = {
  variant: 'warning';
} & React.ComponentPropsWithoutRef<'div'>;

export default function Alert({ className, children, variant }: AlertProps) {
  return (
    <div className={clsxm('p-4 w-full bg-yellow-50 rounded-md', className)}>
      <div className='flex'>
        <div className='flex-shrink-0'>
          {variant === 'warning' && (
            <HiExclamation
              className='w-5 h-5 text-yellow-400'
              aria-hidden='true'
            />
          )}
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-medium text-yellow-800'>{children}</h3>
        </div>
      </div>
    </div>
  );
}
