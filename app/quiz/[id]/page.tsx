// app/quiz/[id]/page.tsx
import { notFound } from 'next/navigation'
import prisma from '@/lib/db' // ✅ Ensure this file exports a working PrismaClient
import QuizForm from '@/components/quiz/QuizForm'

export default async function PublicQuizPage({ params }: { params: { id: string } }) {
  const { id } = params  // ✅ Destructure early to avoid Next.js warning

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!quiz) return notFound()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
        {quiz.description && <p className="text-gray-600">{quiz.description}</p>}
      </div>
      
      <QuizForm quiz={quiz} />
    </div>
  )
}
