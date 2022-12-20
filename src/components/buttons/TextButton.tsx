import * as React from 'react';

import clsxm from '@/lib/clsxm';

export type TextButtonProps = React.ComponentPropsWithoutRef<'button'>;

export default function TextButton({
  children,
  className,
  type = 'button',
  ...rest
}: TextButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={clsxm(
        'inline-flex items-center',
        'font-medium text-primary-600 hover:text-primary-500',
        'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        className
      )}
    >
      {children}
    </button>
  );
}
