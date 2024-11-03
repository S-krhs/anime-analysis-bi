/** @type {import('next').NextConfig} */

module.exports = nextConfig = {
  cacheHandler: require.resolve(
    'next/dist/server/lib/incremental-cache/file-system-cache.js',
  ),
}
