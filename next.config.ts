import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ciwibpibmllbetetsqyi.supabase.co',
      },
    ],
  },
};

export default nextConfig;
