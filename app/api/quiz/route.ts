// Placeholder content for route.ts
// app/api/quiz/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getSession } from '@/lib/auth'
//Prisma

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, description, questions } = await req.json()
  
  try {
    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        userId: session.user.id,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            type: q.type,
            options: q.options || [],
            order: q.order
          }))
        }
      }
    })
    
    return NextResponse.json({ quizId: quiz.id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 })
  }
}