import './globals.css'
import type { Metadata } from 'next'
import CookieBanner from '@/components/CookieBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export const metadata: Metadata = {
  title: 'Maverick AI - Diamo forma al business del futuro',
  description: 'Startup specializzata in Intelligenza Artificiale Generativa e Agenticche per il business. Partner strategici per la trasformazione digitale.',
  keywords: 'AI, Intelligenza Artificiale, Business, Generative AI, Agentic AI, Digital Transformation',
  authors: [{ name: 'Maverick AI' }],
  creator: 'Maverick AI',
  publisher: 'Maverick AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.maverickai.it'),
  alternates: {
    canonical: '/',
    languages: {
      'it-IT': '/it',
    },
  },
  openGraph: {
    title: 'Maverick AI - Diamo forma al business del futuro',
    description: 'Startup specializzata in Intelligenza Artificiale Generativa e Agenticche per il business. Partner strategici per la trasformazione digitale.',
    url: 'https://www.maverickai.it',
    siteName: 'Maverick AI',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Maverick AI - Intelligenza Artificiale per il Business',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maverick AI - Diamo forma al business del futuro',
    description: 'Startup specializzata in Intelligenza Artificiale Generativa e Agenticche per il business. Partner strategici per la trasformazione digitale.',
    images: ['/logo.png'],
    creator: '@MaverickAI',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Maverick AI",
              "url": "https://www.maverickai.it",
              "logo": "https://www.maverickai.it/logo.png",
              "description": "Startup specializzata in Intelligenza Artificiale Generativa e Agenticche per il business. Partner strategici per la trasformazione digitale.",
              "foundingDate": "2024",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Maverick AI Team"
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/maverick-ai"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IT"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["Italian", "English"]
              },
              "serviceType": [
                "Artificial Intelligence Consulting",
                "AI Development",
                "Digital Transformation",
                "AI Training"
              ],
              "areaServed": "IT",
              "knowsAbout": [
                "Artificial Intelligence",
                "Generative AI",
                "Agentic AI",
                "Digital Transformation",
                "Business Intelligence",
                "Machine Learning"
              ]
            }),
          }}
        />
        
        {/* LLM-specific meta tags for better AI understanding */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="ai-content-declaration" content="This website contains original human-created content about AI services and consulting." />
        <meta name="content-type" content="business-services" />
        <meta name="industry" content="artificial-intelligence, consulting, technology" />
        <meta name="business-model" content="B2B consulting and AI implementation services" />
        <meta name="target-audience" content="Italian businesses, entrepreneurs, companies seeking AI transformation" />
        <meta name="service-offerings" content="AI consulting, AI development, AI training, digital transformation, generative AI solutions" />
        <meta name="expertise-areas" content="Generative AI, Agentic AI, Business Intelligence, Machine Learning, Digital Transformation" />
        <meta name="geographic-focus" content="Italy, Italian market" />
        <meta name="language-primary" content="Italian" />
        <meta name="business-stage" content="startup, growth-stage" />
        <meta name="value-proposition" content="Transform AI into practical, high-impact solutions in rapid timeframes" />
      </head>
      <body className="bg-gray-50 text-navy-900">
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}