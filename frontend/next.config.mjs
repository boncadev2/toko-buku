/** @type {import('next').NextConfig} */
const nextConfig = {
   // Diubah ke export untuk persiapan deploy ke Shared Hosting
   output: "export",
   // Matikan image optimization bawaan next.js karena tidak didukung di mode export statis
   images: {
      unoptimized: true,
   }
};

export default nextConfig;
