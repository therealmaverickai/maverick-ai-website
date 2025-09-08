import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Casi d\'Uso AI - Maverick AI',
  description: 'Scopri come l\'Intelligenza Artificiale sta trasformando le aziende: esempi concreti e risultati misurabili nei diversi settori.',
}

const useCases = [
  {
    id: 1,
    title: "Analisi Predittiva per E-commerce",
    sector: "Retail & E-commerce",
    description: "Sistema AI che predice la domanda di prodotti, ottimizza l'inventario e personalizza le raccomandazioni per ogni cliente.",
    benefits: [
      "Riduzione del 30% degli sprechi di magazzino",
      "Aumento del 25% delle conversioni",
      "ROI del 240% nel primo anno"
    ],
    technologies: ["Machine Learning", "Predictive Analytics", "Recommendation Systems"],
    icon: "🛒",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Automazione Customer Service",
    sector: "Servizi Finanziari",
    description: "Chatbot intelligente integrato con sistemi bancari per gestire il 70% delle richieste clienti in tempo reale.",
    benefits: [
      "Riduzione del 60% dei tempi di risposta",
      "Risparmio di €150K annui in personale",
      "Soddisfazione cliente aumentata del 40%"
    ],
    technologies: ["Natural Language Processing", "AI Chatbots", "Integration APIs"],
    icon: "🏦",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Ottimizzazione Produzione",
    sector: "Manifatturiero",
    description: "AI per il monitoraggio in tempo reale delle linee produttive, prevenzione guasti e ottimizzazione della qualità.",
    benefits: [
      "Riduzione del 45% dei fermi macchina",
      "Miglioramento del 20% della qualità",
      "Risparmio energetico del 15%"
    ],
    technologies: ["Computer Vision", "IoT Integration", "Predictive Maintenance"],
    icon: "🏭",
    color: "bg-orange-500"
  },
  {
    id: 4,
    title: "Diagnosi Medica Assistita",
    sector: "Healthcare",
    description: "Sistema AI per l'analisi di imaging medico che supporta i radiologi nella diagnosi precoce di patologie.",
    benefits: [
      "Accuratezza diagnostica del 95%",
      "Riduzione del 50% dei tempi di refertazione",
      "Diagnosi precoci aumentate del 30%"
    ],
    technologies: ["Deep Learning", "Computer Vision", "Medical Imaging"],
    icon: "🏥",
    color: "bg-red-500"
  },
  {
    id: 5,
    title: "Smart Contract Automation",
    sector: "Legal Tech",
    description: "Piattaforma AI per l'analisi automatica di contratti, estrazione di clausole critiche e gestione del rischio legale.",
    benefits: [
      "Riduzione del 70% del tempo di review",
      "Identificazione del 98% delle clausole critiche",
      "Risparmio di €200K annui in consulenze legali"
    ],
    technologies: ["Natural Language Processing", "Document AI", "Legal Analytics"],
    icon: "⚖️",
    color: "bg-purple-500"
  },
  {
    id: 6,
    title: "Fraud Detection in Real-time",
    sector: "FinTech",
    description: "Sistema di rilevamento frodi in tempo reale per transazioni finanziarie con machine learning avanzato.",
    benefits: [
      "Riduzione del 85% delle frodi",
      "Diminuzione del 40% dei falsi positivi",
      "Risparmio di €2M annui in perdite"
    ],
    technologies: ["Anomaly Detection", "Real-time Processing", "Risk Scoring"],
    icon: "🛡️",
    color: "bg-indigo-500"
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
              Casi d'Uso 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> AI</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed">
              Scopri come l'Intelligenza Artificiale sta trasformando le aziende con 
              <span className="text-accent-400 font-semibold"> risultati misurabili</span> e 
              <span className="text-accent-400 font-semibold"> ROI comprovati</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/ai-consultant" 
                className="btn-primary text-lg px-8 py-4 bg-white text-navy-900 hover:bg-gray-100"
              >
                🤖 Parla con il nostro AI Consultant
              </a>
              <a 
                href="#use-cases" 
                className="btn-secondary text-lg px-8 py-4 border-white hover:bg-white hover:text-navy-900"
              >
                📋 Esplora i Casi d'Uso
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-width">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-gray-600">Settori Trasformati</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">€5M+</div>
              <div className="text-gray-600">Risparmi Generati</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Accuratezza Media</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">240%</div>
              <div className="text-gray-600">ROI Medio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section id="use-cases" className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              Casi d'Uso Reali
            </h2>
            <p className="text-lg sm:text-xl text-navy-700 max-w-3xl mx-auto">
              Esempi concreti di come l'AI sta rivoluzionando diversi settori, 
              con dati e risultati verificabili
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Header */}
                <div className={`${useCase.color} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{useCase.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{useCase.title}</h3>
                        <p className="text-white/80">{useCase.sector}</p>
                      </div>
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
              className="btn-secondary border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
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