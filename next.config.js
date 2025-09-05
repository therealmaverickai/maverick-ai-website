/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable output file tracing warning
  outputFileTracingRoot: __dirname,
  
  // Optimize for Vercel deployment
  serverExternalPackages: ['prisma', '@prisma/client'],
  
  // Fix pdf-parse and tiktoken build issues
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude problematic packages
      config.externals.push({
        'pdf-parse': 'pdf-parse',
        'canvas': 'canvas'
      })
    }
    
    // Handle WASM files and fallbacks
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      canvas: false
    }
    
    // Fix tiktoken WASM loading issues
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    
    // Copy WASM files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    })
    
    return config
  }
}

module.exports = nextConfig