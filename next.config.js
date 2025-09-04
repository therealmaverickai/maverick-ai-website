/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable output file tracing warning
  outputFileTracingRoot: __dirname,
  
  // Optimize for Vercel deployment
  experimental: {
    serverComponentsExternalPackages: ['prisma', '@prisma/client']
  }
}

module.exports = nextConfig