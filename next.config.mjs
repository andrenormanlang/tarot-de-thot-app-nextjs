/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com'],
        domains: ['res.cloudinary.com'],
    },
    async headers() {
        return [
        {
            source: '/(.*)',
            headers: [
            {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN',
            },
            ],
        },
        ];
    },
};

export default nextConfig;
