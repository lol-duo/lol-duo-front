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
    },
    images: {
        domains: ["s3.ap-northeast-2.amazonaws.com"]
    }
}

module.exports = nextConfig
