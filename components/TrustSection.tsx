export default function TrustSection() {
  const stats = [
    { number: "50+", label: "Progetti AI completati", icon: "🚀" },
    { number: "25+", label: "Aziende trasformate", icon: "🏢" },
    { number: "95%", label: "Tasso di successo", icon: "📈" },
    { number: "€2M+", label: "Valore creato", icon: "💎" }
  ]

  const technologies = [
    "OpenAI", "Anthropic", "Google AI", "Microsoft", "Hugging Face", 
    "TensorFlow", "PyTorch", "AWS", "Azure", "Vercel"
  ]

  return (
    <section className="bg-gray-50 bg-dot-pattern bg-dot section-padding border-t border-gray-200">
      <div className="container-width">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-navy-900 mb-1">{stat.number}</div>
              <div className="text-sm text-navy-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-navy-600 font-medium mb-6">
            Trusted by innovative companies worldwide
          </p>
          
          {/* Technology Partners */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-60 hover:opacity-80 transition-opacity duration-300">
              {technologies.map((tech, index) => (
                <div 
                  key={index}
                  className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-navy-700 hover:bg-accent-50 hover:text-accent-600 transition-colors duration-200"
                >
                  {tech}
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-navy-500">
              Partner certificati e tecnologie enterprise
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}