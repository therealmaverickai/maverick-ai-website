/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable output file tracing warning
  outputFileTracingRoot: __dirname,
  
  // Optimize for Vercel deployment
  serverExternalPackages: ['prisma', '@prisma/client'],
  
  // Fix pdf-parse build issues
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude problematic pdf-parse test files
      config.externals.push({
        'pdf-parse': 'pdf-parse',
        'canvas': 'canvas'
      })
    }
    
    // Ignore pdf-parse test files
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      canvas: false
    }
    
    return config
  }
}

module.exports = nextConfig