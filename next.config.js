const Dotenv = require('dotenv-webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
};

module.exports = nextConfig;
