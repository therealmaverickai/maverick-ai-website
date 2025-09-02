export default function ProductsSection() {
  const product = {
    name: "AI aXcelerate",
    tagline: "Accelera la tua trasformazione digitale",
    description: "Piattaforma completa per implementare rapidamente soluzioni AI nel tuo business, con moduli pre-configurati e personalizzabili per diversi settori industriali.",
    features: [
      "Deploy rapido (< 30 giorni)",
      "Moduli industry-specific",
      "Interfaccia user-friendly",
      "Scalabilità enterprise",
      "Support 24/7",
      "Analytics avanzati",
      "Sicurezza enterprise",
      "Integrazione seamless"
    ],
    cta: "Scopri AI aXcelerate",
    image: "🚀",
    gradient: "from-blue-500 via-purple-600 to-indigo-700"
  }

  return (
    <section id="prodotti" className="bg-white section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-6 px-4">
            Il nostro programma
          </h2>
          <p className="text-lg sm:text-xl text-navy-700 max-w-3xl mx-auto px-4">
            La piattaforma AI proprietaria progettata per accelerare il successo del tuo business
          </p>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              {/* Product Title */}
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4">
                {product.name}
              </h3>
              
              {/* Tagline */}
              <p className="text-lg sm:text-xl md:text-2xl text-accent-600 font-semibold mb-6 sm:mb-8">
                {product.tagline}
              </p>
              
              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-navy-600 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto px-4">
                {product.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <a href="#contatti" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-block text-center">
                  {product.cta}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Pronto a rivoluzionare il tuo business?
              </h3>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Scopri come AI aXcelerate può accelerare la tua trasformazione digitale con una demo personalizzata
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contatti" className="bg-white text-navy-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-block text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                  Parla con un esperto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}