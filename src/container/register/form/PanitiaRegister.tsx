import React from 'react';

import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';

export default function PanitiaRegister() {
  return (
    <React.Fragment>
      <Input
        id='name'
        label='Nama'
        validation={{ required: 'Nama harus diisi' }}
      />
      <Input
        id='email'
        label='Email'
        validation={{ required: 'Email harus diisi' }}
      />
      <PasswordInput
        id='password'
        label='Password'
        validation={{ required: 'Password harus diisi' }}
      />
    </React.Fragment>
  );
}
