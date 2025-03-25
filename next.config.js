const million = require("million/compiler");

let config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      }
    ]
  }
}

const millionConfig = {
    auto: true
}

if (process.env.USING_MILLION === "true") {
  config = million.next(
    nextConfig,
    millionConfig
  );
} else {
  config = nextConfig;
}

module.exports = config;