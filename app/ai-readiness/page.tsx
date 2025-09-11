import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import AIReadinessAssessment from '@/components/AIReadinessAssessment'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'AI Readiness Assessment - Maverick AI | Valuta la tua preparazione AI',
  description: 'Valuta il livello di preparazione della tua azienda per l\'implementazione dell\'Intelligenza Artificiale con il nostro assessment gratuito. Test AI personalizzato per aziende italiane.',
  keywords: 'AI readiness, assessment AI, preparazione intelligenza artificiale, valutazione AI aziende, test AI gratuito, consulenza AI',
  openGraph: {
    title: 'AI Readiness Assessment - Maverick AI',
    description: 'Valuta il livello di preparazione della tua azienda per l\'implementazione dell\'Intelligenza Artificiale con il nostro assessment gratuito.',
    url: 'https://www.maverickai.it/ai-readiness',
    siteName: 'Maverick AI',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'AI Readiness Assessment - Maverick AI',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Readiness Assessment - Maverick AI',
    description: 'Valuta il livello di preparazione della tua azienda per l\'implementazione dell\'Intelligenza Artificiale con il nostro assessment gratuito.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/ai-readiness',
  },
}

export default function AIReadinessPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />
      <Breadcrumb />

      {/* Interactive Assessment Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container-width">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-8">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              AI Readiness Assessment
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Scopri il <span className="font-semibold text-blue-600">livello di maturità AI</span> della tua azienda in pochi minuti
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>5 minuti</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Report personalizzato</span>
              </div>
            </div>
          </div>
          
          <AIReadinessAssessment />
        </div>
      </section>

      
      {/* Call to Action Section */}
      <section className="bg-navy-900 text-white py-16 px-6 lg:px-12">
        <div className="container-width text-center">
          <h2 className="text-3xl font-bold mb-6">
            Hai completato l'assessment?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Il prossimo passo è parlare con i nostri esperti per una consulenza personalizzata 
            e scoprire come implementare l'AI nella tua azienda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://calendar.app.google/qRHonaahhRhqZqSu8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-8 py-4"
            >
              Prenota Consulenza Gratuita
            </a>
            <a href="/" className="btn-secondary text-lg px-8 py-4 border-white hover:bg-white hover:text-navy-900">
              Torna alla Homepage
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}