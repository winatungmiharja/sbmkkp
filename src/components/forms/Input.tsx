import clsx from 'clsx';
import { get } from 'lodash';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export type InputProps = {
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
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
  /** Unit for input, will remove error icon */
  unit?: string;
  /** className for div container */
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  label,
  placeholder = '',
  helperText,
  id,
  type = 'text',
  readOnly = false,
  hideError = false,
  validation,
  unit,
  containerClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className={containerClassName}>
      <label
        htmlFor={id}
        className='block text-sm font-normal text-gray-700 truncate'
      >
        {label}
      </label>
      <div className={clsx(label !== '' && 'mt-1', 'relative')}>
        <input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          className={clsx(
            readOnly
              ? 'bg-gray-100 focus:ring-0 cursor-not-allowed border-gray-300 focus:border-gray-300'
              : error
              ? 'focus:ring-red-500 border-red-500 focus:border-red-500'
              : 'focus:ring-primary-500 border-gray-300 focus:border-primary-500',
            'block w-full rounded-md shadow-sm'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        {unit && (
          <div
            className={clsx(
              'flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none',
              'text-sm',
              error ? 'text-red-500' : 'text-gray-500'
            )}
          >
            {unit}
          </div>
        )}
        {!unit && !hideError && error && (
          <div className='flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
      </div>
      {/* If there is helper text, or no hideError, then render*/}
      {(helperText || !hideError) && (
        <div className='mt-1'>
          {helperText && <p className='text-xs text-gray-500'>{helperText}</p>}
          {!hideError && error && (
            <span className='text-sm text-red-500'>{error.message}</span>
          )}
        </div>
      )}
    </div>
  );
}
