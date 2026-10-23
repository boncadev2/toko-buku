/** @type {import('next').NextConfig} */
const isSharedHostingExport = process.env.OUTPUT_EXPORT === "true";

const nextConfig = {
   // Aktifkan export hanya jika dipanggil untuk shared hosting (OUTPUT_EXPORT=true)
   ...(isSharedHostingExport ? { output: "export" } : {}),
   images: {
      unoptimized: true,
   },
   typescript: {
      ignoreBuildErrors: true,
   },
};

export default nextConfig;
