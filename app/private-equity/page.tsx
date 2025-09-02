import ClientPageTemplate from '@/components/ClientPageTemplate'

export const metadata = {
  title: 'Soluzioni AI per Private Equity - Maverick AI',
  description: 'Massimizziamo il valore delle portfolio companies attraverso l\'implementazione strategica di tecnologie AI avanzate.',
}

export default function PrivateEquityPage() {
  const pageData = {
    clientType: {
      title: "I nostri servizi per i fondi di private equity",
      subtitle: "Massimizza il valore del tuo portfolio con l'intelligenza artificiale",
      description: "Massimizza il valore del tuo portfolio con l'intelligenza artificiale: soluzioni AI-driven per ottimizzare EBITDA, identificare sinergie e accelerare la crescita delle aziende partecipate.",
      heroGradient: "from-emerald-600 via-teal-700 to-cyan-800",
      icon: "📈",
      heroImage: "💎"
    },
    challenges: {
      title: "Sfide comuni dei fondi di private equity",
      items: [
        {
          icon: "🤝",
          title: "Identificazione sinergie post-deal",
          description: "Individuare rapidamente sinergie operative e strategiche post-acquisizione per accelerare l'integrazione aziendale"
        },
        {
          icon: "📊",
          title: "Ottimizzazione EBITDA e ROI",
          description: "Aumentare EBITDA e ritorno sull'investimento attraverso soluzioni AI mirate e personalizzate"
        },
        {
          icon: "⚡",
          title: "Accelerare la creazione di valore",
          description: "Valorizzare rapidamente le aziende in portfolio identificando nuove leve strategiche basate sull'AI"
        }
      ]
    },
    solutions: {
      title: "Come aiutiamo i fondi a creare valore con l'AI",
      description: "In Maverick AI supportiamo fondi e investitori professionali nell'ottimizzazione del portafoglio, integrando strumenti di Intelligenza Artificiale che generano risultati misurabili e un significativo impatto economico e strategico. La nostra consulenza è orientata alla creazione rapida di valore, identificando chiaramente le leve di crescita e massimizzando l'efficienza operativa delle aziende in portfolio.",
      items: [
        {
          title: "Misuriamo il potenziale AI delle aziende partecipate",
          description: "Valutiamo con analisi approfondite lo stato di readiness e le opportunità AI-driven delle aziende partecipate per identificare rapidamente sinergie operative e leve di crescita.",
          features: []
        },
        {
          title: "Definiamo la strategia AI per la creazione di valore nel portfolio",
          description: "Tracciamo una visione strategica chiara e costruiamo piani operativi concreti per massimizzare EBITDA, ROI e accelerare la valorizzazione delle aziende partecipate.",
          features: []
        },
        {
          title: "Ottimizziamo i processi aziendali per massimizzare EBITDA e valore",
          description: "Aumentiamo le performance finanziarie e operative delle partecipate, integrando soluzioni di AI generativa e agentica per automatizzare attività, ridurre costi e aumentare la marginalità.",
          features: []
        },
        {
          title: "Favoriamo l'adozione dell'AI con modelli operativi efficaci",
          description: "Supportiamo le aziende nella definizione di modelli operativi e di governance ottimali, per accelerare e rendere sostenibile la trasformazione digitale e il cambiamento culturale.",
          features: []
        },
        {
          title: "Formiamo il management delle partecipate sull'AI",
          description: "Organizziamo masterclass e workshop pratici per potenziare competenze e consapevolezza del management delle aziende in portfolio, facilitando l'integrazione strategica e operativa dell'AI.",
          features: []
        },
        {
          title: "Realizziamo soluzioni AI personalizzate per esigenze specifiche",
          description: "Sviluppiamo e implementiamo soluzioni AI tailor-made, tecnologicamente agnostiche e pienamente integrate nei modelli operativi delle aziende partecipate, per risultati tangibili e misurabili.",
          features: []
        }
      ]
    },
    cta: {
      title: "Accelera il valore del tuo portfolio",
      description: "Scopri come l'AI può trasformare le tue portfolio companies e massimizzare i ritorni sull'investimento.",
      primaryButton: "Richiedi informazioni",
      secondaryButton: ""
    }
  }

  return <ClientPageTemplate {...pageData} />
}