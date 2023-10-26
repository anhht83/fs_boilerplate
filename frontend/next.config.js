/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['./src'],
  },
  publicRuntimeConfig:{
    rootApi: process.env.NEXT_PUBLIC_ROOT_API,
  }
};

module.exports = nextConfig;
