/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  images: {
    domains: [
      // For login background image
      'images.unsplash.com',
      'unsplash.com',
      // temporary dummy avatar
      'avatars.dicebear.com',
      'firebasestorage.googleapis.com',
    ],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/masuk/pendaftar',
        permanent: true,
      },
    ];
  },
};
