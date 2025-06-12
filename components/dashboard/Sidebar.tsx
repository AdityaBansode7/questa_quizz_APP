'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, PlusIcon, BarChartIcon, SettingsIcon } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <div className="w-64 bg-white border-r h-screen fixed">
      <div className="p-4">
        <h1 className="text-xl font-bold">Questa</h1>
      </div>
      <nav className="mt-6">
        <Link href="/dashboard" className={`flex items-center p-4 ${isActive('/dashboard') ? 'bg-gray-100' : ''}`}>
          <HomeIcon className="h-5 w-5 mr-2" />
          Dashboard
        </Link>
        <Link href="/dashboard/quizzes" className={`flex items-center p-4 ${isActive('/dashboard/quizzes') ? 'bg-gray-100' : ''}`}>
          <BarChartIcon className="h-5 w-5 mr-2" />
          Quizzes
        </Link>
        <Link href="/dashboard/new-quiz" className={`flex items-center p-4 ${isActive('/dashboard/new-quiz') ? 'bg-gray-100' : ''}`}>
          <PlusIcon className="h-5 w-5 mr-2" />
          New Quiz
        </Link>
      </nav>
    </div>
  )
}