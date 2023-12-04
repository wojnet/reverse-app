const million = require("million/compiler");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      }
    ]
  }
}

const millionConfig = {
    auto: true
}

module.exports = million.next(
    nextConfig,
    millionConfig
);

// module.exports = nextConfig;