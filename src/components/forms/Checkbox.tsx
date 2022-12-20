import clsx from 'clsx';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import clsxm from '@/lib/clsxm';

export type CheckboxProps = {
  /** Input label */
  label: string | null;
  name: string;
  /** Add value only if you're using grouped checkbox, omit value if using a single checkbox */
  value?: string | number;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>;

export default function Checkbox({
  label,
  name,
  value,
  placeholder = '',
  helperText,
  readOnly = false,
  hideError = false,
  validation,
  ...rest
}: CheckboxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div>
      <div className='flex gap-2 items-start'>
        <input
          {...register(name, validation)}
          {...rest}
          type='checkbox'
          name={name}
          id={`${name}_${value}`}
          value={value}
          disabled={readOnly}
          className={clsxm(
            // add top margin so the checkbox align with the text
            'mt-[0.25em]',
            'shrink-0',
            'rounded-sm border-2 border-typo focus:ring-0 border-gray-300',
            'checked:bg-primary-400 checked:hover:bg-primary-600 checked:focus:bg-primary-400 checked:active:bg-primary-700',
            readOnly &&
              'cursor-not-allowed bg-gray-100 disabled:checked:bg-primary-300',
            error && 'border-danger-400 bg-danger-100'
          )}
          placeholder={placeholder}
          aria-describedby={name}
        />
        <label
          className={clsx(
            'block text-sm font-normal text-gray-700',
            readOnly && 'cursor-not-allowed'
          )}
          htmlFor={`${name}_${value}`}
        >
          {label}
        </label>
      </div>
      <div className='mt-1'>
        {!(!hideError && error) && helperText && (
          <p className='text-xs text-gray-500'>{helperText}</p>
        )}
        {!hideError && error && (
          <span className='text-sm text-red-500'>{error?.message}</span>
        )}
      </div>
    </div>
  );
}
