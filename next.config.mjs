/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_PREFIX: process.env.API_PREFIX,
        WEB_NAME: process.env.WEB_NAME,
        WEB_TITLE: process.env.WEB_TITLE,
        WEB_DESCRIPTION: process.env.WEB_DESCRIPTION,
        WEB_KEYWORDS: process.env.WEB_KEYWORDS,
    }
};

export default nextConfig;
