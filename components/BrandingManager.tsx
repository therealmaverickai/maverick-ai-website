'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface BrandingData {
  logo: {
    current: string | null
    available: string[]
  }
  favicon: {
    current: string | null
    available: string[]
  }
}

export default function BrandingManager() {
  const [branding, setBranding] = useState<BrandingData>({
    logo: { current: null, available: [] },
    favicon: { current: null, available: [] }
  })
  const [loading, setLoading] = useState(true)
  const [uploadLoading, setUploadLoading] = useState<string | null>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const faviconInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchBrandingData()
  }, [])

  const fetchBrandingData = async () => {
    try {
      const response = await fetch('/api/admin/branding')
      const data = await response.json()
      if (data.success) {
        setBranding(data.branding)
      }
    } catch (error) {
      console.error('Error fetching branding data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File, type: 'logo' | 'favicon') => {
    setUploadLoading(type)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await fetch('/api/admin/branding', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.success) {
        await fetchBrandingData()
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`)
        
        // Refresh the page to see the updated logo/favicon
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        alert(data.error || `Failed to upload ${type}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert(`Failed to upload ${type}`)
    } finally {
      setUploadLoading(null)
    }
  }

  const handleSetActive = async (filePath: string, type: 'logo' | 'favicon') => {
    try {
      const response = await fetch('/api/admin/branding', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath, type })
      })

      const data = await response.json()
      if (data.success) {
        await fetchBrandingData()
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} set as active!`)
        
        // Refresh the page to see the updated logo/favicon
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        alert(data.error || `Failed to set ${type} as active`)
      }
    } catch (error) {
      console.error('Set active error:', error)
      alert(`Failed to set ${type} as active`)
    }
  }

  const handleDelete = async (filePath: string, type: 'logo' | 'favicon') => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return

    try {
      const response = await fetch('/api/admin/branding', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath })
      })

      const data = await response.json()
      if (data.success) {
        await fetchBrandingData()
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`)
      } else {
        alert(data.error || `Failed to delete ${type}`)
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert(`Failed to delete ${type}`)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading branding assets...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Logo Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          🎨 Logo Management
        </h3>

        {/* Current Logo */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Current Logo</h4>
          {branding.logo.current ? (
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="relative w-32 h-12 bg-white border rounded flex items-center justify-center">
                <Image
                  src={branding.logo.current}
                  alt="Current Logo"
                  width={120}
                  height={40}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{branding.logo.current}</p>
                <p className="text-xs text-gray-500">Currently active logo</p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
              No logo currently set
            </div>
          )}
        </div>

        {/* Upload New Logo */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Upload New Logo</h4>
          <div className="flex items-center space-x-4">
            <input
              ref={logoInputRef}
              type="file"
              accept=".svg,.png,.jpg,.jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file, 'logo')
              }}
              className="hidden"
            />
            <button
              onClick={() => logoInputRef.current?.click()}
              disabled={uploadLoading === 'logo'}
              className="btn-primary flex items-center space-x-2"
            >
              {uploadLoading === 'logo' ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <span>📁</span>
                  <span>Choose Logo File</span>
                </>
              )}
            </button>
            <p className="text-sm text-gray-500">
              Supported formats: SVG, PNG, JPG (recommended: 120x40px or similar ratio)
            </p>
          </div>
        </div>

        {/* Available Logos */}
        {branding.logo.available.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Available Logos ({branding.logo.available.length})</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {branding.logo.available.map((logoPath, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="relative w-20 h-8 bg-gray-100 border rounded flex items-center justify-center">
                    <Image
                      src={logoPath}
                      alt={`Logo ${index + 1}`}
                      width={80}
                      height={30}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{logoPath.split('/').pop()}</p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleSetActive(logoPath, 'logo')}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        Set Active
                      </button>
                      <button
                        onClick={() => handleDelete(logoPath, 'logo')}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Favicon Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          🌐 Favicon Management
        </h3>

        {/* Current Favicon */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Current Favicon Files</h4>
          {branding.favicon.available.length > 0 ? (
            <div className="space-y-2">
              {branding.favicon.available.filter(path => !path.includes('branding')).map((faviconPath, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="relative w-8 h-8 bg-white border rounded flex items-center justify-center">
                    {faviconPath.endsWith('.svg') ? (
                      <Image
                        src={faviconPath}
                        alt="Favicon"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    ) : (
                      <Image
                        src={faviconPath}
                        alt="Favicon"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{faviconPath}</p>
                    <p className="text-xs text-gray-500">Active favicon file</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
              No favicon files found
            </div>
          )}
        </div>

        {/* Upload New Favicon */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Upload New Favicon</h4>
          <div className="flex items-center space-x-4">
            <input
              ref={faviconInputRef}
              type="file"
              accept=".ico,.svg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(file, 'favicon')
              }}
              className="hidden"
            />
            <button
              onClick={() => faviconInputRef.current?.click()}
              disabled={uploadLoading === 'favicon'}
              className="btn-primary flex items-center space-x-2"
            >
              {uploadLoading === 'favicon' ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <span>📁</span>
                  <span>Choose Favicon File</span>
                </>
              )}
            </button>
            <p className="text-sm text-gray-500">
              Supported formats: ICO (32x32), SVG, PNG (for Apple touch icon: 180x180)
            </p>
          </div>
        </div>

        {/* Available Favicons */}
        {branding.favicon.available.filter(path => path.includes('branding')).length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Available Favicon Files</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {branding.favicon.available.filter(path => path.includes('branding')).map((faviconPath, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="relative w-8 h-8 bg-gray-100 border rounded flex items-center justify-center">
                    <Image
                      src={faviconPath}
                      alt={`Favicon ${index + 1}`}
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{faviconPath.split('/').pop()}</p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleSetActive(faviconPath, 'favicon')}
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        Set Active
                      </button>
                      <button
                        onClick={() => handleDelete(faviconPath, 'favicon')}
                        className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-3">📝 Instructions</h4>
        <div className="grid md:grid-cols-2 gap-4 text-blue-800 text-sm">
          <div>
            <h5 className="font-medium mb-2">Logo Guidelines:</h5>
            <ul className="space-y-1">
              <li>• Recommended size: 120x40px (3:1 ratio)</li>
              <li>• SVG format preferred for scalability</li>
              <li>• PNG/JPG acceptable for photographic logos</li>
              <li>• Transparent background recommended</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Favicon Guidelines:</h5>
            <ul className="space-y-1">
              <li>• ICO format: 32x32px (standard browser)</li>
              <li>• SVG format: scalable for modern browsers</li>
              <li>• PNG format: 180x180px (Apple touch icon)</li>
              <li>• Files are automatically placed in correct locations</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-blue-900 text-sm">
            <strong>🔄 Note:</strong> After uploading new branding assets, the page will automatically refresh to display the changes. 
            The new logo will appear in the header, and the favicon will be visible in browser tabs.
          </p>
        </div>
      </div>
    </div>
  )
}