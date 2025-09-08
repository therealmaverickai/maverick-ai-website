'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [uploadResults, setUploadResults] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [prompts, setPrompts] = useState<any>({})
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [promptContent, setPromptContent] = useState('')
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    verifyAuth()
  }, [])

  useEffect(() => {
    if (user) {
      fetchStats()
      fetchAllDocuments()
      fetchPrompts()
    }
  }, [user])

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

  const fetchAllDocuments = async () => {
    try {
      const response = await fetch('/api/documents/list')
      const data = await response.json()
      if (data.success) {
        setDocuments(data.documents)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  const fetchPrompts = async () => {
    try {
      const response = await fetch('/api/prompts')
      const data = await response.json()
      if (data.success) {
        setPrompts(data.prompts)
        if (Object.keys(data.prompts).length > 0) {
          const firstPromptId = Object.keys(data.prompts)[0]
          setSelectedPrompt(firstPromptId)
          setPromptContent(data.prompts[firstPromptId].content)
        }
      }
    } catch (error) {
      console.error('Error fetching prompts:', error)
    }
  }

  const deleteDocument = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return
    
    try {
      const response = await fetch(`/api/documents/delete?id=${documentId}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        fetchAllDocuments() // Refresh the list
        fetchStats() // Update stats
        alert('Document deleted successfully')
      } else {
        alert(data.error || 'Failed to delete document')
      }
    } catch (error) {
      console.error('Error deleting document:', error)
      alert('Failed to delete document')
    }
  }

  const updatePrompt = async () => {
    if (!selectedPrompt || !promptContent.trim()) return
    
    try {
      const response = await fetch('/api/prompts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptId: selectedPrompt,
          content: promptContent
        })
      })
      const data = await response.json()
      if (data.success) {
        alert('Prompt updated successfully')
        fetchPrompts() // Refresh prompts
      } else {
        alert(data.error || 'Failed to update prompt')
      }
    } catch (error) {
      console.error('Error updating prompt:', error)
      alert('Failed to update prompt')
    }
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
    fetchAllDocuments() // Refresh documents list
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, don't render anything (user will be redirected)
  if (!user) {
    return null
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
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-semibold">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors"
              >
                🚪 Logout
              </button>
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
              { id: 'documents', label: '📚 Gestione Documenti', icon: '📚' },
              { id: 'upload', label: '📤 Upload Documenti', icon: '📤' },
              { id: 'search', label: '🔍 Test Search', icon: '🔍' },
              { id: 'prompts', label: '🤖 AI Prompts', icon: '🤖' },
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

        {/* Documents Management Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">📚 Documenti Caricati ({documents.length})</h3>
              
              {documents.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Nessun documento caricato. Vai alla sezione Upload per aggiungere documenti.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stato</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dettagli</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contesto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{doc.title || doc.filename}</div>
                              <div className="text-sm text-gray-500">{doc.filename}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              doc.processingStatus === 'completed' ? 'bg-green-100 text-green-800' :
                              doc.processingStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              doc.processingStatus === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {doc.processingStatus === 'completed' ? '✅ Completato' :
                               doc.processingStatus === 'processing' ? '⏳ Elaborazione' :
                               doc.processingStatus === 'failed' ? '❌ Fallito' :
                               '⏱️ In attesa'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div>{doc.fileSizeMB} MB • {doc.chunkCount} chunks</div>
                            <div className="text-xs">{doc.contentType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="max-w-xs">
                              {doc.companyContext?.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {doc.companyContext.map((company: string, idx: number) => (
                                    <span key={idx} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                      {company}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-gray-400">Nessun contesto</span>
                              )}
                              {doc.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {doc.tags.map((tag: string, idx: number) => (
                                    <span key={idx} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(doc.createdAt).toLocaleDateString('it-IT')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => deleteDocument(doc.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              🗑️ Elimina
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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

        {/* AI Prompts Tab */}
        {activeTab === 'prompts' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">🤖 Gestione AI Prompts</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Prompt Selection */}
                <div className="lg:col-span-1">
                  <h4 className="font-medium mb-3">Seleziona Prompt:</h4>
                  <div className="space-y-2">
                    {Object.entries(prompts).map(([id, prompt]: [string, any]) => (
                      <button
                        key={id}
                        onClick={() => {
                          setSelectedPrompt(id)
                          setPromptContent(prompt.content)
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedPrompt === id
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">{prompt.name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Ultimo aggiornamento: {new Date(prompt.lastModified).toLocaleDateString('it-IT')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Editor */}
                <div className="lg:col-span-2">
                  {selectedPrompt && prompts[selectedPrompt] && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Modifica: {prompts[selectedPrompt].name}</h4>
                        <button
                          onClick={updatePrompt}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          💾 Salva Prompt
                        </button>
                      </div>
                      
                      <textarea
                        value={promptContent}
                        onChange={(e) => setPromptContent(e.target.value)}
                        className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        placeholder="Inserisci il contenuto del prompt..."
                      />
                      
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-2">💡 Suggerimenti:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Usa un linguaggio chiaro e specifico</li>
                          <li>• Definisci il ruolo e il contesto dell'AI</li>
                          <li>• Includi esempi quando possibile</li>
                          <li>• Specifica il formato di risposta desiderato</li>
                          <li>• I documenti caricati verranno automaticamente inclusi come contesto</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {!selectedPrompt && (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-4xl mb-4">🤖</div>
                      <p>Seleziona un prompt dalla lista per iniziare la modifica</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Prompt Usage Guide */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">📋 Come funzionano i Prompt</h4>
              <div className="grid md:grid-cols-2 gap-4 text-blue-800 text-sm">
                <div>
                  <h5 className="font-medium mb-2">AI Chat System Prompt:</h5>
                  <ul className="space-y-1">
                    <li>• Definisce il comportamento dell'AI nella chat</li>
                    <li>• Viene utilizzato per ogni conversazione</li>
                    <li>• Include automaticamente i documenti RAG</li>
                  </ul>
                  <h5 className="font-medium mb-2 mt-4">AI Assessment Prompt:</h5>
                  <ul className="space-y-1">
                    <li>• Genera executive summary per l'assessment</li>
                    <li>• Usa placeholders dinamici ({{company}}, {{name}}, etc.)</li>
                    <li>• Personalizza l'analisi per ruolo e azienda</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Variabili Chat:</h5>
                  <ul className="space-y-1">
                    <li>• {`{leadData}`} - Informazioni del cliente</li>
                    <li>• {`{contextFromDocuments}`} - Contenuto documenti RAG</li>
                    <li>• {`{conversationHistory}`} - Cronologia chat</li>
                  </ul>
                  <h5 className="font-medium mb-2 mt-4">Variabili Assessment:</h5>
                  <ul className="space-y-1">
                    <li>• {`{{company}}`} - Nome azienda</li>
                    <li>• {`{{name}}`} - Nome utente</li>
                    <li>• {`{{aiVisionClarity}}`} - Score visione AI</li>
                    <li>• {`{{role}}`} - Ruolo aziendale</li>
                  </ul>
                </div>
              </div>
            </div>
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