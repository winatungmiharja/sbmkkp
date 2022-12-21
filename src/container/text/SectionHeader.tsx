import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SectionHeaderProps = React.ComponentPropsWithoutRef<'div'>;
type HeadingProps = React.ComponentPropsWithoutRef<'h2'>;
type SubheadingProps = React.ComponentPropsWithoutRef<'p'>;

function SectionHeaderRoot({
  className,

  ...rest
}: SectionHeaderProps) {
  return <div className={clsxm('flex flex-col gap-1', className)} {...rest} />;
}

function Heading({ className, ...rest }: HeadingProps) {
  return (
    <h2
      className={clsxm(
        'max-w-max p font-normal',

        className
      )}
      {...rest}
    />
  );
}

function Subheading({ className, ...rest }: SubheadingProps) {
  return (
    <p
      className={clsxm(
        'max-w-max text-gray-600 text-xs',

        className
      )}
      {...rest}
    />
  );
}

const SectionHeader = Object.assign(SectionHeaderRoot, { Heading, Subheading });
export default SectionHeader;
