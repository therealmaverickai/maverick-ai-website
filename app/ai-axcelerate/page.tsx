import Header from '@/components/Header'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function AIAcceleratePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-navy-50 to-white section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-navy-900 mb-8">
              AI aXcelerate
            </h1>
            <p className="text-lg sm:text-xl text-navy-700 mb-8 leading-relaxed">
              L'AI sta trasformando il modo in cui le aziende operano, ma molte imprese si trovano bloccate: da dove iniziare per implementarla con successo?
            </p>
            <a href="#contatti" className="btn-primary text-lg px-8 py-4 inline-block">
              Richiedi informazioni
            </a>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              Molte aziende faticano ad adottare l'AI per diversi motivi:
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full mx-auto flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">
                Mancanza di competenze interne
              </h3>
              <p className="text-gray-600">
                Le competenze in ambito AI sono limitate, costose e difficili da reperire sul mercato
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto flex items-center justify-center">
                  <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">
                Difficoltà a identificare use case concreti
              </h3>
              <p className="text-gray-600">
                Spesso le aziende non sanno da dove partire per integrare l'AI nei loro processi
              </p>
            </div>

            <div className="card p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-yellow-100 rounded-full mx-auto flex items-center justify-center">
                  <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-4">
                Timore di costi elevati e implementazioni complesse
              </h3>
              <p className="text-gray-600">
                L'adozione dell'AI è percepita come un investimento rischioso e difficile da gestire
              </p>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg text-navy-700 mb-8">
              Senza un approccio chiaro e pragmatico, molte aziende testano l'AI senza risultati concreti, investendo tempo e risorse in progetti poco utili.
            </p>
            <p className="text-xl font-semibold text-navy-900 mb-8">
              Il nostro percorso AI aXcelerate elimina questi ostacoli e guida la tua azienda passo dopo passo verso un'adozione efficace e sostenibile dell'AI.
            </p>
            <a href="#contatti" className="btn-primary text-lg px-8 py-4 inline-block">
              Prenota una call gratuita
            </a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              Il percorso AI aXcelerate è composto da 3 moduli:
            </h2>
          </div>

          <div className="space-y-12">
            {/* Module 1 */}
            <div className="card p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">AI START</h3>
                  <p className="text-lg text-blue-600 font-semibold mb-4">
                    Scopri le opportunità dell'AI per la tua azienda con un approccio pratico
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Avvia il percorso AI con un workshop interattivo composto sia da una parte di formazione che una parte pratica, in cui esploriamo opportunità concrete e casi d'uso rilevanti per la tua azienda
                  </p>
                </div>
              </div>
            </div>

            {/* Module 2 */}
            <div className="card p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">AI SHAPE</h3>
                  <p className="text-lg text-green-600 font-semibold mb-4">
                    Analizza e valuta gli use case per definire un piano di azione concreto
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Approfondiamo gli use case, analizziamo la fattibilità tecnica ed economica e definiamo una strategia di implementazione concreta
                  </p>
                </div>
              </div>
            </div>

            {/* Module 3 */}
            <div className="card p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">AI BUILD</h3>
                  <p className="text-lg text-purple-600 font-semibold mb-4">
                    Sviluppa e implementa la soluzione AI
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Si passa dalla strategia all'azione: si sviluppa e implementa la soluzione AI, testandola e integrandola nei sistemi aziendali esistenti
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-navy-700 max-w-3xl mx-auto">
              Al termine del percorso, l'azienda avrà identificato e implementato soluzioni innovative che producono risultati concreti nel breve termine, giustificando l'investimento.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6">
              I principali vantaggi del percorso
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Identificazione di use case concreti e applicabili immediatamente
                  </h3>
                  <p className="text-gray-700">
                    Si focalizza sul valore reale da conseguire evitando sperimentazioni inutili
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Sfruttamento rapido del potenziale dell'AI
                  </h3>
                  <p className="text-gray-700">
                    Il percorso strutturato permette di passare velocemente dall'idea all'implementazione, evitando mesi di valutazioni complesse
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Rischio ridotto grazie a un approccio graduale
                  </h3>
                  <p className="text-gray-700">
                    L'adozione dell'AI avviene in fasi progressive: si validano gli step prima di procedere, riducendo l'investimento iniziale
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">
                    Supporto completo, dall'idea all'implementazione
                  </h3>
                  <p className="text-gray-700">
                    Accompagnamento durante tutto il percorso con consulenza strategica e implementazione della soluzione AI più adatta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white section-padding">
        <div className="container-width">
          <div className="text-center">
            <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 rounded-3xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">
                Se desideri approfondire e valutare se AI aXcelerate è adatto alla tua azienda...
              </h2>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Puoi prenotare una call gratuita per ottenere maggiori informazioni, discutere i tuoi obiettivi e valutare il percorso più efficace per te.
              </p>
              <a href="#contatti" className="bg-white text-navy-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-block text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                Prenota una call gratuita
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  )
}