export const DEFAULT_TOAST_MESSAGE = {
  loading: 'Loading...',
  success: 'Berhasil',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (err: any) =>
    typeof err?.response?.data?.message === 'string'
      ? err?.response?.data?.message
      : JSON.stringify(err?.response?.data?.message) ||
        'Terjadi kesalahan, mohon coba beberapa saat lagi',
};
