export default function ProductsSection() {
  const product = {
    name: "AI aXcelerate",
    cta: "Scopri AI aXcelerate"
  }

  return (
    <section id="prodotti" className="bg-white section-padding">
      <div className="container-width">
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="text-center">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-900 mb-8 px-4">
                AI aXcelerate - Il programma per accelerare l'adozione dell'AI in azienda
              </h2>
              
              {/* Description */}
              <p className="text-base sm:text-lg text-navy-700 max-w-4xl mx-auto px-4 leading-relaxed mb-8">
                Un percorso end-to-end pensato per guidare le imprese nell'integrazione dell'intelligenza artificiale. AIxcelerate combina consulenza strategica, design dei processi e sviluppo tecnologico, accompagnando le aziende:
                <br /><br />
                dall'esplorazione delle opportunità AI,
                <br /><br />
                alla definizione e prioritizzazione degli use case,
                <br /><br />
                fino alla prototipazione e implementazione delle soluzioni.
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