'use client'
import { useState } from 'react'
import QuestionCard from './QuestionCard'

export default function QuizForm({ 
  quiz,
  onSubmit
}: { 
  quiz: any,
  onSubmit: (answers: any) => Promise<void>
}) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [submitting, setSubmitting] = useState(false)

  const handleAnswerChange = (questionId: string, value: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const formattedAnswers = quiz.questions.map((q: any) => ({
      questionId: q.id,
      textAnswer: q.type === 'short_answer' ? String(answers[q.id] || '') : undefined,
      optionIndex: q.type === 'single_choice' ? Number(answers[q.id]) : undefined
    }))

    try {
      await onSubmit(formattedAnswers)
    } catch (error) {
      console.error('Submission failed', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {quiz.questions.map((question: any, index: number) => (
        <QuestionCard 
          key={question.id}
          question={question}
          index={index}
          onAnswerChange={handleAnswerChange}
        />
      ))}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Answers'}
        </button>
      </div>
    </form>
  )
}