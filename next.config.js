


/** @type {import('next').NextConfig} */


const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'i.scdn.co',
    ],
  },


  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {

    ignoreDuringBuilds: true,
  },



}

module.exports = nextConfig
