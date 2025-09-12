import Link from 'next/link'

export default function WhoWeServeSection() {
  const approaches = [
    {
      title: "Soluzioni pronte per l'uso",
      description: "Grazie a un framework e ad una metodologia proprietaria, sviluppiamo prototipi in tempi rapidi, li testiamo in contesti reali e li facciamo evolvere in maniera progressiva e controllata, riducendo rischi e costi",
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Ricerca e sperimentazione continua",
      description: "Il nostro team di R&D esplora costantemente le ultime innovazioni AI, per capire quali applicazioni siano mature oggi e come ottimizzare le tecnologie emergenti nei contesti aziendali",
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Integrazione nativa nei processi",
      description: "Le nostre soluzioni non sono esercizi di stile, ma strumenti concreti che si integrano nei tuoi sistemi e processi, rendendo l'adozione dell'AI fluida, sicura e scalabile",
      icon: (
        <svg className="w-12 h-12 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    }
  ]

  return (
    <section id="come-lavoriamo" className="bg-white section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Come lavoriamo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 px-4 fade-in-up">
            Il nostro approccio <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              alla trasformazione AI
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 fade-in-up stagger-animation" style={{"--stagger": 1} as any}>
            Metodologia strutturata, ricerca continua e integrazione nativa: così rendiamo l'AI accessibile e sostenibile
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {approaches.map((approach, index) => (
            <div 
              key={index} 
              className="card p-8 text-center group shimmer-effect cursor-pointer hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 fade-in-up stagger-animation border-t-4 border-t-transparent hover:border-t-blue-500"
              style={{"--stagger": index + 2} as any}
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl bg-hover icon-hover shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <div className="text-blue-600 floating-animation transform group-hover:scale-110 transition-transform duration-300" style={{animationDelay: `${index * 0.2}s`}}>
                    {approach.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-hover group-hover:text-blue-600 transition-colors duration-300">
                {approach.title}
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {approach.description}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}