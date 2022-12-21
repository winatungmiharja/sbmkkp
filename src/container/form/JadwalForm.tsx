import React from 'react';
import { useFormContext } from 'react-hook-form';

import { parseTimeFromAPI } from '@/lib/date';

import DatePicker from '@/components/forms/DatePicker';
import SelectInput from '@/components/forms/SelectInput';
import TextArea from '@/components/forms/TextArea';

import { timeOption } from '@/constant/form';

export default function JadwalForm() {
  const { watch } = useFormContext();
  return (
    <div className='grid gap-4 w-full'>
      <DatePicker
        label='Tanggal Ujian'
        id='tanggal_ujian'
        validation={{
          required: 'Tanggal Ujian  harus diisi',
        }}
      />
      <TextArea
        label='Lokasi Ujian'
        id='lokasi_ujian'
        validation={{
          required: 'Lokasi Ujian  harus diisi',
        }}
      />

      <div className='grid grid-cols-2 gap-4'>
        <SelectInput
          id='waktu_mulai'
          label='Waktu Mulai'
          validation={{
            required: 'Waktu Mulai harus diisi',
          }}
        >
          {timeOption.map(
            ({ value, title, id }) =>
              id < timeOption.length && (
                <option key={value} value={value}>
                  {title}
                </option>
              )
          )}
        </SelectInput>
        <SelectInput
          id='waktu_selesai'
          label='Waktu Selesai'
          validation={{
            required: 'Waktu Selesai harus diisi',
          }}
        >
          {timeOption.map((item) => (
            <React.Fragment key={item.id}>
              {parseTimeFromAPI(item.value) >
                parseTimeFromAPI(watch('waktu_mulai')) && (
                <option value={item.value}>{item.title}</option>
              )}
            </React.Fragment>
          ))}
        </SelectInput>
      </div>
    </div>
  );
}
