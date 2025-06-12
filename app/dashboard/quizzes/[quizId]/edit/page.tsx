import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import QuizForm from '@/components/dashboard/QuizForm'

export default async function EditQuizPage({ params }: { params: { quizId: string } }) {
  const session = await getSession()
  if (!session) redirect('/login')

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.quizId, userId: session.user.id },
    include: {
      questions: {
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!quiz) return <div>Quiz not found</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Quiz: {quiz.title}</h1>
      <QuizForm quizData={quiz} />
    </div>
  )
}