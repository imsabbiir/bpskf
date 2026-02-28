/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true, // you already have this
  images: {
    domains: ["i.ibb.co", "another-domain.com"], // add allowed hosts here
  },
};

export default nextConfig;
