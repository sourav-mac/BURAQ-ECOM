/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      if (config.optimization && config.optimization.minimizer) {
        config.optimization.minimizer.forEach((m) => {
          if (m && m.options && m.options.terserOptions) {
            m.options.terserOptions.format = {
              ...m.options.terserOptions.format,
              comments: false,
            };
            m.options.extractComments = false;
          }
        });
      }
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/services/electrical-trading",
        destination: "/products?sector=electrical",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
