export const genderOption = [
  {
    value: 'pria',
    name: 'Pria',
  },
  {
    value: 'perempuan',
    name: 'Wanita',
  },
];

export const educationOption = [
  'SMA / SEDERAJAT',
  'DIPLOMA I / II',
  'AKADEMI/ DIPLOMA III/S. MUDA',
  'DIPLOMA IV/ STRATA I',
  'STRATA II',
  'STRATA III',
];

export const paymentMethodOption = [
  {
    name: 'Bank',
    options: [
      'Bank Mandiri',
      'BRI',
      'BNI',
      'Panin Bank',
      'BCA',
      'CIMB Niaga',
      'Bank Permata',
      'OCBC NISP',
    ],
  },
  {
    name: 'E-Money',
    options: ['Dana', 'Gopay', 'OVO', 'ShopeePay', 'LinkAja'],
  },
];

export const VIEW_STATE = [
  {
    name: 'Proses',
    url: '/transaction/view-pending',
  },
  {
    name: 'Selesai',
    url: '/transaction/view-confirmed',
  },
  { name: 'Dibatalkan', url: '/transaction/view-cancelled' },
];
