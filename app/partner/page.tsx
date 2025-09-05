import Header from '@/components/Header'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function PartnersPage() {
  const partnerCategories = [
    {
      title: "Partner tecnologici e system integrator",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      partners: [
        {
          name: "Alveo PA ABS",
          description: "System integrator specializzato nell'integrazione di soluzioni IT e infrastrutture complesse, con esperienza consolidata nel settore pubblico e privato."
        }
      ]
    },
    {
      title: "Partner consulenziali",
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      partners: [
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
        }
      ]
    },
    {
      title: "Partner software",
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
      ),
      partners: [
        {
          name: "Cardinal Solar",
          description: "Software house innovativa che sviluppa soluzioni digitali e piattaforme su misura, con un forte orientamento alla qualità e all'affidabilità del prodotto."
        }
      ]
    },
    {
      title: "Partner per la formazione",
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      partners: [
        {
          name: "VibeDojo",
          description: "Academy che aiuta team e professionisti a sviluppare competenze digitali e AI in modo pratico, con corsi e programmi di upskilling personalizzati."
        }
      ]
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-navy-50 to-white section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-6xl mb-6">🌐</div>
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

      {/* Partners Sections */}
      <section className="bg-gray-50 section-padding">
        <div className="container-width">
          {partnerCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16 last:mb-0">
              {/* Category Title */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  {category.icon}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
                  {category.title}
                </h2>
              </div>

              {/* Partners Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.partners.map((partner, partnerIndex) => (
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
          ))}
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