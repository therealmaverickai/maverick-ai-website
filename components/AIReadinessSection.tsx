'use client'

import { useState } from 'react'

export default function AIReadinessSection() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const questions = [
    {
      question: "Quanto è digitalizzata la tua azienda?",
      answers: [
        { text: "Completamente digitale", points: 4 },
        { text: "Principalmente digitale", points: 3 },
        { text: "Parzialmente digitale", points: 2 },
        { text: "Limitata digitalizzazione", points: 1 },
        { text: "Prevalentemente analogica", points: 0 }
      ]
    },
    {
      question: "Che esperienza ha il tuo team con l'AI?",
      answers: [
        { text: "Esperti con progetti AI attivi", points: 4 },
        { text: "Buona conoscenza teorica", points: 3 },
        { text: "Conoscenza di base", points: 2 },
        { text: "Interesse ma poca esperienza", points: 1 },
        { text: "Nessuna esperienza", points: 0 }
      ]
    },
    {
      question: "Qual è la qualità dei tuoi dati?",
      answers: [
        { text: "Dati strutturati e di alta qualità", points: 4 },
        { text: "Dati buoni ma da ottimizzare", points: 3 },
        { text: "Dati esistenti ma disorganizzati", points: 2 },
        { text: "Dati limitati", points: 1 },
        { text: "Pochi o nessun dato", points: 0 }
      ]
    },
    {
      question: "Qual è il budget disponibile per l'AI?",
      answers: [
        { text: "Budget significativo dedicato", points: 4 },
        { text: "Budget moderato", points: 3 },
        { text: "Budget limitato ma disponibile", points: 2 },
        { text: "Budget molto ristretto", points: 1 },
        { text: "Nessun budget specifico", points: 0 }
      ]
    }
  ]

  const handleAnswerSelect = (questionIndex: number, answerText: string, points: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerText
    }))
  }

  const calculateScore = () => {
    let totalScore = 0
    questions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index]
      if (selectedAnswer) {
        const answer = question.answers.find(a => a.text === selectedAnswer)
        if (answer) totalScore += answer.points
      }
    })
    setScore(Math.round((totalScore / 16) * 100))
    setShowResults(true)
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { level: "Eccellente", message: "La tua azienda è pronta per implementazioni AI avanzate!", color: "text-green-600", bgColor: "bg-green-100" }
    if (score >= 60) return { level: "Buono", message: "Ottima base per iniziare con l'AI. Alcune ottimizzazioni necessarie.", color: "text-blue-600", bgColor: "bg-blue-100" }
    if (score >= 40) return { level: "Medio", message: "Potenziale interessante. Serve preparazione prima dell'implementazione.", color: "text-yellow-600", bgColor: "bg-yellow-100" }
    return { level: "Base", message: "Consigliamo di iniziare con la strategia e la preparazione dei dati.", color: "text-red-600", bgColor: "bg-red-100" }
  }

  const resetAssessment = () => {
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
  }

  return (
    <section id="valutazione" className="bg-gradient-to-br from-gray-50 to-white section-padding">
      <div className="container-width">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            AI Readiness Assessment
          </h2>
          <p className="text-xl text-navy-700 max-w-3xl mx-auto">
            Valuta il livello di preparazione della tua azienda per l'implementazione dell'Intelligenza Artificiale
          </p>
        </div>

        {!showResults ? (
          <div className="max-w-4xl mx-auto">
            <div className="card p-8">
              {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mb-8">
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">
                    {questionIndex + 1}. {question.question}
                  </h3>
                  <div className="space-y-3">
                    {question.answers.map((answer, answerIndex) => (
                      <label 
                        key={answerIndex}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:border-accent-300 ${
                          selectedAnswers[questionIndex] === answer.text 
                            ? 'border-accent-500 bg-accent-50' 
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            value={answer.text}
                            checked={selectedAnswers[questionIndex] === answer.text}
                            onChange={() => handleAnswerSelect(questionIndex, answer.text, answer.points)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            selectedAnswers[questionIndex] === answer.text 
                              ? 'border-accent-500 bg-accent-500' 
                              : 'border-gray-300'
                          }`}>
                            {selectedAnswers[questionIndex] === answer.text && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className="text-navy-700">{answer.text}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-center mt-8">
                <button 
                  onClick={calculateScore}
                  disabled={Object.keys(selectedAnswers).length < questions.length}
                  className={`btn-primary text-lg px-8 py-3 ${
                    Object.keys(selectedAnswers).length < questions.length 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                >
                  Calcola il tuo AI Readiness Score
                </button>
                <p className="text-sm text-navy-500 mt-2">
                  Completa tutte le domande per ottenere il risultato
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="card p-8 text-center">
              <div className="mb-8">
                <div className="text-6xl font-bold text-accent-500 mb-4">{score}%</div>
                <div className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${getScoreMessage(score).bgColor} ${getScoreMessage(score).color}`}>
                  Livello: {getScoreMessage(score).level}
                </div>
              </div>

              <p className="text-xl text-navy-700 mb-8">
                {getScoreMessage(score).message}
              </p>

              <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white p-6 rounded-xl mb-8">
                <h3 className="text-xl font-bold mb-4">Prossimi passi consigliati:</h3>
                <div className="text-left space-y-2">
                  {score >= 80 && (
                    <>
                      <p>✅ Implementazione diretta di soluzioni AI avanzate</p>
                      <p>✅ Focus su Agentic AI e automazione complessa</p>
                      <p>✅ Ottimizzazione e scaling delle soluzioni esistenti</p>
                    </>
                  )}
                  {score >= 60 && score < 80 && (
                    <>
                      <p>🔧 Ottimizzazione dell'infrastruttura dati</p>
                      <p>📚 Formazione team su tecnologie AI</p>
                      <p>🚀 Implementazione graduale con progetti pilota</p>
                    </>
                  )}
                  {score >= 40 && score < 60 && (
                    <>
                      <p>📊 Audit completo dei sistemi e dati esistenti</p>
                      <p>🎯 Definizione strategia AI personalizzata</p>
                      <p>🛠️ Preparazione infrastruttura tecnologica</p>
                    </>
                  )}
                  {score < 40 && (
                    <>
                      <p>📋 Assessment dettagliato del business</p>
                      <p>💡 Workshop di sensibilizzazione AI</p>
                      <p>🏗️ Roadmap di digitalizzazione preliminare</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  Richiedi Consulenza Personalizzata
                </button>
                <button 
                  onClick={resetAssessment}
                  className="btn-secondary"
                >
                  Ripeti Assessment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}