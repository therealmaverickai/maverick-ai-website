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
    <main className="min-h-screen">
      <Header />
      <Breadcrumb />

      {/* Interactive Assessment Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              AI Readiness Assessment
            </h2>
            <p className="text-lg sm:text-xl text-navy-700 max-w-3xl mx-auto">
              Rispondi alle domande qui sotto per ricevere una valutazione dettagliata della preparazione AI della tua azienda
            </p>
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