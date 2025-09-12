'use client'

import { useState } from 'react'

export default function CustomPathwaysSection() {
  const [activeLevel, setActiveLevel] = useState<number>(1)

  const levels = [
    {
      id: 1,
      title: "Management e leadership",
      shortTitle: "Management",
      description: "Supportiamo nella definizione della strategia AI e nella costruzione di una visione chiara per decisioni consapevoli",
      details: [
        "Consulenza direzionale e analisi di scenari futuri",
        "Programmi di AI Awareness per executive", 
        "Piano strategico e roadmap di trasformazione AI"
      ],
      color: "#8b5cf6",
      lightColor: "#f3f4f6"
    },
    {
      id: 2,
      title: "Funzioni operative",
      shortTitle: "Operative",
      description: "Formiamo i team all'utilizzo pratico e ridisegniamo i flussi di lavoro per massimizzare i benefici",
      details: [
        "Training pratico sugli strumenti AI",
        "Consulenza per processi specifici",
        "Progetti pilota con misurazione dei risultati"
      ],
      color: "#6366f1",
      lightColor: "#e5e7eb"
    },
    {
      id: 3,
      title: "Intera popolazione aziendale",
      shortTitle: "Popolazione",
      description: "Creiamo le basi culturali per un'adozione diffusa e sicura dell'AI",
      details: [
        "Formazione interattiva e pratica",
        "Percorsi di alfabetizzazione digitale",
        "Workshop e academy di vibe coding"
      ],
      color: "#3b82f6",
      lightColor: "#d1d5db"
    }
  ]

  const handleLevelClick = (levelId: number) => {
    setActiveLevel(levelId)
  }

  return (
    <section id="percorsi-su-misura" className="bg-gray-50 section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Percorsi personalizzati
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 px-4 fade-in-up">
            Percorsi su misura <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              per ogni livello
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto px-4 fade-in-up stagger-animation" style={{"--stagger": 1} as any}>
            Dai c-level al team operativo: diamo supporto a tutti i livelli, ruoli e responsabilità
          </p>
        </div>

        {/* Simple 3-Column Layout */}
        <div className="services-grid max-w-7xl mx-auto">
          {levels.map((level, index) => (
            <div 
              key={level.id}
              className="service-card"
              style={{"--delay": `${index * 0.2}s`} as any}
            >
              <div className="card-header">
                <div 
                  className="card-number"
                  style={{ backgroundColor: level.color }}
                >
                  {level.id}
                </div>
                <h3 className="card-title">{level.title}</h3>
              </div>
              
              <p className="card-description">
                {level.description}
              </p>
              
              <div className="services-section">
                <h4 className="services-title">Servizi inclusi:</h4>
                <ul className="services-list">
                  {level.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="service-item">
                      <span 
                        className="service-bullet"
                        style={{ backgroundColor: level.color }}
                      ></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl p-12 max-w-3xl mx-auto shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Quale percorso è più adatto alla tua organizzazione?
            </h3>
            <p className="text-gray-600 mb-8">
              Contattaci per una valutazione personalizzata e scopri come strutturare il percorso di trasformazione AI più efficace
            </p>
            <a href="#contatti" className="btn-primary text-base px-8 py-3 inline-block text-center">
              Richiedi una valutazione
            </a>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          padding: 40px 20px;
        }

        .service-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          animation: fadeInUp 0.6s ease-out var(--delay) both;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          border-color: #e2e8f0;
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }

        .card-number {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .card-title {
          font-size: 24px;
          font-weight: bold;
          color: #1e293b;
          line-height: 1.3;
          margin: 0;
        }

        .card-description {
          font-size: 16px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .services-section {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .services-title {
          font-size: 18px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 16px;
        }

        .services-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .service-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 15px;
          color: #475569;
          line-height: 1.5;
        }

        .service-item:last-child {
          margin-bottom: 0;
        }

        .service-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 8px;
          flex-shrink: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            padding: 32px 16px;
          }
          
          .service-card {
            padding: 24px;
          }

          .card-title {
            font-size: 20px;
          }

          .card-description {
            font-size: 15px;
            margin-bottom: 24px;
          }

          .services-title {
            font-size: 16px;
            margin-bottom: 12px;
          }

          .service-item {
            font-size: 14px;
            margin-bottom: 10px;
          }
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 24px 16px;
          }
          
          .service-card {
            padding: 24px;
          }

          .card-header {
            gap: 12px;
            margin-bottom: 20px;
          }

          .card-number {
            width: 40px;
            height: 40px;
            font-size: 18px;
            border-radius: 10px;
          }

          .card-title {
            font-size: 18px;
            line-height: 1.4;
          }

          .card-description {
            font-size: 14px;
            margin-bottom: 20px;
          }

          .services-title {
            font-size: 16px;
            margin-bottom: 12px;
          }

          .service-item {
            font-size: 13px;
            margin-bottom: 8px;
          }

          .service-bullet {
            width: 5px;
            height: 5px;
            margin-top: 6px;
          }
        }
      `}</style>
    </section>
  )
}