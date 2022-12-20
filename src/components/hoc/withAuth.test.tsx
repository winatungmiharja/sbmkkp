import { render, screen } from '@testing-library/react';
import * as nextRouter from 'next/router';

import withAuth from '@/components/hoc/withAuth';

import useAuthStore from '@/store/useAuthStore';

const useRouter = jest.spyOn(nextRouter, 'useRouter');

describe('withAuth hoc should work correctly', () => {
  const replace = jest.fn(() => Promise.resolve(true));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useRouter.mockReturnValue({
    query: {},
    asPath: '/pendaftar',
    replace,
  });

  it('should return loading screen then redirect to login page if unauthenticated', async () => {
    const mockComponent = jest.fn(() => null);
    const Component = withAuth(mockComponent, 'pendaftar');

    render(<Component />);

    const heading = screen.getByText(/loading/i);

    expect(heading).toBeInTheDocument();
    expect(replace).toHaveBeenCalledWith(
      '/masuk/pendaftar?redirect=/pendaftar',
      '/masuk/pendaftar'
    );
  });

  it('should return loading screen then redirect to its role page if role is different', async () => {
    const useIsAuthenticated = jest.spyOn(useAuthStore, 'useIsAuthenticated');
    const useIsLoading = jest.spyOn(useAuthStore, 'useIsLoading');

    useIsAuthenticated.mockReturnValue(true);
    useIsLoading.mockReturnValue(false);

    const mockComponent = jest.fn(() => null);
    const Component = withAuth(mockComponent, 'pendaftar');

    render(<Component />);

    const heading = screen.getByText(/loading/i);

    expect(heading).toBeInTheDocument();
  });
});
