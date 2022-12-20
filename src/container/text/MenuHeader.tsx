import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Button, { ButtonProps } from '@/components/buttons/Button';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink, { ButtonLinkProps } from '@/components/links/ButtonLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import { UnstyledLinkProps } from '@/components/links/UnstyledLink';

enum HeaderVariant {
  'barang',
  'karyawan',
  'pembeli',
  'pemesanan',
  'peralatan',
  'transaksi',
}

type VariantProps = {
  headerVariant?: keyof typeof HeaderVariant;
};

type MenuHeaderProps = VariantProps & React.ComponentPropsWithoutRef<'div'>;
type HeadingProps = React.ComponentPropsWithoutRef<'h1'>;
type SubheadingProps = React.ComponentPropsWithoutRef<'h2'>;
type ButtonGroupProps = React.ComponentPropsWithoutRef<'div'>;
type ButtonChildProps = ButtonLinkProps;
type BackLinkProps = {
  direction?: 'left' | 'right';
} & UnstyledLinkProps;
type BackButtonProps = { direction?: 'left' | 'right' } & VariantProps &
  ButtonProps;

function MenuHeaderRoot({
  headerVariant = 'barang',
  className,
  children,
  ...rest
}: MenuHeaderProps) {
  return (
    <div
      className={clsxm(
        'bg-right-top bg-cover bg-no-repeat',
        'px-8 py-8 md:flex-row md:py-12',
        'rounded-lg shadow-sm',
        'relative flex',
        className
      )}
      style={{ backgroundImage: `url(/images/bg/${headerVariant}.jpg)` }}
      {...rest}
    >
      <div className='z-10 w-full h-full'>{children}</div>
      <div className='bg-primary-100/80 absolute inset-0 rounded-lg sm:bg-transparent'></div>
    </div>
  );
}

function Heading({ className, ...rest }: HeadingProps) {
  return (
    <h1
      className={clsxm(
        'bg-gradient-to-r via-black to-black bg-clip-text text-transparent',
        'from-primary-500',
        className
      )}
      {...rest}
    />
  );
}

function Subheading({ className, ...rest }: SubheadingProps) {
  return <h2 className={clsxm('p mt-2 font-normal', className)} {...rest} />;
}

function ButtonGroup({ className, ...rest }: ButtonGroupProps) {
  return (
    <div
      className={clsxm(
        'absolute bottom-0 flex gap-2 right-8 translate-y-1/2 ',
        className
      )}
      {...rest}
    />
  );
}

function ButtonChild({ className, ...rest }: ButtonChildProps) {
  return (
    <ButtonLink
      className={clsxm(
        'gap-2 h-fit',
        'bg-primary-600 hover:bg-primary-700 border-primary-600 active:bg-primary-700',
        className
      )}
      {...rest}
    />
  );
}

function BackLink({ children, href, className, ...rest }: BackLinkProps) {
  return (
    <ArrowLink
      href={href}
      as={PrimaryLink}
      direction='left'
      className={clsxm(
        'absolute left-0 top-0',
        'px-4 py-2 rounded-br-md rounded-tl-lg',
        'bg-primary-200/50 hover:bg-primary-200/80 active:bg-primary-200',
        className
      )}
      {...rest}
    >
      {children}
    </ArrowLink>
  );
}

function BackButton({
  direction = 'left',
  children,
  className,
  ...rest
}: BackButtonProps) {
  return (
    <Button
      variant='ghost'
      className={clsxm(
        'gap-[0.25em] ',
        'absolute left-0 top-0 rounded-none',
        'px-4 py-2 rounded-br-md rounded-tl-lg',
        direction === 'left' && 'flex-row-reverse',
        'from-primary-500',
        'bg-primary-200/50 hover:bg-primary-200/80 active:bg-primary-200',
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      <svg
        viewBox='0 0 16 16'
        height='1em'
        width='1em'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={clsxm(
          'relative',
          'transition-transform duration-200',
          direction === 'right' ? 'motion-safe:-translate-x-1' : 'rotate-180',
          'group-hover:translate-x-0'
        )}
      >
        <path
          fill='currentColor'
          d='M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z'
        />
        <path
          stroke='currentColor'
          d='M1.75 8H11'
          strokeWidth='1.5'
          strokeLinecap='round'
          className={clsxm(
            'transition-all duration-200 origin-left',
            'opacity-0 motion-safe:-translate-x-1',
            'group-hover:opacity-100 group-hover:translate-x-0'
          )}
        />
      </svg>
    </Button>
  );
}

const MenuHeader = Object.assign(MenuHeaderRoot, {
  Heading,
  Subheading,
  ButtonGroup,
  ButtonChild,
  BackLink,
  BackButton,
});
export default MenuHeader;
