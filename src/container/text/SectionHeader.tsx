import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SectionHeaderProps = {
  show?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;
type HeadingProps = {
  isLoading: boolean;
} & React.ComponentPropsWithoutRef<'h2'>;
type SubheadingProps = {
  isLoading: boolean;
} & React.ComponentPropsWithoutRef<'p'>;

function SectionHeaderRoot({
  className,
  show = true,
  ...rest
}: SectionHeaderProps) {
  return (
    <div
      className={clsxm('flex flex-col gap-1', className, { hidden: !show })}
      {...rest}
    />
  );
}

function Heading({ className, isLoading, ...rest }: HeadingProps) {
  return (
    <h2
      className={clsxm(
        'max-w-max p font-normal',
        {
          'bg-gray-200 rounded-full leading-tight text-gray-200 animate-pulse select-none':
            isLoading,
        },
        className
      )}
      {...rest}
    />
  );
}

function Subheading({ className, isLoading, ...rest }: SubheadingProps) {
  return (
    <p
      className={clsxm(
        'max-w-max text-gray-600 text-xs',
        {
          'bg-gray-100 rounded-full text-gray-100 animate-pulse select-none whitespace-nowrap overflow-hidden':
            isLoading,
        },
        className
      )}
      {...rest}
    />
  );
}

const SectionHeader = Object.assign(SectionHeaderRoot, { Heading, Subheading });
export default SectionHeader;
