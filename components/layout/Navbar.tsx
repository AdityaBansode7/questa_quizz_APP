// components/layout/Navbar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSupabase } from '@/lib/supabase-context'

export default function Navbar() {
  const pathname = usePathname()
  const { session, supabase, loading } = useSupabase()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (pathname.startsWith('/auth')) return null

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                Questa
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`${
                  pathname === '/'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className={`${
                    pathname.startsWith('/dashboard')
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {loading ? (
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Hi, {session.user?.user_metadata?.name || session.user?.email?.split('@')[0]}
                </span>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login">
                  <Button variant="outline">Sign in</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}