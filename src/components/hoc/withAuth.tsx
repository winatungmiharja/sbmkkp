import { useRouter } from 'next/router';
import * as React from 'react';
import { ImSpinner8 } from 'react-icons/im';

import axiosClient from '@/lib/axios';

import { ROLES } from '@/constant/roles';
import useAuthStore from '@/store/useAuthStore';

import { ApiReturn } from '@/types/api';
import { User } from '@/types/auth';

export interface WithAuthProps {
  user: User;
}

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */
export default function withAuth<T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
  routeRole: 'auth' | typeof ROLES[number]
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { query } = router;

    //#region  //*=========== STORE ===========
    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();
    //#endregion  //*======== STORE ===========

    React.useEffect(() => {
      const loadUser = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            return;
          }
          const res = await axiosClient.post<ApiReturn<User>>(
            '/auth/check-account',
            {
              token: token,
            }
          );
          login({
            ...res.data.data,
            token: token + '',
          });
        } catch (err) {
          localStorage.removeItem('token');
        } finally {
          stopLoading();
        }
      };

      loadUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          // Prevent authenticated user from accessing auth or other role pages
          if (routeRole === 'auth' || routeRole !== user?.role) {
            if (query?.redirect) {
              router.push(query.redirect as string);
            } else if (user?.role === 'panitia') {
              router.replace('/panitia');
            } else if (user?.role === 'pendaftar') {
              router.replace('/pendaftar');
            }
          }
          // Prevent unauthenticated user from accessing protected pages
        } else {
          if (routeRole !== 'auth') {
            /** ROLES_ID */
            let routeRole = router.asPath.split('/')[1];

            // If routeRole is not found, then fallback to pelatih
            if (ROLES.findIndex((role) => role === routeRole) === -1)
              routeRole = 'pendaftar';

            router.replace(
              `/masuk/${routeRole}?redirect=${router.asPath}`,
              `/masuk/${routeRole}`
            );
          }
        }
      }
    }, [isAuthenticated, isLoading, query, router, user]);

    if (
      // If authenticated user want to access auth or other role pages
      ((isLoading || isAuthenticated) &&
        (routeRole === 'auth' || routeRole !== user?.role)) ||
      // If unauthenticated user want to access protected pages
      ((isLoading || !isAuthenticated) && routeRole !== 'auth')
    ) {
      return (
        <div className='flex flex-col justify-center items-center min-h-screen text-gray-800'>
          <ImSpinner8 className='mb-4 text-4xl animate-spin' />
          <p>Loading...</p>
        </div>
      );
    }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
