import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: rootDir,
  turbopack: { root: rootDir },
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  async redirects() {
    return [
      { source: '/main.html', destination: '/indexpage', permanent: true },
      { source: '/index.html', destination: '/indexpage', permanent: true },
      { source: '/event_dr.html', destination: '/events/birthday', permanent: true },
      { source: '/event_corp.html', destination: '/events/corporate', permanent: true },
      { source: '/event_graduation.html', destination: '/events/graduation', permanent: true },
    ];
  },
};

export default nextConfig;
