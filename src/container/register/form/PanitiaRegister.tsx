import React from 'react';

import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';

export default function PanitiaRegister({
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
        id='nomor_telepon'
        label='Nomor Telepon'
        helperText='contoh : 081234567890'
        validation={{ required: 'Nomor Telepon harus diisi' }}
        readOnly={readOnly}
      />
    </React.Fragment>
  );
}
