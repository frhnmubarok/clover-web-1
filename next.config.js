module.exports = {
  reactStrictMode: true,
  async redirects() {
    return require('./redirects.json');
  },
};
