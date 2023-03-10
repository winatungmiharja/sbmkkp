import React from 'react';

import { exactLength, REGEX } from '@/lib/formUtils';

import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import SelectInput from '@/components/forms/SelectInput';

import { educationOption, genderOption } from '@/constant/form';

export default function PendaftarRegister({
  includePassword = true,
  readOnly = false,
}: {
  includePassword?: boolean;
  readOnly?: boolean;
}) {
  return (
    <React.Fragment>
      <Input
        id='nama'
        label='Nama'
        validation={{ required: 'Nama harus diisi' }}
        readOnly={readOnly}
      />
      <Input
        id='email'
        label='Email'
        validation={{ required: 'Email harus diisi' }}
        readOnly={readOnly}
      />
      {includePassword && (
        <PasswordInput
          id='password'
          label='Password'
          validation={{ required: 'Password harus diisi' }}
          readOnly={readOnly}
        />
      )}
      <Input
        id='nik'
        label='NIK'
        placeholder='Masukkan 16 digit NIK'
        validation={{
          required: 'NIK harus diisi',
          pattern: {
            value: REGEX.NUMBER_ONLY,
            message: 'NIK harus berupa angka',
          },
          ...exactLength(16, 'Panjang NIK harus 16 digit'),
        }}
        readOnly={readOnly}
      />
      <Input
        id='nomor_telepon'
        label='Nomor Telepon'
        helperText='contoh : 081234567890'
        validation={{ required: 'Nomor Telepon harus diisi' }}
        readOnly={readOnly}
      />

      <SelectInput
        id='jenis_kelamin'
        label='Jenis Kelamin'
        validation={{
          required: 'Jenis Kelamin harus diisi',
        }}
        readOnly={readOnly}
      >
        {genderOption.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </SelectInput>

      <SelectInput
        id='edukasi'
        label='Edukasi terakhir'
        validation={{
          required: 'Edukasi terakhir harus diisi',
        }}
        readOnly={readOnly}
      >
        {educationOption.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </SelectInput>

      <div className='grid grid-cols-2 gap-4'>
        <Input
          id='tempat_lahir'
          label='Tempat Lahir'
          validation={{ required: 'Tempat lahir harus diisi' }}
          readOnly={readOnly}
        />
        <DatePicker
          id='tanggal_lahir'
          label='Tanggal Lahir'
          placeholder='dd/mm/yyyy'
          maxDate={new Date()}
          validation={{ required: 'Tanggal lahir harus diisi' }}
          readOnly={readOnly}
        />
      </div>
    </React.Fragment>
  );
}
