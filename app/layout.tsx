// app/layout.tsx
import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { SupabaseProvider } from '@/lib/supabase-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Questa - Quiz Platform',
  description: 'Create and share quizzes with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}