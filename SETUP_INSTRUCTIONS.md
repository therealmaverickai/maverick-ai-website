# RAG System Setup Instructions

## Quick Setup Guide

The RAG system is working but requires database setup. Here are the steps:

## 1. Prisma Database Setup

Run this command to create the missing `documents` table:

```bash
cd maverick-ai-website
npx prisma db push
```

This will create the `Document` and `DocumentChunk` models in your database.

## 2. Supabase Vector Database Setup

In your Supabase SQL Editor, run the `setup-vector-db.sql` file:

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create document_chunks table with vector support
CREATE TABLE IF NOT EXISTS public.document_chunks (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL,
    content TEXT NOT NULL,
    chunk_index INTEGER NOT NULL,
    token_count INTEGER NOT NULL,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}',
    keywords TEXT[] DEFAULT '{}',
    entities TEXT[] DEFAULT '{}',
    chunk_type TEXT DEFAULT 'content',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS document_chunks_document_id_idx ON public.document_chunks(document_id);
CREATE INDEX IF NOT EXISTS document_chunks_embedding_idx ON public.document_chunks USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS document_chunks_keywords_idx ON public.document_chunks USING gin(keywords);

-- Create RPC function for document search
CREATE OR REPLACE FUNCTION search_documents(
    query_embedding vector(1536),
    company_filter TEXT DEFAULT NULL,
    document_type_filter TEXT DEFAULT NULL,
    similarity_threshold FLOAT DEFAULT 0.7,
    max_results INTEGER DEFAULT 5
)
RETURNS TABLE (
    chunk_id TEXT,
    document_id TEXT,
    content TEXT,
    similarity_score FLOAT,
    metadata JSONB,
    document_title TEXT,
    document_filename TEXT,
    chunk_index INTEGER
) LANGUAGE sql AS $$
    SELECT 
        dc.id as chunk_id,
        dc.document_id,
        dc.content,
        (1 - (dc.embedding <=> query_embedding)) as similarity_score,
        dc.metadata,
        d.title as document_title,
        d.filename as document_filename,
        dc.chunk_index
    FROM document_chunks dc
    LEFT JOIN documents d ON dc.document_id = d.id
    WHERE (1 - (dc.embedding <=> query_embedding)) > similarity_threshold
    AND (company_filter IS NULL OR d.company_context @> ARRAY[company_filter])
    AND (document_type_filter IS NULL OR d.document_type = document_type_filter)
    ORDER BY similarity_score DESC
    LIMIT max_results;
$$;

-- Create stats function
CREATE OR REPLACE FUNCTION get_document_stats()
RETURNS TABLE (
    total_documents BIGINT,
    completed_documents BIGINT,
    total_chunks BIGINT,
    avg_chunks_per_document FLOAT,
    document_types JSONB
) LANGUAGE sql AS $$
    SELECT 
        COUNT(*) as total_documents,
        COUNT(CASE WHEN processing_status = 'completed' THEN 1 END) as completed_documents,
        COALESCE(SUM(chunk_count), 0) as total_chunks,
        CASE 
            WHEN COUNT(*) > 0 THEN COALESCE(AVG(chunk_count), 0)
            ELSE 0 
        END as avg_chunks_per_document,
        COALESCE(
            jsonb_object_agg(
                document_type, 
                type_count
            ), 
            '{}'::jsonb
        ) as document_types
    FROM documents d
    LEFT JOIN (
        SELECT 
            document_type,
            COUNT(*) as type_count
        FROM documents
        GROUP BY document_type
    ) dt ON true;
$$;
```

## 3. Environment Variables

Make sure these environment variables are set in your production environment:

```env
# Supabase (get from your Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# OpenAI (get from OpenAI dashboard)
OPENAI_API_KEY="your-openai-api-key"
```

## 4. Test the System

After setup:

1. Go to your deployed site
2. Click 10 times on "Maverick AI" in the footer to access admin panel
3. Upload a document in the Upload tab
4. Test search in the Search Test tab

## Current Status

✅ Frontend working
✅ API routes working
✅ File upload working
✅ PDF text extraction working
❌ Database storage (needs Prisma migration)
❌ Vector search (needs Supabase setup)
❌ Stats dashboard (needs Supabase functions)

The document processing is working perfectly - a PDF with 1677 characters was successfully processed!