'use client'

import DocumentUpload from '@/components/DocumentUpload'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DocumentsAdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [uploadResults, setUploadResults] = useState<any[]>([])

  useEffect(() => {
    verifyAuth()
  }, [])

  const verifyAuth = async () => {
    try {
      const token = localStorage.getItem('admin-token')
      if (!token) {
        router.push('/admin/login')
        return
      }

      const response = await fetch('/api/admin/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        localStorage.removeItem('admin-token')
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Auth verification failed:', error)
      router.push('/admin/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('admin-token')
      if (token) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('admin-token')
      router.push('/admin/login')
    }
  }

  const handleUploadComplete = (result: any) => {
    console.log('Document uploaded:', result)
    setUploadResults(prev => [result, ...prev])
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verifica accesso...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render anything (middleware will redirect)
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with logout */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📚 Gestione Documenti RAG
            </h1>
            <p className="text-gray-600">
              Carica documenti per arricchire la knowledge base dell'AI
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-2">
              👤 Logged in as: <span className="font-medium">{user.username}</span>
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Upload Component */}
        <DocumentUpload 
          onUploadComplete={handleUploadComplete}
          className="mb-8"
        />

        {/* Upload History */}
        {uploadResults.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">📋 Documenti Caricati</h3>
            <div className="space-y-3">
              {uploadResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <span className="font-medium">Documento ID: {result.documentId}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({result.chunksCreated} chunks creati)
                    </span>
                  </div>
                  <span className="text-green-600 text-sm">✅ Completato</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Consigli per l'Upload</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Carica documenti aziendali, case study, documentazione tecnica</li>
            <li>• Usa il campo "Contesto Aziendale" per associare documenti a clienti specifici</li>
            <li>• Aggiungi tag rilevanti per migliorare la ricerca</li>
            <li>• I documenti vengono processati automaticamente in chunk per l'AI</li>
          </ul>
        </div>
      </div>
    </div>
  )
}