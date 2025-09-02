import Link from 'next/link'

export default function WhoWeServeSection() {
  const targets = [
    {
      title: "Aziende",
      description: "PMI e grandi corporation che vogliono innovare attraverso l'AI per migliorare efficienza e competitività",
      link: "/aziende",
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      benefits: ["Automazione processi", "Analisi dati avanzata", "Customer experience migliorata"]
    },
    {
      title: "Private equity funds",
      description: "Fondi di investimento che cercano di massimizzare il valore delle loro portfolio companies con tecnologie AI",
      link: "/private-equity",
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      benefits: ["ROI incrementato", "Due diligence AI", "Ottimizzazione portfolio"]
    },
    {
      title: "Aspiring entrepreneurs",
      description: "Imprenditori visionari che vogliono costruire il futuro integrando AI nelle loro startup e business model",
      link: "/imprenditori",
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      benefits: ["Strategia AI integrata", "MVP intelligenti", "Scalabilità ottimizzata"]
    }
  ]

  return (
    <section id="chi-serviamo" className="bg-gray-50 section-padding">
      <div className="container-width">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 px-4">
            A chi ci rivolgiamo
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Accompagniamo diverse tipologie di business nella trasformazione digitale attraverso l'AI
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {targets.map((target, index) => (
            <div 
              key={index} 
              className="card p-8 text-center group shimmer-effect cursor-pointer"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-blue-50 rounded-full bg-hover icon-hover">
                  <div className="text-blue-600 floating-animation" style={{animationDelay: `${index * 0.2}s`}}>
                    {target.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-hover">
                {target.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {target.description}
              </p>

              <div className="space-y-2 mb-8">
                {target.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center justify-center text-sm text-gray-600 group-hover:text-gray-700 transition-all duration-300" style={{transitionDelay: `${idx * 50}ms`}}>
                    <svg className="w-4 h-4 text-blue-500 mr-2 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" style={{transitionDelay: `${idx * 50}ms`}}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </div>
                ))}
              </div>

              <Link 
                href={target.link}
                className="btn-primary w-full inline-block text-center group-hover:scale-105 transition-transform duration-300"
              >
                Scopri di più
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}