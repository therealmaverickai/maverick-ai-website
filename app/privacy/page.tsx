import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy - Maverick AI',
  description: 'Informativa sulla privacy e trattamento dei dati personali di Maverick AI.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="bg-white section-padding">
        <div className="container-width">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-xl text-gray-600 mb-8">
                Ultimo aggiornamento: 24 aprile 2023
              </p>
              
              <p className="mb-8">
                Questa Privacy Policy descrive le nostre politiche e procedure sulla raccolta, uso e divulgazione 
                delle tue informazioni quando utilizzi il Servizio e ti informa sui tuoi diritti alla privacy e 
                come la legge ti protegge.
              </p>
              
              <p className="mb-8">
                Utilizziamo i tuoi Dati Personali per fornire e migliorare il Servizio. Utilizzando il Servizio, 
                accetti la raccolta e l'uso delle informazioni in conformità con questa Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Interpretazione e Definizioni</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Interpretazione</h3>
              <p>
                Le parole la cui lettera iniziale è maiuscola hanno significati definiti nelle seguenti condizioni. 
                Le seguenti definizioni hanno lo stesso significato indipendentemente dal fatto che appaiano al 
                singolare o al plurale.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Definizioni</h3>
              <p>Ai fini di questa Privacy Policy:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>Account</strong> significa un account unico creato per te per accedere al nostro Servizio o parti del nostro Servizio.</li>
                <li><strong>Affiliata</strong> significa un'entità che controlla, è controllata da o è sotto il controllo comune di una parte.</li>
                <li><strong>Azienda</strong> (denominata "l'Azienda", "Noi", "Nostro" in questo Accordo) si riferisce a Maverick AI s.r.l., Viale Lunigiana 23, 20125 Milano, Italia.</li>
                <li><strong>Cookie</strong> sono piccoli file che vengono inseriti sul tuo computer, dispositivo mobile o qualsiasi altro dispositivo da un sito web.</li>
                <li><strong>Paese</strong> si riferisce a: Italia</li>
                <li><strong>Dispositivo</strong> significa qualsiasi dispositivo che può accedere al Servizio come un computer, un cellulare o un tablet digitale.</li>
                <li><strong>Dati Personali</strong> sono qualsiasi informazione che si riferisce a un individuo identificato o identificabile.</li>
                <li><strong>Servizio</strong> si riferisce al Sito Web.</li>
                <li><strong>Sito Web</strong> si riferisce a Maverick AI, accessibile da www.maverickai.it</li>
                <li><strong>Tu</strong> significa l'individuo che accede o utilizza il Servizio.</li>
              </ul>
              
              <p className="mt-6">
                <strong>Informazioni Aziendali:</strong><br/>
                Ragione sociale: Maverick s.r.l.<br/>
                Sede legale: Viale Lunigiana 23, 20125 Milano<br/>
                Codice Fiscale e Partita IVA: 14113510961<br/>
                Capitale Sociale: € 10.000,00 i.v.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Raccolta e Utilizzo dei Tuoi Dati Personali</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Tipi di Dati Raccolti</h3>
              
              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Dati Personali</h4>
              <p>Durante l'utilizzo del nostro Servizio, potremmo chiederti di fornirci alcune informazioni di identificazione personale che possono essere utilizzate per contattarti o identificarti. Le informazioni di identificazione personale possono includere, ma non sono limitate a:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Indirizzo email</li>
                <li>Nome e cognome</li>
                <li>Dati di utilizzo</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Dati di Utilizzo</h4>
              <p>I Dati di Utilizzo vengono raccolti automaticamente quando si utilizza il Servizio.</p>
              <p className="mt-4">
                I Dati di Utilizzo possono includere informazioni come l'indirizzo del Protocollo Internet del tuo Dispositivo 
                (ad esempio indirizzo IP), tipo di browser, versione del browser, le pagine del nostro Servizio che visiti, 
                l'ora e la data della tua visita, il tempo trascorso su quelle pagine, identificatori unici del dispositivo 
                e altri dati diagnostici.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Informazioni dai Servizi Social Media di Terze Parti</h4>
              <p>L'Azienda ti consente di creare un account e accedere per utilizzare il Servizio attraverso i seguenti Servizi Social Media di Terze Parti:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Google</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>LinkedIn</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Tecnologie di Tracciamento e Cookie</h4>
              <p>Utilizziamo Cookie e tecnologie di tracciamento simili per tracciare l'attività sul nostro Servizio e memorizzare determinate informazioni. Le tecnologie di tracciamento utilizzate sono beacon, tag e script per raccogliere e tracciare informazioni e per migliorare e analizzare il nostro Servizio.</p>
              
              <p className="mt-4">Utilizziamo sia Cookie di Sessione che Persistenti per i seguenti scopi:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>Cookie Necessari/Essenziali:</strong> Questi Cookie sono essenziali per fornirti i servizi disponibili attraverso il Sito Web</li>
                <li><strong>Cookie di Accettazione Policy:</strong> Questi Cookie identificano se gli utenti hanno accettato l'uso dei cookie sul Sito Web</li>
                <li><strong>Cookie di Funzionalità:</strong> Questi Cookie ci permettono di ricordare le scelte che fai quando utilizzi il Sito Web</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Utilizzo dei Tuoi Dati Personali</h2>
              <p>L'Azienda può utilizzare i Dati Personali per i seguenti scopi:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>Per fornire e mantenere il nostro Servizio:</strong> incluso il monitoraggio dell'utilizzo del nostro Servizio</li>
                <li><strong>Per gestire il Tuo Account:</strong> per gestire la tua registrazione come utente del Servizio</li>
                <li><strong>Per l'esecuzione di un contratto:</strong> lo sviluppo, conformità e intraprendere il contratto di acquisto per prodotti, articoli o servizi che hai acquistato</li>
                <li><strong>Per contattarti:</strong> Per contattarti tramite email, telefonate, SMS o altre forme equivalenti di comunicazione elettronica</li>
                <li><strong>Per fornirti notizie, offerte speciali e informazioni generali:</strong> su altri beni, servizi ed eventi che offriamo simili a quelli che hai già acquistato o richiesto</li>
                <li><strong>Per gestire le tue richieste:</strong> Per partecipare e gestire le tue richieste a noi</li>
                <li><strong>Per trasferimenti aziendali:</strong> Potremmo utilizzare le tue informazioni per valutare o condurre una fusione, cessione, ristrutturazione</li>
                <li><strong>Per altri scopi:</strong> Potremmo utilizzare le tue informazioni per altri scopi, come analisi dei dati, identificazione delle tendenze di utilizzo</li>
              </ul>
              
              <p className="mt-6">Possiamo condividere le tue informazioni personali nelle seguenti situazioni:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>Con Fornitori di Servizi:</strong> Potremmo condividere le tue informazioni personali con Fornitori di Servizi per monitorare e analizzare l'uso del nostro Servizio</li>
                <li><strong>Per trasferimenti aziendali:</strong> Potremmo condividere o trasferire le tue informazioni personali in relazione a fusioni, vendite</li>
                <li><strong>Con Affiliate:</strong> Potremmo condividere le tue informazioni con le nostre affiliate</li>
                <li><strong>Con partner commerciali:</strong> Potremmo condividere le tue informazioni con i nostri partner commerciali</li>
                <li><strong>Con il tuo consenso:</strong> Potremmo divulgare le tue informazioni personali per qualsiasi altro scopo con il tuo consenso</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">4. Base giuridica del trattamento</h2>
              <p>
                Il trattamento dei tuoi dati personali è basato su diverse basi giuridiche, tra cui:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Il tuo consenso esplicito</li>
                <li>L'esecuzione di un contratto di cui sei parte</li>
                <li>Il nostro legittimo interesse commerciale</li>
                <li>L'adempimento di obblighi legali</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">5. Condivisione dei dati</h2>
              <p>
                Non vendiamo, scambiamo o trasferiamo in altro modo i tuoi dati personali a terze parti, 
                tranne nei seguenti casi:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Fornitori di servizi che ci aiutano a gestire il nostro business</li>
                <li>Autorità competenti quando richiesto dalla legge</li>
                <li>In caso di fusione o acquisizione aziendale</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">6. Sicurezza dei dati</h2>
              <p>
                Implementiamo misure di sicurezza tecniche e organizzative appropriate per proteggere 
                i tuoi dati personali da accessi non autorizzati, alterazioni, divulgazioni o distruzioni.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">7. I tuoi diritti</h2>
              <p>In conformità al GDPR, hai il diritto di:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Accedere ai tuoi dati personali</li>
                <li>Rettificare dati inesatti o incompleti</li>
                <li>Cancellare i tuoi dati ("diritto all'oblio")</li>
                <li>Limitare il trattamento dei tuoi dati</li>
                <li>Portabilità dei dati</li>
                <li>Opporti al trattamento</li>
                <li>Revocare il consenso in qualsiasi momento</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">8. Cookie</h2>
              <p>
                Il nostro sito utilizza cookie essenziali per il funzionamento del sito e cookie analitici 
                per migliorare l'esperienza utente. Puoi gestire le preferenze sui cookie attraverso 
                le impostazioni del tuo browser.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">9. Conservazione dei dati</h2>
              <p>
                Conserviamo i tuoi dati personali solo per il tempo necessario a raggiungere le finalità 
                per cui sono stati raccolti, o come richiesto dalla legge.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">10. Contatti</h2>
              <p>
                Per qualsiasi domanda riguardo questa privacy policy o per esercitare i tuoi diritti, 
                puoi contattarci:
              </p>
              <ul className="list-none space-y-2 mt-4">
                <li><strong>Email:</strong> info@maverickai.it</li>
                <li><strong>Indirizzo:</strong> Maverick s.r.l., Viale Lunigiana 23, 20125 Milano</li>
                <li><strong>Titolare del trattamento:</strong> Maverick s.r.l.</li>
                <li><strong>Partita IVA:</strong> 14113510961</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">11. Modifiche alla privacy policy</h2>
              <p>
                Ci riserviamo il diritto di aggiornare questa privacy policy. Ti informeremo di eventuali 
                modifiche sostanziali tramite email o attraverso un avviso sul nostro sito web.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}