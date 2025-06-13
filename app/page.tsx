import { getSession } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const session = await getSession() // This will now work properly

  return (
    <div className="text-center py-20 px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Create and Share Quizzes
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
        Questa is a simple platform for creating and sharing quizzes with anyone.
      </p>
      <div className="flex justify-center gap-4">
        {session ? (
          <Link href="/dashboard">
            <Button size="lg">Go to Dashboard</Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button size="lg">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary" size="lg">
                Sign Up
              </Button>
            </Link>
          </>
        )}
        <Link href="/quiz/sample">
          <Button variant="outline" size="lg">
            View Sample Quiz
          </Button>
        </Link>
      </div>
    </div>
  )
}