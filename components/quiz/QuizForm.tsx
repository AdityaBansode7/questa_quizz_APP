'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import QuestionCard from './QuestionCard'
import { Button } from '@/components/ui/button'

export default function QuizForm({ quiz }: { quiz: any }) {
  const router = useRouter()
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

    const formattedAnswers = quiz.questions.map((q: any) => {
      const answer = answers[q.id]
      return {
        questionId: q.id,
        textAnswer: q.type === 'short_answer' ? String(answer) : undefined,
        optionIndex: q.type === 'single_choice' ? Number(answer) : undefined
      }
    })

    try {
      const response = await fetch(`/api/quiz/${quiz.id}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: formattedAnswers })
      })

      if (response.ok) {
        const { responseId } = await response.json()
        router.push(`/quiz/thank-you?responseId=${responseId}`)
      }
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
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Answers'}
        </Button>
      </div>
    </form>
  )
}