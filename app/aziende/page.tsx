import ClientPageTemplate from '@/components/ClientPageTemplate'

export const metadata = {
  title: 'Soluzioni AI per Aziende - Maverick AI',
  description: 'Trasformiamo le aziende con soluzioni AI avanzate per aumentare efficienza, produttività e competitività nel mercato.',
}

export default function AziendePage() {
  const pageData = {
    clientType: {
      title: "I nostri servizi per le aziende",
      subtitle: "Trasformiamo il tuo business con l'Intelligenza Artificiale",
      description: "Aiutiamo aziende di ogni dimensione ad adottare l'AI in modo strategico, concreto e sostenibile, per migliorare processi, aumentare competitività e massimizzare le performance.",
      heroGradient: "from-blue-600 via-blue-700 to-indigo-800",
      icon: "🏢",
      heroImage: "🚀"
    },
    challenges: {
      title: "Molte Aziende Faticano ad Adottare l'AI per Diversi Motivi",
      items: [
        {
          icon: "👥",
          title: "Mancanza di Competenze Interne",
          description: "Le competenze in ambito AI sono limitate, costose e difficili da reperire sul mercato"
        },
        {
          icon: "🎯",
          title: "Difficoltà a Identificare Use Case Concreti",
          description: "Spesso le aziende non sanno da dove partire per integrare l'AI nei loro processi"
        },
        {
          icon: "💰",
          title: "Timore di Costi Elevati e Implementazioni Complesse",
          description: "L'adozione dell'AI è percepita come un investimento rischioso e difficile da gestire"
        }
      ]
    },
    solutions: {
      title: "Come Aiutiamo le Aziende a Crescere con l'AI",
      description: "In Maverick AI trasformiamo la complessità dell'Intelligenza Artificiale in risultati concreti, misurabili e sostenibili. Supportiamo le aziende lungo tutto il percorso di adozione dell'AI, con un approccio pratico, pragmatico e orientato alla creazione di valore.",
      items: [
        {
          title: "Misuriamo il Livello di Maturità AI della Tua Azienda",
          description: "Valutiamo rapidamente lo stato di readiness della tua organizzazione per identificare i processi più adatti a generare valore immediato con l'AI",
          features: [
            "AI Readiness Assessment",
            "Process mapping & analysis",
            "Quick wins identification",
            "ROI potential evaluation",
            "Implementation priority matrix",
            "Gap analysis report"
          ],
        },
        {
          title: "Definiamo l'AI Vision dell'Azienda e il Piano Strategico",
          description: "Sviluppiamo una visione strategica chiara e una roadmap operativa concreta per integrare l'AI nel tuo modello di business",
          features: [
            "AI strategy development",
            "Business case creation",
            "Technology roadmap",
            "Budget planning & allocation",
            "Success metrics definition",
            "Change management plan"
          ],
        },
        {
          title: "Ottimizziamo i Processi con Soluzioni AI Mirate",
          description: "Miglioriamo le performance operative automatizzando attività ripetitive, riducendo i costi e massimizzando produttività e customer experience",
          features: [
            "Process automation",
            "Custom AI solutions",
            "Market solutions integration",
            "Performance monitoring",
            "Continuous optimization",
            "Scalable architecture"
          ],
        },
        {
          title: "Formiamo i Team con Workshop e Masterclass",
          description: "Formiamo e coinvolgiamo i tuoi team, aumentandone le competenze digitali e rendendoli protagonisti attivi del cambiamento",
          features: [
            "Executive AI workshops",
            "Technical masterclass",
            "Hands-on training",
            "Change management support",
            "Skill assessment & development",
            "Continuous learning programs"
          ],
        },
        {
          title: "Supportiamo la Trasformazione Organizzativa",
          description: "Disegniamo modelli operativi efficaci e sostenibili, accompagnandoti nel percorso di cambiamento culturale e operativo",
          features: [
            "Operating model redesign",
            "Organizational restructuring",
            "Cultural transformation",
            "Process reengineering",
            "Performance management",
            "Governance framework"
          ],
        },
        {
          title: "Realizziamo Soluzioni AI Personalizzate su Misura",
          description: "Identifichiamo e implementiamo soluzioni customizzate, agnostiche sulla tecnologia e perfettamente integrate nel tuo contesto aziendale",
          features: [
            "Custom AI development",
            "Technology-agnostic approach",
            "Seamless integration",
            "Scalable architecture",
            "Quality assurance",
            "Maintenance & support"
          ],
        }
      ]
    },
    cta: {
      title: "Trasforma la Tua Azienda con l'AI",
      description: "Scopri come le nostre soluzioni possono rivoluzionare i tuoi processi aziendali e aumentare la competitività.",
      primaryButton: "Richiedi Consulenza Gratuita",
      secondaryButton: "AI Readiness Assessment"
    }
  }

  return <ClientPageTemplate {...pageData} />
}