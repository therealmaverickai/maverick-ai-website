'use client'

import React, { useState, useCallback } from 'react'
// Icons replaced with emojis to avoid React types compatibility issues

interface DocumentUploadProps {
  onUploadComplete?: (result: any) => void
  className?: string
}

export default function DocumentUpload({ onUploadComplete, className = '' }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [uploadMessage, setUploadMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState('general')
  const [companyContext, setCompanyContext] = useState('')
  const [tags, setTags] = useState('')
  const [createdBy, setCreatedBy] = useState('')

  const supportedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ]

  const maxFileSize = 10 * 1024 * 1024 // 10MB

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelection(files[0])
    }
  }, [])

  const handleFileSelection = (file: File) => {
    // Validate file type
    if (!supportedTypes.includes(file.type)) {
      setUploadMessage('Tipo di file non supportato. Carica PDF, DOCX o TXT.')
      setUploadStatus('error')
      return
    }

    // Validate file size
    if (file.size > maxFileSize) {
      setUploadMessage('File troppo grande. Massimo 10MB.')
      setUploadStatus('error')
      return
    }

    setSelectedFile(file)
    setUploadStatus('idle')
    setUploadMessage('')
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelection(files[0])
    }
  }

  const uploadDocument = async () => {
    if (!selectedFile) return

    setUploadStatus('uploading')
    setUploadMessage('Caricamento e elaborazione del documento...')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('documentType', documentType)
      formData.append('companyContext', companyContext)
      formData.append('tags', tags)
      formData.append('createdBy', createdBy)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        setUploadStatus('success')
        setUploadMessage(`Documento caricato con successo! ${result.chunksCreated} chunk creati.`)
        setSelectedFile(null)
        
        // Reset form
        setDocumentType('general')
        setCompanyContext('')
        setTags('')
        setCreatedBy('')
        
        if (onUploadComplete) {
          onUploadComplete(result)
        }
      } else {
        setUploadStatus('error')
        setUploadMessage(result.error || 'Errore durante il caricamento')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('error')
      setUploadMessage('Errore di rete durante il caricamento')
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setUploadStatus('idle')
    setUploadMessage('')
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('word') || fileType.includes('document')) return '📝'
    if (fileType.includes('text')) return '📋'
    return '📄'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Carica Documento per RAG
        </h3>
        <p className="text-gray-600 text-sm">
          Carica documenti PDF, DOCX o TXT per arricchire la knowledge base dell'AI.
        </p>
      </div>

      {/* File upload area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : selectedFile 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={uploadStatus === 'uploading'}
        />
        
        {selectedFile ? (
          <div className="flex items-center justify-center space-x-4">
            <span className="text-2xl">{getFileIcon(selectedFile.type)}</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
            </div>
            <button
              onClick={clearFile}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors font-bold"
              disabled={uploadStatus === 'uploading'}
            >
              ×
            </button>
          </div>
        ) : (
          <div>
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4 flex items-center justify-center text-4xl">
              📄
            </div>
            <p className="text-gray-600">
              Trascina e rilascia un documento qui, o clicca per selezionare
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supporta PDF, DOCX, TXT (max 10MB)
            </p>
          </div>
        )}
      </div>

      {/* Document metadata form */}
      {selectedFile && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="inline mr-2">🏢</span>
                Tipo Documento
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="general">Generale</option>
                <option value="company_specific">Specifico Aziendale</option>
                <option value="industry">Settore</option>
                <option value="case_study">Case Study</option>
                <option value="technical">Tecnico</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="inline mr-2">👤</span>
                Caricato da
              </label>
              <input
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                placeholder="Nome utente"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="inline mr-2">🏢</span>
              Contesto Aziendale (separato da virgole)
            </label>
            <input
              type="text"
              value={companyContext}
              onChange={(e) => setCompanyContext(e.target.value)}
              placeholder="es: TechCorp, StartupXYZ"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Specifica per quali aziende questo documento è rilevante
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="inline mr-2">🏷️</span>
              Tag (separati da virgole)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="es: AI, machine learning, automazione"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Status messages */}
      {uploadMessage && (
        <div className={`mt-4 p-4 rounded-md flex items-center ${
          uploadStatus === 'success' ? 'bg-green-50 text-green-800' :
          uploadStatus === 'error' ? 'bg-red-50 text-red-800' :
          'bg-blue-50 text-blue-800'
        }`}>
          {uploadStatus === 'uploading' && <span className="animate-spin w-4 h-4 mr-2 inline-block">⟳</span>}
          {uploadStatus === 'success' && <span className="w-4 h-4 mr-2 inline-block">✓</span>}
          {uploadStatus === 'error' && <span className="w-4 h-4 mr-2 inline-block">⚠</span>}
          <span className="text-sm">{uploadMessage}</span>
        </div>
      )}

      {/* Upload button */}
      {selectedFile && uploadStatus !== 'success' && (
        <div className="mt-6">
          <button
            onClick={uploadDocument}
            disabled={uploadStatus === 'uploading'}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {uploadStatus === 'uploading' ? (
              <>
                <span className="animate-spin w-4 h-4 mr-2 inline-block">⟳</span>
                Elaborazione in corso...
              </>
            ) : (
              <>
                <span className="w-4 h-4 mr-2 inline-block">📄</span>
                Carica e Processa Documento
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}