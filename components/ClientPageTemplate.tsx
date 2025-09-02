import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'

interface ClientPageTemplateProps {
  clientType: {
    title: string
    subtitle: string
    description: string
    heroGradient: string
    icon: string
    heroImage: string
  }
  challenges: {
    title: string
    items: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  solutions: {
    title: string
    description?: string
    items: Array<{
      title: string
      description: string
      features: string[]
      highlight?: string
    }>
  }
  benefits?: {
    title: string
    items: Array<{
      stat: string
      label: string
      description: string
    }>
  }
  caseStudy?: {
    title: string
    company: string
    challenge: string
    solution: string
    results: string[]
  }
  cta: {
    title: string
    description: string
    primaryButton: string
    secondaryButton: string
  }
}

export default function ClientPageTemplate({ 
  clientType, 
  challenges, 
  solutions, 
  benefits, 
  caseStudy, 
  cta 
}: ClientPageTemplateProps) {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section - DataPizza Style */}
      <section className="bg-white text-gray-900 section-padding">
        <div className="container-width">
          <div className="text-center max-w-4xl mx-auto">
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              {clientType.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              {clientType.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contatti" className="btn-primary text-lg px-8 py-4 inline-block text-center">
                Scopri le soluzioni
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {challenges.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.items.map((challenge, index) => (
              <div key={index} className="card p-8 text-center group">
                <div className="text-4xl mb-4 icon-hover">{challenge.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {challenge.title}
                </h3>
                <p className="text-gray-600">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-white section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {solutions.title}
            </h2>
            {solutions.description && (
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {solutions.description}
              </p>
            )}
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {solutions.items.map((solution, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
                  <div className="p-8 lg:p-10">
                    <div className="flex items-start mb-6">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-lg font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                        {solution.title}
                      </h3>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {solution.description}
                    </p>
                    
                    {solution.highlight && (
                      <div className="mt-6 inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {solution.highlight}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section (if provided) */}
      {benefits && (
        <section className="bg-gray-900 text-white section-padding">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                {benefits.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.items?.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl font-bold text-blue-400 mb-2 transition-transform duration-300 group-hover:scale-110">
                    {benefit.stat}
                  </div>
                  <div className="text-xl font-semibold mb-4">
                    {benefit.label}
                  </div>
                  <div className="text-gray-300">
                    {benefit.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Study Section (if provided) */}
      {caseStudy && (
        <section className="bg-gray-50 section-padding">
          <div className="container-width">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {caseStudy.title}
              </h2>
            </div>

            <div className="max-w-4xl mx-auto card p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {caseStudy.company}
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Sfida</h4>
                  <p className="text-gray-600">{caseStudy.challenge}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Soluzione</h4>
                  <p className="text-gray-600">{caseStudy.solution}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-4">Risultati</h4>
                  <ul className="text-gray-600 space-y-2">
                    {caseStudy.results.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-4 h-4 text-blue-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section id="contatti" className="bg-gray-900 text-white section-padding">
        <div className="container-width text-center">
          <h2 className="text-4xl font-bold mb-6">
            {cta.title}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {cta.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#contatti" 
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-block text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {cta.primaryButton}
            </a>
            {cta.secondaryButton && (
              <Link 
                href="/ai-readiness"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-xl transition-all duration-300 inline-block text-lg"
              >
                {cta.secondaryButton}
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}