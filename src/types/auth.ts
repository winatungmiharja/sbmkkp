import { ROLES } from '@/constant/roles';

export type User = {
  token: string;
  id: number;
  email: string;
} & (
  | {
      role: 'panitia';
    }
  | {
      role: 'pendaftar';
    }
);

export type ProtectedRoute = {
  path: string;
  type: 'auth' | 'all' | typeof ROLES[number];
};
