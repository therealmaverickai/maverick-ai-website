'use client'

import { useState, useEffect } from 'react'
import DocumentUpload from '@/components/DocumentUpload'

interface Document {
  id: string
  filename: string
  contentType: string
  fileSize: number
  title: string | null
  processingStatus: string
  chunkCount: number
  companyContext: string[]
  documentType: string
  tags: string[]
  createdBy: string | null
  createdAt: string
}

interface SearchResult {
  chunkId: string
  documentId: string
  content: string
  similarityScore: number
  documentTitle: string | null
  documentFilename: string
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [uploadResults, setUploadResults] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetchStats()
    fetchDocuments()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/documents/search')
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchDocuments = async () => {
    // This would need a new API endpoint to list documents
    // For now, we'll use the upload results as a proxy
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/documents/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          searchType: 'hybrid',
          maxResults: 10
        })
      })

      const data = await response.json()
      if (data.success) {
        setSearchResults(data.results)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadComplete = (result: any) => {
    setUploadResults(prev => [result, ...prev])
    fetchStats() // Refresh stats after upload
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🔧 Maverick AI Admin Panel
              </h1>
              <p className="text-gray-600 text-sm">
                Gestione RAG System e Documenti
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Sistema di amministrazione nascosto
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
              { id: 'upload', label: '📤 Upload Documenti', icon: '📤' },
              { id: 'search', label: '🔍 Test Search', icon: '🔍' },
              { id: 'analytics', label: '📈 Analytics', icon: '📈' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">📚 Documenti Totali</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {stats?.total_documents || '0'}
                </p>
                <p className="text-sm text-gray-500">
                  {stats?.completed_documents || '0'} processati
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">🧩 Chunk Totali</h3>
                <p className="text-3xl font-bold text-green-600">
                  {stats?.total_chunks || '0'}
                </p>
                <p className="text-sm text-gray-500">
                  Media: {stats?.avg_chunks_per_document?.toFixed(1) || '0'} per doc
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">🤖 Sistema RAG</h3>
                <p className="text-3xl font-bold text-purple-600">Attivo</p>
                <p className="text-sm text-gray-500">
                  Vector search operativo
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">⚡ Embed Model</h3>
                <p className="text-lg font-semibold text-orange-600">text-embedding-3-small</p>
                <p className="text-sm text-gray-500">
                  1536 dimensioni
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            {uploadResults.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">📋 Upload Recenti</h3>
                <div className="space-y-3">
                  {uploadResults.slice(0, 5).map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <span className="font-medium">ID: {result.documentId?.slice(0, 8)}...</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({result.chunksCreated} chunks)
                        </span>
                      </div>
                      <span className="text-green-600 text-sm">✅ Completato</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">⚙️ Configurazione Sistema</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Document Processing</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Max file size: 10MB</li>
                    <li>• Formati: PDF, DOCX, TXT</li>
                    <li>• Chunk size: 800 tokens</li>
                    <li>• Overlap: 200 tokens</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Vector Search</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Similarity threshold: 0.7</li>
                    <li>• Max results: 5</li>
                    <li>• Hybrid search: Attivo</li>
                    <li>• Company filtering: Attivo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div>
            <DocumentUpload 
              onUploadComplete={handleUploadComplete}
              className="mb-8"
            />
          </div>
        )}

        {/* Search Test Tab */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">🔍 Test Vector Search</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Inserisci una query di test..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? '🔄 Cercando...' : '🔍 Cerca'}
                </button>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">
                  📊 Risultati ({searchResults.length})
                </h3>
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <div key={result.chunkId} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          📄 {result.documentFilename}
                        </span>
                        <span className="text-sm text-blue-600">
                          Score: {(result.similarityScore * 100).toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        {result.content.substring(0, 200)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">📈 Analytics RAG System</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Utilizzo per Tipo</h4>
                  {stats?.document_types && (
                    <div className="space-y-2">
                      {Object.entries(stats.document_types).map(([type, count]) => (
                        <div key={type} className="flex justify-between">
                          <span className="text-sm">{type}</span>
                          <span className="text-sm font-medium">{String(count)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Avg Processing Time</span>
                      <span className="font-medium">~2-5s per doc</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search Latency</span>
                      <span className="font-medium">~100-300ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vector Dimensions</span>
                      <span className="font-medium">1536</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* API Endpoints Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">🔗 API Endpoints</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-mono">POST /api/documents/upload</span>
                  <span className="text-green-600">✅ Attivo</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-mono">POST /api/documents/search</span>
                  <span className="text-green-600">✅ Attivo</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-mono">GET /api/documents/search</span>
                  <span className="text-green-600">✅ Attivo</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-mono">POST /api/ai-chat/chat (RAG Enhanced)</span>
                  <span className="text-green-600">✅ Attivo</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}