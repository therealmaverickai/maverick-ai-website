import ClientPageTemplate from '@/components/ClientPageTemplate'

export const metadata = {
  title: 'Soluzioni AI per Imprenditori - Maverick AI',
  description: 'Accompagniamo imprenditori visionari nella costruzione di startup innovative con AI integrata fin dal primo giorno.',
}

export default function ImprenditoriPage() {
  const pageData = {
    clientType: {
      title: "I nostri servizi per gli aspiranti imprenditori",
      subtitle: "Supportiamo imprenditori e startup nella trasformazione delle idee AI-driven",
      description: "Supportiamo imprenditori e startup nella trasformazione delle idee AI-driven in realtà imprenditoriali, accelerando validazione, sviluppo, lancio sul mercato e fundraising.",
      heroGradient: "from-purple-600 via-violet-700 to-indigo-800",
      icon: "💡",
      heroImage: "🌟"
    },
    challenges: {
      title: "Le sfide che affrontano gli aspiranti imprenditori",
      items: [
        {
          icon: "🎯",
          title: "Validare rapidamente l'idea sul mercato in tempi brevi",
          description: "Testare rapidamente il mercato e ridurre al minimo rischi, tempi e investimenti iniziali"
        },
        {
          icon: "⚡",
          title: "Costruire MVP di successo con costi contenuti",
          description: "Sviluppare un prodotto minimo funzionante in tempi rapidi per testare e validare concretamente l'idea"
        },
        {
          icon: "🤝",
          title: "Trovare qualcuno che li segua in tutto il processo",
          description: "Trovare un partner che dia supporto lungo tutto il percorso, dall'ideazione, allo sviluppo fino al go-to-market"
        }
      ]
    },
    solutions: {
      title: "Come aiutiamo gli imprenditori a sviluppare la propria idea",
      description: "In Maverick AI, accompagniamo gli imprenditori in ogni fase del percorso di creazione della startup. Dalla validazione dell'idea al lancio sul mercato, offriamo supporto strategico, operativo e tecnico, permettendo una crescita rapida e sostenibile.",
      items: [
        {
          title: "Validiamo rapidamente la tua idea imprenditoriale",
          description: "Attraverso sessioni dedicate, analizziamo e testiamo la fattibilità del tuo progetto, individuando il potenziale di mercato e riducendo i rischi di avvio.",
          features: []
        },
        {
          title: "Definiamo il modello di business e la strategia di lancio",
          description: "Costruiamo con te una strategia efficace e una roadmap concreta per portare sul mercato il tuo progetto AI, identificando priorità e azioni chiave.",
          features: []
        },
        {
          title: "Sviluppiamo insieme il minimum viable product (MVP)",
          description: "Ti supportiamo nello sviluppo rapido di un MVP basato su AI, pronto per la validazione sul mercato e la raccolta di feedback reali.",
          features: []
        },
        {
          title: "Acceleriamo la crescita con fundraising e network strategico",
          description: "Ti offriamo accesso diretto a investitori qualificati, business angels e mentor esperti per accelerare il finanziamento e la crescita della tua startup AI-driven.",
          features: []
        },
        {
          title: "Formiamo il tuo team sull'AI con workshop e masterclass",
          description: "Incrementiamo le competenze digitali e strategiche del tuo team attraverso percorsi educativi pratici sull'AI, migliorando execution e velocità di sviluppo.",
          features: []
        },
        {
          title: "Sviluppiamo soluzioni AI su misura per la tua startup",
          description: "Realizziamo soluzioni AI personalizzate, agnostiche sulla tecnologia, che rispondano esattamente ai bisogni del tuo modello di business, garantendo scalabilità e successo.",
          features: []
        }
      ]
    },
    cta: {
      title: "Realizza la tua visione imprenditoriale",
      description: "Trasforma la tua idea in una startup di successo con il supporto dei nostri esperti e l'AI come competitive advantage.",
      primaryButton: "Richiedi informazioni",
      secondaryButton: ""
    }
  }

  return <ClientPageTemplate 
    clientType={pageData.clientType}
    challenges={pageData.challenges}
    solutions={pageData.solutions}
    cta={pageData.cta}
  />
}