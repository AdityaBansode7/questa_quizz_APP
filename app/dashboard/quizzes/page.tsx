import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import QuizCard from '@/components/dashboard/QuizCard'
import NewQuizButton from '@/components/dashboard/NewQuizButton'

export default async function QuizzesPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const quizzes = await prisma.quiz.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Quizzes</h1>
        <NewQuizButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}