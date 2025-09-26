const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DEFAULT_USECASE_PROMPT = `
Come senior AI strategy consultant di Maverick AI, genera una lista di use case AI specifici e prioritizzati per {{company}} nel settore {{industry}}.

INFORMAZIONI AZIENDA:
- Nome: {{company}}
- Settore: {{industry}}
- Dimensione: {{companySize}}
- Ruolo contatto: {{role}}
- Progetti AI attuali: {{currentProjects}}
- Aree AI di interesse: {{aiAreas}}
- Sfide principali: {{mainChallenges}}

ASSESSMENT RISULTATI:
- Punteggio generale: {{overallScore}}/100
- Cluster: {{cluster}}
- Strategia AI: {{strategyScore}}%
- Tecnologia: {{technologyScore}}%
- Competenze: {{peopleScore}}%
- Governance: {{governanceScore}}%
- Dati: {{dataScore}}%
- Cultura: {{cultureScore}}%

RICHIESTA:
Genera un JSON con 4-6 use case AI specifici per {{company}}, ordinati per priorità basata su:
1. Impatto potenziale sul business
2. Facilità di implementazione data la maturità attuale
3. Allineamento con le sfide identificate
4. ROI atteso nel breve-medio termine

Per ogni use case, fornisci:
- title: Nome descrittivo del caso d'uso (max 50 caratteri)
- description: Descrizione dettagliata di come l'AI risolverebbe il problema specifico (100-150 parole)
- impact: Impatto concreto atteso sul business con metriche specifiche
- complexity: "Bassa", "Media" o "Alta" basata sulla maturità attuale
- roi: Stima del ROI e tempi di realizzazione

Rispondi in formato JSON:
{
  "useCases": [
    {
      "title": "Nome Use Case",
      "description": "Descrizione dettagliata...",
      "impact": "Impatto specifico con metriche...",
      "complexity": "Bassa|Media|Alta",
      "roi": "ROI atteso e tempi..."
    }
  ]
}

Personalizza ogni use case per il settore {{industry}} e considera la maturità AI attuale dell'azienda ({{cluster}}). Usa un linguaggio professionale e consulenziale.
`;

async function addUseCasePrompt() {
  try {
    // Check if prompt already exists
    const existingPrompt = await prisma.prompt.findUnique({
      where: { promptId: 'aiUseCases' }
    });

    if (existingPrompt) {
      console.log('AI Use Cases prompt already exists. Updating...');
      await prisma.prompt.update({
        where: { promptId: 'aiUseCases' },
        data: {
          content: DEFAULT_USECASE_PROMPT,
          updatedAt: new Date()
        }
      });
      console.log('AI Use Cases prompt updated successfully!');
    } else {
      console.log('Creating new AI Use Cases prompt...');
      await prisma.prompt.create({
        data: {
          promptId: 'aiUseCases',
          name: 'AI Use Cases Generation',
          description: 'Generates specific AI use cases based on assessment results',
          content: DEFAULT_USECASE_PROMPT,
          category: 'assessment',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      console.log('AI Use Cases prompt created successfully!');
    }

  } catch (error) {
    console.error('Error managing AI Use Cases prompt:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addUseCasePrompt();