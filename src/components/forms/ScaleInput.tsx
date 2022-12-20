import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { HiMinus, HiPlus } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Input, { InputProps } from '@/components/forms/Input';

import { WHOLE_NUMBER_REGEX } from '@/constant/regex';

type ScaleInputProps = {
  step?: number;
  range?: {
    min: number;
    max: number;
  };
} & InputProps;

export default function ScaleInput({
  step = 10,
  unit = '%',
  range = {
    min: 0,
    max: 100,
  },
  label,
  id,
  className,
  ...rest
}: ScaleInputProps) {
  const { setValue, watch } = useFormContext();

  //#region  //*=========== Plus Minus Logic ===========
  const currentValue: unknown = watch(id);
  const handleStep = (mode: 'plus' | 'minus') => {
    let newValue = 0;

    if (typeof currentValue !== 'number') {
      newValue = mode === 'plus' ? range.min : 0;
    } else {
      newValue = mode === 'plus' ? currentValue + step : currentValue - step;

      if (newValue > range.max) {
        newValue = range.max;
      } else if (newValue < range.min) {
        newValue = range.min;
      }
    }

    setValue(id, newValue, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  //#endregion  //*======== Plus Minus Logic ===========

  return (
    <div className={clsxm('flex gap-1 items-start', className)}>
      <Button
        onClick={() => handleStep('minus')}
        variant='light'
        type='button'
        className='!p-3 mt-6'
      >
        <span className='sr-only'>Minus value by {step}</span>
        <HiMinus />
      </Button>
      <Input
        {...rest}
        containerClassName='w-full'
        id={id}
        label={label}
        unit={unit}
        defaultValue={0}
        validation={{
          required: `${label} harus diisi`,
          pattern: WHOLE_NUMBER_REGEX,
          valueAsNumber: true,
          min: {
            value: range.min,
            message: `${label} tidak boleh kurang dari ${range.min}`,
          },
          max: {
            value: range.max,
            message: `${label} tidak boleh lebih dari ${range.max}`,
          },
        }}
      />
      <Button
        onClick={() => handleStep('plus')}
        variant='light'
        type='button'
        className='!p-3 mt-6'
      >
        <span className='sr-only'>Plus value by {step}</span>
        <HiPlus />
      </Button>
    </div>
  );
}
