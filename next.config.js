/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.google.com', 'links.papareact.com'],
  },
}

module.exports = nextConfig
