import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
// import ResponsesPage from '@/app/dashboard/quizzes/[quizId]/responses'


export default async function QuizResponsesPage({ params }: { params: { quizId: string } }) {
  const session = await getSession()
  if (!session) redirect('/login')

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.quizId, userId: session.user.id },
    include: {
      questions: {
        orderBy: { order: 'asc' }
      },
      responses: {
        include: {
          answers: true
        }
      }
    }
  })

  if (!quiz) return <div>Quiz not found</div>

  return <ResponsesPage quiz={quiz} />
}