import { notFound, redirect } from 'next/navigation'
import prisma from '@/lib/db'
import QuizForm from '@/components/quiz/QuizForm'

export default async function PublicQuizPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const id = params.id // Properly access params

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!quiz) return notFound()

  async function handleSubmit(answers: any) {
    'use server'
    try {
      const response = await prisma.response.create({
        data: {
          quizId: id,
          answers: {
            create: answers.map((a: any) => ({
              questionId: a.questionId,
              textAnswer: a.textAnswer,
              optionIndex: a.optionIndex
            }))
          }
        }
      })
      redirect(`/quiz/thank-you?responseId=${response.id}`)
    } catch (error) {
      console.error('Submission failed:', error)
      throw error
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
        {quiz.description && <p className="text-gray-600">{quiz.description}</p>}
      </div>
      
      <QuizForm quiz={quiz} onSubmit={handleSubmit} />
    </div>
  )
}