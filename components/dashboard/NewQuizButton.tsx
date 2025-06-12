import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export default function NewQuizButton() {
  return (
    <Link href="/dashboard/new-quiz">
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" />
        New Quiz
      </Button>
    </Link>
  )
}