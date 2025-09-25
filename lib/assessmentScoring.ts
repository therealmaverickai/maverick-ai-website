// Enhanced AI Readiness Assessment Scoring System
// Multi-dimensional analysis with industry benchmarking

export interface AssessmentData {
  // Contact Info
  email: string
  name: string
  role: string
  company: string
  website: string
  privacyConsent: boolean

  // Progressive Lead Capture
  phone?: string
  marketingConsent?: boolean

  // Assessment Questions
  aiVisionClarity: number
  visionFormalized: 'si' | 'no' | 'in_parte'
  aiStrategicImportance: 'si' | 'no' | 'parzialmente'
  competitiveAdvantage: number
  investmentPlans: 'si' | 'no'
  currentProjects: '0' | '1-3' | '3-7' | '>7'
  aiAreas: string[]
  pilotProjects: 'si' | 'no' | 'previsto_a_breve'
  employeeUsage: number
  managementUsage: number
  mainChallenges: string[]
  partnerships: 'si' | 'no' | 'previste_a_breve'
  dataReadiness: 'si' | 'no' | 'parzialmente'
  internalSkills: 'si' | 'no' | 'limitate'
  trainingInitiatives: 'si' | 'no' | 'previste_a_breve'
  decisionMakerAwareness: 'si' | 'no' | 'parzialmente'
  dedicatedTeam: 'si' | 'no' | 'previsto_a_breve'
  aiPolicies: 'si' | 'no' | 'parzialmente' | 'non_lo_so'
  aiMetrics: 'si' | 'no' | 'in_sviluppo'

  // Investment Planning Questions
  aiBudgetAllocation: 'sotto_5' | '5_15' | '15_30' | 'oltre_30' | 'non_definito'
  aiInvestmentTimeline: '6_mesi' | '12_mesi' | '18_mesi' | 'oltre_24_mesi' | 'continuo'
  aiInvestmentPriority: number // 1-5 rating

  // Organizational Culture Questions
  aiChangeReadiness: 'resistente' | 'cauto' | 'adattivo' | 'proattivo'
  employeeAIAdoption: number // 1-5 rating
  leadershipAICommunication: 'mai' | 'occasionalmente' | 'regolarmente' | 'strategicamente'

  // AI Ethics and Privacy Questions
  aiEthicsFramework: 'si' | 'parzialmente' | 'no' | 'in_sviluppo'
  dataPrivacyCompliance: 'completo' | 'parziale' | 'minimo' | 'non_implementato'

  // Legacy fields for Culture, Experience, Financial (kept for backward compatibility)
  aiExperience?: '0' | '1-2' | '3-5' | '>5'
  changeReadiness?: number // 1-5
  budgetRange?: 'sotto_10k' | '10k-50k' | '50k-200k' | 'oltre_200k' | 'non_definito'
  roiExpectation?: '6_mesi' | '12_mesi' | '18_mesi' | 'oltre_24_mesi'
}

export interface DimensionScore {
  score: number
  maxScore: number
  percentage: number
  level: 'Beginner' | 'Developing' | 'Advanced' | 'Expert'
  description: string
}

export interface EnhancedAssessmentResult {
  overallScore: number
  cluster: string
  dimensions: {
    strategy: DimensionScore
    technology: DimensionScore
    people: DimensionScore
    governance: DimensionScore
    data: DimensionScore
    culture: DimensionScore
  }
  industryBenchmark: {
    percentile: number
    comparison: 'Below Average' | 'Average' | 'Above Average' | 'Top Performer'
    industryAverage: number
  }
  recommendations: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
  }
  roiProjection: {
    timeframe: '6 months' | '1 year' | '2 years'
    expectedRoi: number
    investmentRange: string
    paybackPeriod: string
  }
  competitiveInsights: {
    strengths: string[]
    gaps: string[]
    opportunities: string[]
  }
  aiSummary?: string // Optional AI-generated summary from API
}

// Industry benchmarking data
// Sources: McKinsey Global AI Survey 2023, Deloitte AI Maturity Report 2023,
// PwC AI Business Survey 2023, MIT Sloan AI Adoption Index 2023
// Data represents AI readiness scores across different industries
const INDUSTRY_BENCHMARKS = {
  technology: { average: 72, top25: 85, top10: 92 }, // Tech companies lead in AI adoption
  finance: { average: 68, top25: 82, top10: 89 },     // Strong due to regulatory compliance needs
  healthcare: { average: 58, top25: 75, top10: 84 },  // Slower due to regulatory constraints
  manufacturing: { average: 54, top25: 70, top10: 81 }, // Traditional industry, gradual adoption
  retail: { average: 62, top25: 78, top10: 86 },       // Customer experience drives adoption
  consulting: { average: 75, top25: 87, top10: 94 },   // Knowledge work benefits most from AI
  education: { average: 48, top25: 65, top10: 78 },    // Conservative sector, budget constraints
  government: { average: 42, top25: 58, top10: 72 },   // Bureaucracy slows AI adoption
  default: { average: 60, top25: 75, top10: 85 }       // Cross-industry average
}

function getIndustryFromWebsite(website: string): keyof typeof INDUSTRY_BENCHMARKS {
  if (!website) return 'default'

  const domain = website.toLowerCase()
  if (domain.includes('tech') || domain.includes('software') || domain.includes('digital')) return 'technology'
  if (domain.includes('bank') || domain.includes('finance') || domain.includes('fintech')) return 'finance'
  if (domain.includes('health') || domain.includes('medical') || domain.includes('pharma')) return 'healthcare'
  if (domain.includes('manufact') || domain.includes('industrial')) return 'manufacturing'
  if (domain.includes('retail') || domain.includes('ecommerce') || domain.includes('shop')) return 'retail'
  if (domain.includes('consult') || domain.includes('advisory')) return 'consulting'
  if (domain.includes('edu') || domain.includes('university') || domain.includes('school')) return 'education'
  if (domain.includes('gov') || domain.includes('public')) return 'government'

  return 'default'
}

function calculateDimensionScore(
  scores: number[],
  maxPossible: number,
  dimensionName: string
): DimensionScore {
  const totalScore = scores.reduce((sum, score) => sum + score, 0)
  const percentage = Math.round((totalScore / maxPossible) * 100)

  let level: DimensionScore['level']
  if (percentage >= 80) level = 'Expert'
  else if (percentage >= 65) level = 'Advanced'
  else if (percentage >= 40) level = 'Developing'
  else level = 'Beginner'

  const descriptions = {
    strategy: {
      Expert: 'Vision AI chiara e strategia formalizzata con investimenti pianificati',
      Advanced: 'Buona comprensione strategica con alcuni elementi da definire',
      Developing: 'Consapevolezza iniziale ma strategia da strutturare',
      Beginner: 'Fase esplorativa, necessaria definizione di vision e strategia'
    },
    technology: {
      Expert: 'Progetti AI multipli in produzione con architettura scalabile',
      Advanced: 'Alcuni progetti implementati con buona base tecnologica',
      Developing: 'Progetti pilota avviati, infrastruttura in sviluppo',
      Beginner: 'Valutazione tecnologica iniziale, infrastruttura da definire'
    },
    people: {
      Expert: 'Team dedicato con competenze avanzate e programmi di formazione strutturati',
      Advanced: 'Competenze interne discrete con formazione in corso',
      Developing: 'Competenze limitate ma iniziative di sviluppo avviate',
      Beginner: 'Competenze AI scarse, necessaria formazione estensiva'
    },
    governance: {
      Expert: 'Governance AI completa con policy definite e metriche strutturate',
      Advanced: 'Struttura organizzativa definita con alcune policy implementate',
      Developing: 'Governance in sviluppo, responsabilità parzialmente definite',
      Beginner: 'Governance AI assente, necessaria definizione di ruoli e policy'
    },
    data: {
      Expert: 'Dati strutturati e accessibili con pipeline AI-ready implementate',
      Advanced: 'Buona qualità dei dati con sistemi di gestione funzionali',
      Developing: 'Dati parzialmente organizzati, qualità da migliorare',
      Beginner: 'Dati non strutturati, necessaria strategia di data management'
    },
    culture: {
      Expert: 'Cultura AI matura con esperienza consolidata e investimenti strategici',
      Advanced: 'Buona esperienza AI con organizzazione adattiva e budget adeguato',
      Developing: 'Esperienza limitata ma cultura aperta al cambiamento',
      Beginner: 'Cultura tradizionale, necessaria trasformazione culturale per AI'
    }
  }

  return {
    score: totalScore,
    maxScore: maxPossible,
    percentage,
    level,
    description: descriptions[dimensionName as keyof typeof descriptions]?.[level] || 'Valutazione in corso'
  }
}

function scoreResponse(response: string | number | undefined): number {
  if (typeof response === 'number') {
    return response
  }

  switch (response) {
    case 'si': return 5
    case 'parzialmente': case 'in_parte': case 'limitate': return 3
    case 'previsto_a_breve': case 'previste_a_breve': case 'in_sviluppo': return 3
    case 'no': return 0
    case 'non_lo_so': return 1
    default: return 0
  }
}

function calculateProjectScore(projects: string): number {
  switch (projects) {
    case '>7': return 5
    case '3-7': return 4
    case '1-3': return 3
    case '0': return 0
    default: return 0
  }
}

export function calculateEnhancedScore(data: Partial<AssessmentData>): EnhancedAssessmentResult {
  // Strategy Dimension (25% weight) - Enhanced with investment planning
  const budgetAllocationScore = () => {
    switch (data.aiBudgetAllocation) {
      case 'oltre_30': return 5
      case '15_30': return 4
      case '5_15': return 3
      case 'sotto_5': return 2
      case 'non_definito': return 1
      default: return 1
    }
  }

  const investmentTimelineScore = () => {
    switch (data.aiInvestmentTimeline) {
      case 'continuo': return 5
      case '6_mesi': return 4
      case '12_mesi': return 3
      case '18_mesi': return 2
      case 'oltre_24_mesi': return 1
      default: return 1
    }
  }

  const strategyScores = [
    data.aiVisionClarity || 0,
    scoreResponse(data.visionFormalized),
    scoreResponse(data.aiStrategicImportance),
    data.competitiveAdvantage || 0,
    scoreResponse(data.investmentPlans),
    budgetAllocationScore(), // Budget allocation for AI
    investmentTimelineScore(), // Investment planning timeline
    data.aiInvestmentPriority || 1 // Strategic priority of AI investments
  ]
  const strategy = calculateDimensionScore(strategyScores, 40, 'strategy')

  // Technology Dimension (25% weight)
  const technologyScores = [
    calculateProjectScore(data.currentProjects || '0'),
    scoreResponse(data.pilotProjects),
    (data.aiAreas?.length || 0) * 1.25, // Normalize to 5-point scale
    scoreResponse(data.partnerships)
  ]
  const technology = calculateDimensionScore(technologyScores, 20, 'technology')

  // People Dimension (20% weight)
  const peopleScores = [
    data.employeeUsage || 0,
    data.managementUsage || 0,
    scoreResponse(data.internalSkills),
    scoreResponse(data.trainingInitiatives)
  ]
  const people = calculateDimensionScore(peopleScores, 20, 'people')

  // Governance Dimension (15% weight) - Enhanced with ethics and privacy
  const ethicsFrameworkScore = () => {
    switch (data.aiEthicsFramework) {
      case 'si': return 5
      case 'parzialmente': return 3
      case 'in_sviluppo': return 2
      case 'no': return 1
      default: return 1
    }
  }

  const dataPrivacyScore = () => {
    switch (data.dataPrivacyCompliance) {
      case 'completo': return 5
      case 'parziale': return 3
      case 'minimo': return 2
      case 'non_implementato': return 1
      default: return 1
    }
  }

  const governanceScores = [
    scoreResponse(data.decisionMakerAwareness),
    scoreResponse(data.dedicatedTeam),
    scoreResponse(data.aiPolicies),
    scoreResponse(data.aiMetrics),
    ethicsFrameworkScore(), // AI ethics and principles
    dataPrivacyScore() // Data privacy compliance
  ]
  const governance = calculateDimensionScore(governanceScores, 30, 'governance')

  // Data Dimension (15% weight)
  const dataScores = [
    scoreResponse(data.dataReadiness) * 2, // Double weight for data readiness
    (data.mainChallenges?.includes('Mancanza di competenze') ? 2 : 4) // Reverse scoring for data challenges
  ]
  const data_dimension = calculateDimensionScore(dataScores, 10, 'data')

  // Culture & Experience Dimension (10% weight) - Direct culture assessment
  const changeReadinessScore = () => {
    switch (data.aiChangeReadiness) {
      case 'proattivo': return 5
      case 'adattivo': return 4
      case 'cauto': return 2
      case 'resistente': return 1
      default: return 2
    }
  }

  const leadershipCommunicationScore = () => {
    switch (data.leadershipAICommunication) {
      case 'strategicamente': return 5
      case 'regolarmente': return 4
      case 'occasionalmente': return 2
      case 'mai': return 1
      default: return 2
    }
  }

  const experienceScore = () => {
    // Base experience on current projects and usage levels
    const projectScore = calculateProjectScore(data.currentProjects || '0')
    const usageAvg = ((data.employeeUsage || 0) + (data.managementUsage || 0)) / 2
    return Math.min(5, Math.round((projectScore + usageAvg) / 2))
  }

  const cultureScores = [
    changeReadinessScore(), // Organizational readiness for AI change
    data.employeeAIAdoption || 2, // Employee adoption of AI tools
    leadershipCommunicationScore(), // Leadership AI communication
    experienceScore() // Overall AI experience level
  ]
  const culture = calculateDimensionScore(cultureScores, 20, 'culture')

  // Calculate weighted overall score (adjusted weights for new dimension)
  const overallScore = Math.round(
    (strategy.percentage * 0.22) +
    (technology.percentage * 0.22) +
    (people.percentage * 0.18) +
    (governance.percentage * 0.14) +
    (data_dimension.percentage * 0.14) +
    (culture.percentage * 0.10)
  )

  // Determine cluster
  const cluster = getCluster(overallScore)

  // Industry benchmarking
  const industry = getIndustryFromWebsite(data.website || '')
  const benchmark = INDUSTRY_BENCHMARKS[industry]
  const percentile = calculatePercentile(overallScore, benchmark)

  let comparison: 'Below Average' | 'Average' | 'Above Average' | 'Top Performer'
  if (overallScore >= benchmark.top10) comparison = 'Top Performer'
  else if (overallScore >= benchmark.top25) comparison = 'Above Average'
  else if (overallScore >= benchmark.average - 10) comparison = 'Average'
  else comparison = 'Below Average'

  // Generate recommendations
  const recommendations = generateRecommendations(cluster, {
    strategy, technology, people, governance, data: data_dimension
  })

  // Calculate ROI projection
  const roiProjection = calculateROIProjection(overallScore, cluster)

  // Competitive insights
  const competitiveInsights = generateCompetitiveInsights({
    strategy, technology, people, governance, data: data_dimension, culture
  }, comparison)

  return {
    overallScore,
    cluster,
    dimensions: {
      strategy,
      technology,
      people,
      governance,
      data: data_dimension,
      culture
    },
    industryBenchmark: {
      percentile,
      comparison,
      industryAverage: benchmark.average
    },
    recommendations,
    roiProjection,
    competitiveInsights
  }
}

function getCluster(score: number): string {
  if (score <= 30) return 'AI Explorer'
  if (score <= 45) return 'AI Starter'
  if (score <= 65) return 'AI Adopter'
  return 'AI Leader'
}

function calculatePercentile(score: number, benchmark: any): number {
  if (score >= benchmark.top10) return 90
  if (score >= benchmark.top25) return 75
  if (score >= benchmark.average) return 50
  return Math.max(10, Math.round((score / benchmark.average) * 50))
}

function generateRecommendations(cluster: string, dimensions: any) {
  const baseRecommendations = {
    'AI Explorer': {
      immediate: [
        'Definire una vision AI chiara e misurabilie',
        'Identificare 1-2 use case ad alto impatto e basso rischio',
        'Formare il leadership team sui fondamentali AI'
      ],
      shortTerm: [
        'Sviluppare un piano strategico AI a 12 mesi',
        'Implementare un progetto pilota',
        'Organizzare workshop di formazione per i dipendenti'
      ],
      longTerm: [
        'Costruire competenze AI interne',
        'Sviluppare governance AI aziendale',
        'Scalare le soluzioni AI di successo'
      ]
    },
    'AI Starter': {
      immediate: [
        'Formalizzare la strategia AI aziendale',
        'Definire metriche di successo per i progetti AI',
        'Identificare quick wins per generare momentum'
      ],
      shortTerm: [
        'Implementare 2-3 progetti AI pilota',
        'Sviluppare competenze tecniche interne',
        'Creare policy AI e governance'
      ],
      longTerm: [
        'Scalare i progetti di successo',
        'Integrare AI nei processi core',
        'Diventare AI-first nei processi chiave'
      ]
    },
    'AI Adopter': {
      immediate: [
        'Ottimizzare i progetti AI esistenti',
        'Misurare ROI delle iniziative in corso',
        'Identificare opportunità di scala'
      ],
      shortTerm: [
        'Espandere AI in nuove aree aziendali',
        'Sviluppare partnership strategiche',
        'Implementare advanced analytics'
      ],
      longTerm: [
        'Diventare leader di settore nell\'AI',
        'Sviluppare IP proprietario',
        'Creare vantaggi competitivi difendibili'
      ]
    },
    'AI Leader': {
      immediate: [
        'Esplorare AI frontiers (AGI, multimodal)',
        'Ottimizzare efficienza operativa AI',
        'Condividere best practices nel settore'
      ],
      shortTerm: [
        'Sviluppare soluzioni AI proprietarie',
        'Investire in R&D AI avanzato',
        'Creare ecosystem di innovazione'
      ],
      longTerm: [
        'Mantenere leadership tecnologica',
        'Espandere in nuovi mercati con AI',
        'Diventare riferimento globale per l\'AI'
      ]
    }
  }

  return baseRecommendations[cluster as keyof typeof baseRecommendations] || baseRecommendations['AI Explorer']
}

function calculateROIProjection(score: number, cluster: string) {
  const projections = {
    'AI Explorer': {
      timeframe: '1 year' as const,
      expectedRoi: 150,
      investmentRange: '€15.000 - €50.000',
      paybackPeriod: '8-12 mesi'
    },
    'AI Starter': {
      timeframe: '1 year' as const,
      expectedRoi: 220,
      investmentRange: '€30.000 - €100.000',
      paybackPeriod: '6-10 mesi'
    },
    'AI Adopter': {
      timeframe: '6 months' as const,
      expectedRoi: 280,
      investmentRange: '€50.000 - €200.000',
      paybackPeriod: '4-8 mesi'
    },
    'AI Leader': {
      timeframe: '6 months' as const,
      expectedRoi: 350,
      investmentRange: '€100.000+',
      paybackPeriod: '3-6 mesi'
    }
  }

  return projections[cluster as keyof typeof projections] || projections['AI Explorer']
}

function generateCompetitiveInsights(dimensions: any, comparison: string) {
  const insights = {
    strengths: [] as string[],
    gaps: [] as string[],
    opportunities: [] as string[]
  }

  // Always populate strengths - find best performing areas
  const sortedDimensions = Object.entries(dimensions).sort(([,a]: [string, any], [,b]: [string, any]) => b.percentage - a.percentage)

  // Top 2 performing dimensions as strengths
  sortedDimensions.slice(0, 2).forEach(([key, dim]: [string, any]) => {
    const dimensionName = key === 'strategy' ? 'Strategia AI' :
                         key === 'technology' ? 'Tecnologia' :
                         key === 'people' ? 'Competenze' :
                         key === 'governance' ? 'Governance' : 'Gestione Dati'
    insights.strengths.push(`${dimensionName}: Base solida per sviluppo AI (${dim.percentage}%)`)
  })

  // Always populate gaps - find lowest performing areas
  sortedDimensions.slice(-2).forEach(([key, dim]: [string, any]) => {
    if (dim.percentage < 70) {
      const dimensionName = key === 'strategy' ? 'Strategia AI' :
                           key === 'technology' ? 'Tecnologia' :
                           key === 'people' ? 'Competenze' :
                           key === 'governance' ? 'Governance' : 'Gestione Dati'
      insights.gaps.push(`${dimensionName}: Area da potenziare (${dim.percentage}%)`)
    }
  })

  // Always populate opportunities based on market position and cluster
  const baseOpportunities = [
    'Accelerare l\'adozione AI per vantaggi competitivi',
    'Ottimizzare processi aziendali con soluzioni AI',
    'Sviluppare competenze interne per autonomia strategica'
  ]

  if (comparison === 'Below Average') {
    insights.opportunities = [
      'Ampio margine di crescita rispetto ai competitor del settore',
      'Opportunità di recupero competitivo attraverso AI implementation',
      'Differenziazione strategica con soluzioni AI innovative'
    ]
  } else if (comparison === 'Top Performer') {
    insights.opportunities = [
      'Mantenere leadership attraverso innovazione AI continua',
      'Espansione in nuovi mercati con vantaggio competitivo AI',
      'Creazione di IP proprietari e soluzioni AI esclusive'
    ]
  } else if (comparison === 'Above Average') {
    insights.opportunities = [
      'Scalare le soluzioni AI esistenti per massimizzare ROI',
      'Entrare nel top 10% del settore con strategie avanzate',
      'Sviluppare partnership strategiche per accelerare innovazione'
    ]
  } else {
    // Average or any other case
    insights.opportunities = baseOpportunities
  }

  // Ensure minimum content if somehow empty
  if (insights.strengths.length === 0) {
    insights.strengths.push('Consapevolezza AI: Riconoscimento dell\'importanza strategica dell\'AI')
  }
  if (insights.gaps.length === 0) {
    insights.gaps.push('Implementazione: Accelerare la trasformazione da strategia ad esecuzione')
  }

  return insights
}