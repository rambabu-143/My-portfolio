/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    // Keep production builds from overwriting chunks used by the running dev server.
    distDir: isProd ? ".next" : ".next-dev",
    ...(isProd && {
        output: "export",
        basePath: "/My-portfolio",
        assetPrefix: "/My-portfolio",
    }),
    images: {
        unoptimized: true,
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: isProd ? "/My-portfolio" : "",
    },
};

export default nextConfig;
