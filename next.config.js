const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'defund-nova-police.s3.amazonaws.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'defund-nova-police.s3.us-east-1.amazonaws.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'staticg.sportskeeda.com',
            port: '',
            pathname: '/**',
          }
        ],
      },
    env: {
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      DOMAIN_PREFIX: process.env.DOMAIN_PREFIX,
      USER_SECRET: process.env.USER_SECRET,
      USER_NAME: process.env.USER_NAME,
      SITE_MAP: process.env.SITE_MAP
      }
}

module.exports = withNextIntl(nextConfig);
