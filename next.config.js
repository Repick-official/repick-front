/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    KAKAO_API_KEY: process.env.KAKAO_API_KEY,
    KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
  },
  images: {
    domains: ['repick-s3-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
