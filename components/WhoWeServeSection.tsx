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
    },
    {
      title: "Fondi di investimento",
      description: "Fondi di investimento che cercano di massimizzare il valore delle loro portfolio companies con tecnologie AI",
      link: "/private-equity",
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "Aspiranti imprenditori",
      description: "Imprenditori visionari che vogliono costruire il futuro integrando AI nelle loro startup e business model",
      link: "/imprenditori",
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    }
  ]

  return (
    <section id="chi-serviamo" className="bg-white section-padding">
      <div className="container-width">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            I nostri clienti
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 px-4 fade-in-up">
            Creiamo valore per <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              ogni tipo di business
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 fade-in-up stagger-animation" style={{"--stagger": 1} as any}>
            Dall'idea all'implementazione: accompagniamo aziende, fondi di investimento e imprenditori nella trasformazione digitale
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {targets.map((target, index) => (
            <div 
              key={index} 
              className="card p-8 text-center group shimmer-effect cursor-pointer hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 fade-in-up stagger-animation border-t-4 border-t-transparent hover:border-t-blue-500"
              style={{"--stagger": index + 2} as any}
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl bg-hover icon-hover shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <div className="text-blue-600 floating-animation transform group-hover:scale-110 transition-transform duration-300" style={{animationDelay: `${index * 0.2}s`}}>
                    {target.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-hover group-hover:text-blue-600 transition-colors duration-300">
                {target.title}
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {target.description}
              </p>

              <Link 
                href={target.link}
                className="btn-primary w-full inline-block text-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Scopri di più
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}