module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return require('./redirects.json');
  },
  images: {
    domains: ['images.unsplash.com', 'api-clover.herokuapp.com', 'localhost'],
  },
};
