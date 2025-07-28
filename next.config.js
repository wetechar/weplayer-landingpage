/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        // Configuraciones experimentales de Next.js
    },
    // Suprimir warnings de hidratación en desarrollo
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },
    // Configuración para mejorar la estabilidad
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    // Configuración de imágenes
    images: {
        domains: [],
        unoptimized: false,
    },
    // Configuración de headers
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig; 