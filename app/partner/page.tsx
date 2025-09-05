import Header from '@/components/Header'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function PartnersPage() {
  const partners = [
    {
      name: "Alveo PA ABS",
      description: "System integrator specializzato nell'integrazione di soluzioni IT e infrastrutture complesse, con esperienza consolidata nel settore pubblico e privato."
    },
    {
      name: "ARAD Digital",
      description: "Boutique di consulenza digitale focalizzata su progetti di trasformazione e innovazione tecnologica."
    },
    {
      name: "CrowdM",
      description: "Società con competenze in comunicazione, design e digital strategy, partner creativo nello sviluppo di progetti innovativi."
    },
    {
      name: "isonlab",
      description: "Laboratorio di innovazione con focus su processi, operations e tecnologia, con un approccio sperimentale e data-driven."
    },
    {
      name: "Cardinal Solar",
      description: "Software house innovativa che sviluppa soluzioni digitali e piattaforme su misura, con un forte orientamento alla qualità e all'affidabilità del prodotto."
    },
    {
      name: "VibeDojo",
      description: "Academy che aiuta team e professionisti a sviluppare competenze digitali e AI in modo pratico, con corsi e programmi di upskilling personalizzati."
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-navy-50 to-white section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy-900 mb-8">
              I nostri partner
            </h1>
            <blockquote className="text-xl sm:text-2xl text-navy-600 font-medium italic mb-8">
              "Non sappiamo fare tutto, ma sappiamo con chi farlo."
            </blockquote>
            <p className="text-lg sm:text-xl text-navy-700 leading-relaxed">
              Per offrire ai nostri clienti un servizio a 360°, collaboriamo con partner selezionati che portano competenze specifiche e complementari. 
              L'unione delle nostre forze ci permette di integrare strategia, tecnologia, creatività e formazione in un ecosistema unico, capace di generare soluzioni concrete e valore misurabile.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-width">
          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, partnerIndex) => (
              <div 
                key={partnerIndex}
                className="card p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-navy-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {partner.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Partner CTA Section */}
      <section className="bg-white section-padding">
        <div className="container-width">
          <div className="text-center">
            <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-6">🤝</div>
                <h2 className="text-3xl font-bold mb-6">
                  Diventa partner di Maverick AI
                </h2>
                <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                  Vuoi collaborare con noi e portare insieme più valore ai clienti?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:info@maverickai.it" 
                    className="bg-white text-navy-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-block text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Scrivici a info@maverickai.it
                  </a>
                </div>
                <p className="text-gray-300 mt-6 text-base">
                  per scoprire come entrare a far parte del nostro network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  )
}