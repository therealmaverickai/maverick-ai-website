import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, access, unlink, readdir } from 'fs/promises'
import path from 'path'

// Create branding directory if it doesn't exist
const ensureBrandingDir = async () => {
  const brandingDir = path.join(process.cwd(), 'public', 'branding')
  try {
    await access(brandingDir)
  } catch {
    await mkdir(brandingDir, { recursive: true })
  }
  return brandingDir
}

// GET - Get current logo and favicon info
export async function GET() {
  try {
    const brandingDir = await ensureBrandingDir()
    const publicDir = path.join(process.cwd(), 'public')
    
    const branding = {
      logo: {
        current: null as string | null,
        available: [] as string[]
      },
      favicon: {
        current: null as string | null,
        available: [] as string[]
      }
    }

    // Check for current logo
    const logoExtensions = ['.svg', '.png', '.jpg', '.jpeg']
    for (const ext of logoExtensions) {
      const logoPath = path.join(publicDir, `logo${ext}`)
      try {
        await access(logoPath)
        branding.logo.current = `/logo${ext}`
        break
      } catch {}
    }

    // Check for current favicon files
    const faviconFiles = ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png']
    for (const file of faviconFiles) {
      try {
        await access(path.join(publicDir, file))
        branding.favicon.available.push(`/${file}`)
      } catch {}
    }

    // Get available branding files
    try {
      const files = await readdir(brandingDir)
      branding.logo.available = files
        .filter(file => /\.(svg|png|jpg|jpeg)$/i.test(file))
        .map(file => `/branding/${file}`)
      
      branding.favicon.available.push(...files
        .filter(file => /^favicon\./i.test(file) || file.includes('icon'))
        .map(file => `/branding/${file}`)
      )
    } catch {}

    return NextResponse.json({
      success: true,
      branding
    })
  } catch (error) {
    console.error('Error getting branding info:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to get branding information'
    }, { status: 500 })
  }
}

// POST - Upload logo or favicon
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'logo' or 'favicon'
    
    if (!file || !type) {
      return NextResponse.json({
        success: false,
        error: 'File and type are required'
      }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = {
      logo: ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg'],
      favicon: ['image/x-icon', 'image/vnd.microsoft.icon', 'image/svg+xml', 'image/png']
    }

    if (!allowedTypes[type as keyof typeof allowedTypes]?.includes(file.type)) {
      return NextResponse.json({
        success: false,
        error: `Invalid file type for ${type}. Allowed types: ${allowedTypes[type as keyof typeof allowedTypes]?.join(', ')}`
      }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const brandingDir = await ensureBrandingDir()
    const publicDir = path.join(process.cwd(), 'public')
    
    // Save to branding directory with timestamp
    const timestamp = Date.now()
    const extension = path.extname(file.name)
    const brandingFileName = `${type}_${timestamp}${extension}`
    const brandingFilePath = path.join(brandingDir, brandingFileName)
    
    await writeFile(brandingFilePath, buffer)
    
    // Also save as current active file in public directory
    let activeFileName: string
    if (type === 'logo') {
      activeFileName = `logo${extension}`
    } else {
      // For favicon, determine the appropriate name based on file type
      if (file.type.includes('icon') || extension === '.ico') {
        activeFileName = 'favicon.ico'
      } else if (extension === '.svg') {
        activeFileName = 'favicon.svg'
      } else if (extension === '.png') {
        activeFileName = file.name.includes('apple') ? 'apple-touch-icon.png' : 'favicon.png'
      } else {
        activeFileName = `favicon${extension}`
      }
    }
    
    const activeFilePath = path.join(publicDir, activeFileName)
    await writeFile(activeFilePath, buffer)

    return NextResponse.json({
      success: true,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`,
      files: {
        branding: `/branding/${brandingFileName}`,
        active: `/${activeFileName}`
      }
    })
  } catch (error) {
    console.error('Error uploading branding file:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to upload file'
    }, { status: 500 })
  }
}

// PUT - Set active logo or favicon
export async function PUT(request: NextRequest) {
  try {
    const { filePath, type } = await request.json()
    
    if (!filePath || !type) {
      return NextResponse.json({
        success: false,
        error: 'File path and type are required'
      }, { status: 400 })
    }

    const publicDir = path.join(process.cwd(), 'public')
    const sourcePath = path.join(process.cwd(), 'public', filePath.replace('/', ''))
    
    // Determine active filename
    const extension = path.extname(filePath)
    let activeFileName: string
    
    if (type === 'logo') {
      activeFileName = `logo${extension}`
    } else {
      if (extension === '.ico') {
        activeFileName = 'favicon.ico'
      } else if (extension === '.svg') {
        activeFileName = 'favicon.svg'
      } else {
        activeFileName = `favicon${extension}`
      }
    }
    
    const activeFilePath = path.join(publicDir, activeFileName)
    
    // Copy file to active location
    const buffer = await require('fs').promises.readFile(sourcePath)
    await writeFile(activeFilePath, buffer)
    
    return NextResponse.json({
      success: true,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} set as active`,
      activeFile: `/${activeFileName}`
    })
  } catch (error) {
    console.error('Error setting active branding file:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to set active file'
    }, { status: 500 })
  }
}

// DELETE - Delete branding file
export async function DELETE(request: NextRequest) {
  try {
    const { filePath } = await request.json()
    
    if (!filePath) {
      return NextResponse.json({
        success: false,
        error: 'File path is required'
      }, { status: 400 })
    }

    const fullPath = path.join(process.cwd(), 'public', filePath.replace('/', ''))
    await unlink(fullPath)
    
    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting branding file:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete file'
    }, { status: 500 })
  }
}