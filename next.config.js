
const { i18n } = require('./next-i18next.config')


/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')();
const routesByLocale = require('./routesByLocale.json');


const nextConfig = {
  // i18n: {
  //   defaultLocale: "en",
  //   shouldRedirectToBrowserLocale: true,
  //   locales: ["en", "id"],
  // },
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

  rewrites() {
    // Routes are set up for the default locale ("en") in the app. This
    // rewrites all non-English routes to their internal equivalent.
    // E.g. `/gitarren/gibson-les-paul` → `/guitars/gibson-les-paul`
    const locales = Object.keys(routesByLocale).filter(
      (locale) => locale !== 'en'
    );

    return locales.flatMap((locale) =>
      Object.entries(routesByLocale[locale])

        // No need to rewrite the root route
        .filter(([, routePath]) => routePath !== '/')

        // Rewrite the localized pathname to the equivalent route from "en"
        .map(([routeName, routePath]) => ({
          source: `/${locale}${routePath.source}`,
          destination: `/${locale}${routesByLocale.en[routeName].destination}`
        }))
    );
  }


}

module.exports = nextConfig
