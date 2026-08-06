/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/answer-signal",
        destination: "/ai-search-visibility",
        permanent: true,
      },
      {
        source: "/answersignal",
        destination: "/ai-search-visibility",
        permanent: true,
      },
      {
        source: "/answer_signal",
        destination: "/ai-search-visibility",
        permanent: true,
      },
      {
        source: "/compare/answersignal-vs-traditional-seo-reporting",
        destination: "/compare/ai-search-visibility-vs-traditional-seo-reporting",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
