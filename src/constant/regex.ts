export const EMAIL_REGEX = {
  value:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: 'Email tidak valid',
};
export const PHONE_REGEX = {
  value: /^\+628[1-9][0-9]{7,11}$/,
  message:
    'Nomor telepon harus diawali +62 dan memiliki panjang 13-15 karakter',
};
export const WHOLE_NUMBER_REGEX = {
  value: /^[0-9]*$/,
  message: 'Harus berupa bilangan bulat',
};
export const DECIMAL_NUMBER_REGEX = {
  value: /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]*\.[0-9]*[1-9][0-9]*)$/,
  message: 'Harus berupa bilangan bulat atau desimal dipisah dengan titik (.)',
};
