import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow p-4 md:p-6">
        {children}
      </div>
    </div>
  )
}