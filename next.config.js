/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "i.scdn.co"],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
