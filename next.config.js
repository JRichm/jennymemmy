/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        apiBodySizeLimit: '10mb',
    }
}

module.exports = nextConfig
