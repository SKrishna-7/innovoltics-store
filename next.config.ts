
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Allow Cloudinary images
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com", // Allow Brave Search images
      },
      {
        protocol:"https",
        hostname:"example.com"
      }
      
    ],
  }
  
};

module.exports = nextConfig;
