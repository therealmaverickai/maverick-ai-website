import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Casi d\'Uso AI - Maverick AI',
  description: 'Scopri come l\'Intelligenza Artificiale sta trasformando le aziende: esempi concreti e risultati misurabili nei diversi settori.',
}

const useCases = [
  {
    id: 1,
    title: "Copilota per gare e offerte",
    sector: "B2B Sales & Procurement",
    description: "Piattaforma AI che intercetta automaticamente le gare sui portali pubblici e privati, segnala quelle rilevanti per l'azienda e genera bozze di risposta, riducendo tempi e complessità operative dei team commerciali.",
    benefits: [
      "Riduzione del 70% del tempo di ricerca gare",
      "Aumento del 40% delle partecipazioni qualificate",
      "Generazione automatica bozze di risposta"
    ],
    technologies: ["Web scraping", "Natural language processing", "Document generation"],
    icon: "",
    color: "bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900"
  },
  {
    id: 2,
    title: "Agente per iscrizione ai portali di procurement",
    sector: "B2B Sales & Procurement",
    description: "Agente AI che analizza i siti di procurement, identifica la piattaforma utilizzata e gli accessi richiesti, recupera i contatti, automatizza l'invio email con la richiesta di iscrizione/accredito e supporta l'iscrizione ai portali.",
    benefits: [
      "Automazione completa del processo di iscrizione",
      "Identificazione automatica di 200+ portali",
      "Riduzione del 90% del tempo operativo"
    ],
    technologies: ["Web automation", "Email automation", "Form processing"],
    icon: "",
    color: "bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900"
  },
  {
    id: 3,
    title: "Traduttore AI per e-commerce",
    sector: "E-commerce & Retail",
    description: "Tool AI che genera automaticamente descrizioni prodotto a partire da una foto, e le traduce in più lingue e diversi tone of voice in linea con l'identità del brand.",
    benefits: [
      "Generazione automatica descrizioni da immagini",
      "Traduzione in 50+ lingue",
      "Personalizzazione tone of voice del brand"
    ],
    technologies: ["Computer vision", "Natural language generation", "Multi-language AI"],
    icon: "",
    color: "bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900"
  },
  {
    id: 4,
    title: "CRM con automazioni intelligenti",
    sector: "Sales & Customer Management",
    description: "CRM evoluto che integra funzioni tradizionali di inserimento contatti e deal con simulazioni di pricing, utilizzo via WhatsApp/Telegram e un assistente digitale che aggiorna i deal e agisce come assistente personale.",
    benefits: [
      "Integrazione WhatsApp/Telegram nativa",
      "Simulazioni di pricing automatiche",
      "Assistente AI per gestione scadenze"
    ],
    technologies: ["CRM integration", "Messaging APIs", "Pricing algorithms"],
    icon: "",
    color: "bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900"
  },
  {
    id: 5,
    title: "Enhanced knowledge management tool",
    sector: "Enterprise & Knowledge Work",
    description: "Soluzione AI che centralizza documenti e informazioni aziendali, consentendo ricerche semantiche avanzate e chatbot interni per rispondere a domande dei team con fonti citate. Migliora l'accesso al know-how e preserva la conoscenza aziendale.",
    benefits: [
      "Ricerca semantica su tutti i documenti aziendali",
      "Chatbot interno con fonti citate",
      "Riduzione del 60% dei tempi di ricerca informazioni"
    ],
    technologies: ["Semantic search", "RAG systems", "Document AI"],
    icon: "",
    color: "bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900"
  },
  {
    id: 6,
    title: "Agente per gestione recensioni hospitality",
    sector: "Hotel & Ristorazione",
    description: "Strumento AI che supporta hotel e ristoranti a rispondere alle recensioni online generando risposte personalizzate, coerenti con il tono del brand. Permette di rispondere in modo rapido, professionale e scalabile.",
    benefits: [
      "Risposta automatica a recensioni online",
      "Tone of voice coerente con il brand",
      "Gestione scalabile su multiple piattaforme"
    ],
    technologies: ["Sentiment analysis", "Response generation", "Brand voice AI"],
    icon: "",
    color: "bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900"
  }
]

export default function UseCasesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900 text-white py-20 px-6 lg:px-12">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Cosa abbiamo 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> realizzato</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
              Alcuni nostri progetti di 
              <span className="text-accent-400 font-semibold"> Intelligenza Artificiale</span> sviluppati per 
              <span className="text-accent-400 font-semibold"> aziende innovative</span>
            </p>
            <div className="flex justify-center">
              <a 
                href="#use-cases" 
                className="btn-secondary text-lg px-8 py-4 border-white hover:bg-white hover:text-navy-900"
              >
                📋 Esplora i Progetti
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Use Cases Grid */}
      <section id="use-cases" className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              Alcuni nostri progetti
            </h2>
            <p className="text-lg sm:text-xl text-navy-700 max-w-3xl mx-auto">
              Soluzioni di Intelligenza Artificiale sviluppate per ottimizzare processi aziendali 
              e generare valore tangibile per i nostri clienti
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Header */}
                <div className={`${useCase.color} p-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{useCase.title}</h3>
                      <p className="text-white/80">{useCase.sector}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {useCase.description}
                  </p>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-navy-900 mb-3 flex items-center">
                      <span className="mr-2">📈</span>
                      Risultati Ottenuti
                    </h4>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-gray-600">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-3 flex items-center">
                      <span className="mr-2">🛠️</span>
                      Tecnologie Utilizzate
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {useCase.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6 lg:px-12">
        <div className="container-width text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Pronto a Trasformare la Tua Azienda?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Questi sono solo alcuni esempi. Ogni azienda ha sfide uniche che l'AI può risolvere. 
            Scopri il potenziale specifico per il tuo business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/ai-readiness" 
              className="btn-primary bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              🎯 Fai l'AI Readiness Assessment
            </a>
            <a 
              href="https://calendar.app.google/qRHonaahhRhqZqSu8"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50 hover:border-blue-100 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              📞 Prenota Consulenza Gratuita
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}