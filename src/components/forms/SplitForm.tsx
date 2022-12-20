import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SplitFormProps = React.ComponentPropsWithoutRef<'div'>;
type TitleProps = React.ComponentPropsWithoutRef<'p'>;
type FormsProps = React.ComponentPropsWithoutRef<'div'>;

function SplitFormRoot({ className, ...rest }: SplitFormProps) {
  return (
    <div
      className={clsxm('py-4 lg:flex lg:gap-4 lg:items-center', className)}
      {...rest}
    />
  );
}

function Title({ className, ...rest }: TitleProps) {
  return (
    <p
      className={clsxm(
        'pb-2 font-medium text-center text-gray-800 border-b border-gray-200',
        'lg:min-w-[15rem] lg:pb-0 lg:text-left lg:border-b-0 xl:min-w-[30rem]',
        className
      )}
      {...rest}
    />
  );
}

function Forms({ className, ...rest }: FormsProps) {
  return (
    <div className={clsxm('flex-grow mt-2 lg:mt-0', className)} {...rest} />
  );
}

const SplitForm = Object.assign(SplitFormRoot, { Title, Forms });
export default SplitForm;
