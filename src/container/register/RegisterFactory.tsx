import React from 'react';

import clsxm from '@/lib/clsxm';

import PanitiaRegister from './form/PanitiaRegister';
import PendaftarRegister from './form/PendaftarRegister';

import { Role } from '@/types/api';

export default function RegisterFactory({
  role,
  includePassword = true,
  readOnly = false,
}: {
  role: keyof typeof Role;
  includePassword?: boolean;
  readOnly?: boolean;
}) {
  return (
    <div
      className={clsxm(
        'max-h-max overflow-y-auto px-2 py-4 rounded-md shadow-inner space-y-6 w-full sm:max-h-[50vh]',
        readOnly && 'cursor-not-allowed'
      )}
    >
      {(() => {
        switch (role) {
          case 'panitia':
            return (
              <PanitiaRegister
                includePassword={includePassword}
                readOnly={readOnly}
              />
            );
          case 'pendaftar':
            return (
              <PendaftarRegister
                includePassword={includePassword}
                readOnly={readOnly}
              />
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}
