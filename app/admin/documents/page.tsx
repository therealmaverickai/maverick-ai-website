'use client'

import DocumentUpload from '@/components/DocumentUpload'
import { useState } from 'react'

export default function DocumentsAdminPage() {
  const [uploadResults, setUploadResults] = useState<any[]>([])

  const handleUploadComplete = (result: any) => {
    console.log('Document uploaded:', result)
    setUploadResults(prev => [result, ...prev])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📚 Gestione Documenti RAG
          </h1>
          <p className="text-gray-600">
            Carica documenti per arricchire la knowledge base dell'AI
          </p>
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