import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import QuizForm from '@/components/dashboard/QuizForm'

export default async function NewQuizPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Quiz</h1>
      <QuizForm />
    </div>
  )
}