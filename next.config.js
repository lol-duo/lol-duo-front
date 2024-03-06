/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    i18n: {
        locales: ['en', 'ko'],
        defaultLocale: 'ko',
    },
    env: {
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        SOLO_API_URL: process.env.NEXT_PUBLIC_SOLO_API_URL,
        SUGGESTION_API_URL: process.env.NEXT_PUBLIC_SUGGESTION_API_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "d3b83p9ttz58gf.cloudfront.net"
            },
        ],
        formats: ['image/webp'],
    }
}

module.exports = nextConfig