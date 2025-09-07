import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Assessment data interface
interface AssessmentData {
  name: string
  email: string
  role: string
  company: string
  website?: string
  privacyConsent?: boolean
  
  aiVisionClarity: number
  visionFormalized: string
  aiStrategicImportance: string
  competitiveAdvantage: number
  investmentPlans: string
  currentProjects: string
  aiAreas?: string[]
  pilotProjects: string
  employeeUsage: number
  managementUsage: number
  mainChallenges?: string[]
  partnerships: string
  dataReadiness: string
  internalSkills: string
  trainingInitiatives: string
  decisionMakerAwareness: string
  dedicatedTeam: string
  aiPolicies: string
  aiMetrics: string
  
  customPrompt?: string
  
  assessment: {
    score: number
    cluster: string
    details: {
      totalScore: number
      maxPossibleScore: number
      normalizedScore: number
    }
  }
  
  aiSummary?: string
}

export async function saveAssessment(data: AssessmentData, aiSummary: string) {
  try {
    console.log('Attempting to save assessment for:', data.company)
    console.log('Database URL exists:', !!process.env.DATABASE_URL)
    console.log('Assessment data keys:', Object.keys(data))
    
    const assessment = await prisma.assessment.create({
      data: {
        // Contact Info
        name: data.name,
        email: data.email,
        role: data.role,
        company: data.company,
        website: data.website,
        privacyConsent: data.privacyConsent || false,
        
        // Assessment Questions
        aiVisionClarity: data.aiVisionClarity,
        visionFormalized: data.visionFormalized,
        aiStrategicImportance: data.aiStrategicImportance,
        competitiveAdvantage: data.competitiveAdvantage,
        investmentPlans: data.investmentPlans,
        currentProjects: data.currentProjects,
        aiAreas: data.aiAreas ? JSON.stringify(data.aiAreas) : null,
        pilotProjects: data.pilotProjects,
        employeeUsage: data.employeeUsage,
        managementUsage: data.managementUsage,
        mainChallenges: data.mainChallenges ? JSON.stringify(data.mainChallenges) : null,
        partnerships: data.partnerships,
        dataReadiness: data.dataReadiness,
        internalSkills: data.internalSkills,
        trainingInitiatives: data.trainingInitiatives,
        decisionMakerAwareness: data.decisionMakerAwareness,
        dedicatedTeam: data.dedicatedTeam,
        aiPolicies: data.aiPolicies,
        aiMetrics: data.aiMetrics,
        
        // Custom prompt
        customPrompt: data.customPrompt,
        
        // Assessment Results
        assessmentScore: data.assessment.score,
        assessmentCluster: data.assessment.cluster,
        assessmentDetails: JSON.stringify(data.assessment.details),
        
        // AI Generated Summary
        aiSummary: aiSummary,
      }
    })
    
    console.log('Assessment saved with ID:', assessment.id)
    return { success: true, id: assessment.id }
  } catch (error: any) {
    console.error('Error saving assessment:', error)
    console.error('Error code:', error?.code)
    console.error('Error message:', error?.message)
    console.error('Full error:', JSON.stringify(error, null, 2))
    return { success: false, error: `Failed to save assessment: ${error?.message || error}` }
  }
}

export async function getAssessment(id: string) {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id }
    })
    
    if (!assessment) {
      return { success: false, error: 'Assessment not found' }
    }
    
    return { success: true, data: assessment }
  } catch (error) {
    console.error('Error fetching assessment:', error)
    return { success: false, error: 'Failed to fetch assessment' }
  }
}

export async function getAllAssessments() {
  try {
    const assessments = await prisma.assessment.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    return { success: true, data: assessments }
  } catch (error) {
    console.error('Error fetching assessments:', error)
    return { success: false, error: 'Failed to fetch assessments' }
  }
}

export async function getAssessmentsByCompany(company: string) {
  try {
    const assessments = await prisma.assessment.findMany({
      where: { 
        company: {
          contains: company
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return { success: true, data: assessments }
  } catch (error) {
    console.error('Error fetching assessments by company:', error)
    return { success: false, error: 'Failed to fetch assessments' }
  }
}