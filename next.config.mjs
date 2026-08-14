/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: '/Story-book-',
  assetPrefix: '/Story-book-',
};

export default nextConfig;
