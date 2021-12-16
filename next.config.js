module.exports = {
  reactStrictMode: true,
  async redirects() {
    return require("./redirects.json");
  },
  images: {
    domains: ["images.unsplash.com", "api-clover.herokuapp.com", "localhost"],
  },
};
