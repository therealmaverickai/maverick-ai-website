import './globals.css'
import type { Metadata } from 'next'
import CookieBanner from '@/components/CookieBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Maverick AI - Diamo forma al business del futuro',
  description: 'Startup specializzata in Intelligenza Artificiale Generativa e Agenticche per il business. Partner strategici per la trasformazione digitale.',
  keywords: 'AI, Intelligenza Artificiale, Business, Generative AI, Agentic AI, Digital Transformation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className="bg-gray-50 text-navy-900">
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}