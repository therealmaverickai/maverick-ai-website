import Link from 'next/link'

export default function AIReadinessBanner() {

  return (
    <section className="bg-white section-padding">
      <div className="container-width">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            Assessment gratuito
          </div>
          
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            La tua azienda è pronta per adottare l'<span style={{ color: '#81BFFF' }}>AI</span>?
          </h2>
          
          {/* Subheading */}
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Scopri in <span className="font-semibold text-gray-900">5 minuti</span> il livello di preparazione della tua azienda 
            con il nostro assessment personalizzato.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="group card p-6 text-center cursor-pointer shimmer-effect">
              <div className="text-3xl mb-3 floating-animation">⏱️</div>
              <div className="text-gray-900 font-medium">5 minuti</div>
            </div>
            <div className="group card p-6 text-center cursor-pointer shimmer-effect">
              <div className="text-3xl mb-3 floating-animation" style={{animationDelay: '0.5s'}}>🎯</div>
              <div className="text-gray-900 font-medium">Risultati immediati</div>
            </div>
            <div className="group card p-6 text-center cursor-pointer shimmer-effect">
              <div className="text-3xl mb-3 floating-animation" style={{animationDelay: '1s'}}>🔒</div>
              <div className="text-gray-900 font-medium">100% gratuito</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="pt-4">
            <Link 
              href="/ai-readiness"
              className="btn-primary text-lg px-12 py-4 inline-flex items-center space-x-3 group"
            >
              <span className="relative z-10">Inizia assessment gratuito</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}