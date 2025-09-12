import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import WhoWeServeSection from '@/components/WhoWeServeSection'
import WhatWeDoSection from '@/components/WhatWeDoSection'
import CustomPathwaysSection from '@/components/CustomPathwaysSection'
import ProductsSection from '@/components/ProductsSection'
import AIReadinessBanner from '@/components/AIReadinessBanner'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  const faqs = [
    {
      question: "Cos'è l'Intelligenza Artificiale Generativa e come può aiutare la mia azienda?",
      answer: "L'Intelligenza Artificiale Generativa è una tecnologia che può creare contenuti originali come testi, immagini, codice e analisi. Per le aziende significa automatizzare processi ripetitivi, migliorare la qualità delle decisioni, generare contenuti marketing personalizzati e sviluppare soluzioni innovative. Ad esempio, può automatizzare la creazione di offerte commerciali, analizzare grandi volumi di dati per identificare opportunità di business, o creare chatbot intelligenti per il customer service."
    },
    {
      question: "Quanto tempo ci vuole per implementare soluzioni AI nella mia azienda?",
      answer: "I tempi variano in base alla complessità del progetto:\n\n• Consulenza e assessment AI: 2-4 settimane\n• Implementazione di tool AI esistenti: 4-8 settimane\n• Sviluppo di soluzioni personalizzate: 2-6 mesi\n• Formazione team aziendali: 1-3 mesi\n\nIl nostro approccio prevede sempre una fase pilota per testare rapidamente le soluzioni e poi scalare gradualmente."
    },
    {
      question: "Quali sono i costi per implementare l'AI in azienda?",
      answer: "I costi dipendono dalle dimensioni dell'azienda e dal tipo di soluzione:\n\n• Consulenza strategica: da €5.000 a €15.000\n• Implementazione tool esistenti: da €10.000 a €30.000\n• Sviluppo soluzioni custom: da €25.000 a €100.000+\n• Formazione team: da €3.000 a €10.000\n\nOffriamo sempre una consulenza gratuita iniziale per valutare le tue esigenze e fornirti un preventivo personalizzato."
    },
    {
      question: "La mia azienda è pronta per l'AI? Come posso valutarlo?",
      answer: "Ogni azienda può beneficiare dell'AI, indipendentemente dalle dimensioni. I requisiti base sono:\n\n• Processi ripetitivi che possono essere automatizzati\n• Dati digitali disponibili (anche base)\n• Apertura al cambiamento da parte del team\n• Budget per investimenti in tecnologia\n\nIl nostro AI Readiness Assessment gratuito ti aiuta a capire esattamente qual è il tuo punto di partenza e quali opportunità esistono."
    },
    {
      question: "Che differenza c'è tra AI Generativa e AI tradizionale?",
      answer: "L'AI tradizionale analizza dati e fornisce risultati basati su pattern esistenti (es. previsioni di vendita, classificazione email). L'AI Generativa invece crea contenuti nuovi e originali:\n\n• Genera testi, immagini, codice da zero\n• Personalizza comunicazioni per ogni cliente\n• Crea soluzioni innovative a problemi complessi\n• Si adatta e apprende dal contesto aziendale\n\nL'AI Generativa è più versatile e può essere applicata a molti più processi aziendali."
    },
    {
      question: "I miei dati sono sicuri quando uso soluzioni AI?",
      answer: "La sicurezza è la nostra priorità assoluta:\n\n• Utilizziamo solo piattaforme AI enterprise con certificazioni di sicurezza\n• I tuoi dati rimangono sempre sotto il tuo controllo\n• Implementiamo protocolli di crittografia avanzata\n• Rispettiamo rigorosamente GDPR e normative italiane\n• Non condividiamo mai dati aziendali con terze parti\n\nTutte le nostre soluzioni sono progettate con privacy-by-design e sicurezza ai massimi livelli."
    }
  ]

  // Check if we're in a development/preview environment
  const isPreviewEnvironment = typeof window !== 'undefined' && (
    window.location.hostname.includes('git-') || 
    window.location.hostname.includes('preview') || 
    window.location.hostname.includes('vercel.app') ||
    window.location.hostname === 'localhost'
  )

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <WhatWeDoSection />
      <WhoWeServeSection />
      <CustomPathwaysSection />
      <ProductsSection />
      <AIReadinessBanner />
      {isPreviewEnvironment && (
        <FAQSection 
          faqs={faqs} 
          title="Domande Frequenti sull'AI"
          description="Risposte alle domande più comuni sull'implementazione dell'Intelligenza Artificiale in azienda"
        />
      )}
      <ContactSection />
      <Footer />
    </main>
  )
}