import React from 'react';

import PanitiaRegister from './form/PanitiaRegister';
import PendaftarRegister from './form/PendaftarRegister';

import { Role } from '@/types/api';

export default function RegisterFactory({ role }: { role: keyof typeof Role }) {
  return (
    <div className='max-h-max overflow-y-auto px-2 py-4 space-y-6 w-full rounded-md shadow-inner sm:max-h-[50vh]'>
      {(() => {
        switch (role) {
          case 'panitia':
            return <PanitiaRegister />;
          case 'pendaftar':
            return <PendaftarRegister />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
