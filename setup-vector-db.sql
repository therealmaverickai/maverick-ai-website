-- RAG System Vector Database Setup for Supabase
-- Run this in your Supabase SQL Editor

-- Enable pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create Documents table to store uploaded documents
CREATE TABLE IF NOT EXISTS "documents" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Document metadata
    "filename" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "upload_path" TEXT, -- Supabase Storage path
    
    -- Document content
    "title" TEXT,
    "content" TEXT NOT NULL,
    "summary" TEXT,
    
    -- Processing status
    "processing_status" TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
    "chunk_count" INTEGER DEFAULT 0,
    
    -- Company/context association
    "company_context" TEXT[], -- Array of companies this doc applies to
    "document_type" TEXT DEFAULT 'general' CHECK (document_type IN ('general', 'company_specific', 'industry', 'case_study', 'technical')),
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- Metadata
    "created_by" TEXT, -- User who uploaded
    "language" TEXT DEFAULT 'it'
);

-- Create Document Chunks table for vector storage
CREATE TABLE IF NOT EXISTS "document_chunks" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    "document_id" TEXT NOT NULL REFERENCES "documents"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Chunk content
    "content" TEXT NOT NULL,
    "chunk_index" INTEGER NOT NULL,
    "token_count" INTEGER,
    
    -- Vector embedding (1536 dimensions for OpenAI text-embedding-3-small)
    "embedding" vector(1536),
    
    -- Chunk metadata
    "metadata" JSONB DEFAULT '{}',
    "page_number" INTEGER,
    "section_title" TEXT,
    "chunk_type" TEXT DEFAULT 'content' CHECK (chunk_type IN ('content', 'heading', 'summary', 'key_point')),
    
    -- Context information
    "keywords" TEXT[],
    "entities" TEXT[], -- Extracted named entities
    
    UNIQUE("document_id", "chunk_index")
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "documents_created_at_idx" ON "documents"("created_at" DESC);
CREATE INDEX IF NOT EXISTS "documents_processing_status_idx" ON "documents"("processing_status");
CREATE INDEX IF NOT EXISTS "documents_document_type_idx" ON "documents"("document_type");
CREATE INDEX IF NOT EXISTS "documents_company_context_idx" ON "documents" USING GIN("company_context");
CREATE INDEX IF NOT EXISTS "documents_tags_idx" ON "documents" USING GIN("tags");

-- Vector similarity search index
CREATE INDEX IF NOT EXISTS "document_chunks_embedding_idx" ON "document_chunks" 
USING ivfflat ("embedding" vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS "document_chunks_document_id_idx" ON "document_chunks"("document_id");
CREATE INDEX IF NOT EXISTS "document_chunks_chunk_type_idx" ON "document_chunks"("chunk_type");
CREATE INDEX IF NOT EXISTS "document_chunks_keywords_idx" ON "document_chunks" USING GIN("keywords");

-- RPC Function for semantic search with company context
CREATE OR REPLACE FUNCTION search_documents(
    query_embedding vector(1536),
    company_filter TEXT DEFAULT NULL,
    document_type_filter TEXT DEFAULT NULL,
    similarity_threshold DOUBLE PRECISION DEFAULT 0.7,
    max_results INTEGER DEFAULT 5
)
RETURNS TABLE(
    chunk_id TEXT,
    document_id TEXT,
    content TEXT,
    similarity_score DOUBLE PRECISION,
    metadata JSONB,
    document_title TEXT,
    document_filename TEXT,
    chunk_index INTEGER,
    page_number INTEGER,
    section_title TEXT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        dc.id as chunk_id,
        dc.document_id,
        dc.content,
        1 - (dc.embedding <=> query_embedding) as similarity_score,
        dc.metadata,
        d.title as document_title,
        d.filename as document_filename,
        dc.chunk_index,
        dc.page_number,
        dc.section_title
    FROM document_chunks dc
    JOIN documents d ON dc.document_id = d.id
    WHERE 
        d.processing_status = 'completed'
        AND (company_filter IS NULL OR company_filter = ANY(d.company_context))
        AND (document_type_filter IS NULL OR d.document_type = document_type_filter)
        AND (1 - (dc.embedding <=> query_embedding)) >= similarity_threshold
    ORDER BY dc.embedding <=> query_embedding
    LIMIT max_results;
END;
$$;

-- RPC Function for hybrid search (semantic + keyword)
CREATE OR REPLACE FUNCTION hybrid_search_documents(
    query_embedding vector(1536),
    query_keywords TEXT[],
    company_filter TEXT DEFAULT NULL,
    similarity_threshold DOUBLE PRECISION DEFAULT 0.7,
    max_results INTEGER DEFAULT 5
)
RETURNS TABLE(
    chunk_id TEXT,
    document_id TEXT,
    content TEXT,
    similarity_score DOUBLE PRECISION,
    keyword_score INTEGER,
    combined_score DOUBLE PRECISION,
    metadata JSONB,
    document_title TEXT,
    document_filename TEXT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        dc.id as chunk_id,
        dc.document_id,
        dc.content,
        (1 - (dc.embedding <=> query_embedding)) as similarity_score,
        COALESCE(array_length(array(SELECT unnest(dc.keywords) INTERSECT SELECT unnest(query_keywords)), 1), 0) as keyword_score,
        ((1 - (dc.embedding <=> query_embedding)) * 0.7 + 
         COALESCE(array_length(array(SELECT unnest(dc.keywords) INTERSECT SELECT unnest(query_keywords)), 1), 0) * 0.3) as combined_score,
        dc.metadata,
        d.title as document_title,
        d.filename as document_filename
    FROM document_chunks dc
    JOIN documents d ON dc.document_id = d.id
    WHERE 
        d.processing_status = 'completed'
        AND (company_filter IS NULL OR company_filter = ANY(d.company_context))
        AND (
            (1 - (dc.embedding <=> query_embedding)) >= similarity_threshold
            OR 
            array_length(array(SELECT unnest(dc.keywords) INTERSECT SELECT unnest(query_keywords)), 1) > 0
        )
    ORDER BY combined_score DESC
    LIMIT max_results;
END;
$$;

-- Function to get document statistics
CREATE OR REPLACE FUNCTION get_document_stats()
RETURNS TABLE(
    total_documents BIGINT,
    completed_documents BIGINT,
    total_chunks BIGINT,
    avg_chunks_per_document DOUBLE PRECISION,
    document_types JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_documents,
        COUNT(*) FILTER (WHERE processing_status = 'completed') as completed_documents,
        (SELECT COUNT(*) FROM document_chunks) as total_chunks,
        (SELECT AVG(chunk_count::DOUBLE PRECISION) FROM documents WHERE processing_status = 'completed') as avg_chunks_per_document,
        jsonb_object_agg(document_type, type_count) as document_types
    FROM (
        SELECT document_type, COUNT(*) as type_count
        FROM documents 
        GROUP BY document_type
    ) type_counts
    CROSS JOIN documents;
END;
$$;

-- Row Level Security (RLS) policies for secure access
ALTER TABLE "documents" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "document_chunks" ENABLE ROW LEVEL SECURITY;

-- Policy: Allow read access to all users (adjust based on your auth needs)
CREATE POLICY "Allow read access to documents" ON "documents" FOR SELECT USING (true);
CREATE POLICY "Allow read access to document_chunks" ON "document_chunks" FOR SELECT USING (true);

-- Policy: Allow insert/update for authenticated users (adjust based on your auth needs)
-- CREATE POLICY "Allow insert documents for authenticated users" ON "documents" FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- CREATE POLICY "Allow update documents for authenticated users" ON "documents" FOR UPDATE USING (auth.role() = 'authenticated');

-- Create trigger to update document updated_at timestamp
CREATE OR REPLACE FUNCTION update_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER update_documents_updated_at_trigger
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_documents_updated_at();