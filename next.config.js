/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en', 'ko'],
        defaultLocale: 'en',
    },
    env: {
        IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        SOLO_API_URL: process.env.NEXT_PUBLIC_SOLO_API_URL,
    },
    images: {
        domains: ["s3.ap-northeast-2.amazonaws.com"]
    }
}

module.exports = nextConfig
