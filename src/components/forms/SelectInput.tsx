import clsx from 'clsx';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export type SelectInputProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Manual validation using RHF */
  validation?: RegisterOptions;
  /** Contain all option for the input */
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'select'>;

export default function SelectInput({
  label,
  helperText,
  id,
  placeholder,
  readOnly = false,
  children,
  validation,
  ...rest
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(id);

  // Add disabled and selected attribute to option, will be used if readonly
  const readOnlyChildren = React.Children.map<React.ReactNode, React.ReactNode>(
    children,
    (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          // selected: child.props.value === rest?.defaultValue,
          disabled: child.props.value !== rest?.defaultValue,
        });
      }
    }
  );

  return (
    <div>
      <label htmlFor={id} className='block text-sm font-normal text-gray-700'>
        {label}
      </label>
      <div className='relative mt-1'>
        <select
          {...register(id, validation)}
          // defaultValue to value blank, will get overriden by ...rest if needed
          defaultValue=''
          {...rest}
          name={id}
          id={id}
          disabled={readOnly}
          className={clsx(
            readOnly
              ? 'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0'
              : errors[id]
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
            'block w-full rounded-md shadow-sm',
            { 'text-gray-500': value === '' }
          )}
          aria-describedby={id}
        >
          {placeholder && (
            <option value='' hidden>
              {placeholder}
            </option>
          )}
          {readOnly ? readOnlyChildren : children}
        </select>

        {errors[id] && (
          <div className='flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
      </div>
      <div className='mt-1'>
        {helperText && <p className='text-xs text-gray-500'>{helperText}</p>}
        {errors[id] && (
          <span className='text-sm text-red-500'>{errors[id].message}</span>
        )}
      </div>
    </div>
  );
}
