import { NextRequest, NextResponse } from 'next/server'
import { getAllAssessments, getAssessmentsByCompany } from '@/lib/database'

function formatAssessmentData(assessment: any) {
  // Parse JSON fields
  const aiAreas = assessment.aiAreas ? JSON.parse(assessment.aiAreas) : []
  const mainChallenges = assessment.mainChallenges ? JSON.parse(assessment.mainChallenges) : []
  const assessmentDetails = assessment.assessmentDetails ? JSON.parse(assessment.assessmentDetails) : {}

  return {
    id: assessment.id,
    createdAt: assessment.createdAt,
    
    // Company Information
    company: {
      name: assessment.company,
      website: assessment.website,
      contactPerson: {
        name: assessment.name,
        email: assessment.email,
        role: assessment.role
      }
    },
    
    // Assessment Results
    results: {
      score: assessment.assessmentScore,
      cluster: assessment.assessmentCluster,
      details: assessmentDetails
    },
    
    // AI Analysis
    aiSummary: assessment.aiSummary,
    customPrompt: assessment.customPrompt,
    
    // Assessment Responses
    responses: {
      vision: {
        clarity: `${assessment.aiVisionClarity}/5`,
        formalized: assessment.visionFormalized,
        strategicImportance: assessment.aiStrategicImportance,
        competitiveAdvantage: `${assessment.competitiveAdvantage}/5`
      },
      
      implementation: {
        investmentPlans: assessment.investmentPlans,
        currentProjects: assessment.currentProjects,
        aiAreas: aiAreas,
        pilotProjects: assessment.pilotProjects
      },
      
      usage: {
        employeeUsage: `${assessment.employeeUsage}/5`,
        managementUsage: `${assessment.managementUsage}/5`,
        mainChallenges: mainChallenges,
        partnerships: assessment.partnerships
      },
      
      organization: {
        dataReadiness: assessment.dataReadiness,
        internalSkills: assessment.internalSkills,
        trainingInitiatives: assessment.trainingInitiatives,
        decisionMakerAwareness: assessment.decisionMakerAwareness,
        dedicatedTeam: assessment.dedicatedTeam,
        aiPolicies: assessment.aiPolicies,
        aiMetrics: assessment.aiMetrics
      }
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const company = searchParams.get('company')
    const format = searchParams.get('format') // 'raw' or 'formatted' (default)

    let result
    if (company) {
      result = await getAssessmentsByCompany(company)
    } else {
      result = await getAllAssessments()
    }

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 })
    }

    // Return raw data if requested
    if (format === 'raw') {
      return NextResponse.json({
        success: true,
        assessments: result.data,
        count: result.data.length
      })
    }

    // Format the data for better readability
    const formattedAssessments = result.data.map(formatAssessmentData)

    return NextResponse.json({
      success: true,
      summary: {
        totalAssessments: result.data.length,
        companies: [...new Set(result.data.map(a => a.company))].length,
        averageScore: Math.round(result.data.reduce((acc, a) => acc + a.assessmentScore, 0) / result.data.length) || 0,
        clusters: result.data.reduce((acc, a) => {
          acc[a.assessmentCluster] = (acc[a.assessmentCluster] || 0) + 1
          return acc
        }, {} as Record<string, number>)
      },
      assessments: formattedAssessments
    })

  } catch (error) {
    console.error('Assessments API error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Errore interno del server'
    }, { status: 500 })
  }
}