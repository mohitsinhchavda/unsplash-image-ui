module.exports = {
  reactStrictMode: true,
  images : {
    domains : ['images.unsplash.com']
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
