// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "comfy-deploy-output.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
