import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

export default function QuizCard({ quiz }: { quiz: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{quiz.description || 'No description'}</p>
        <p className="text-sm text-gray-500 mt-2">
          Created: {format(new Date(quiz.createdAt), 'MMM dd, yyyy')}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/dashboard/quizzes/${quiz.id}/responses`}>
          <Button variant="outline">View Responses</Button>
        </Link>
        <Link href={`/dashboard/quizzes/${quiz.id}/edit`}>
          <Button>Edit</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}