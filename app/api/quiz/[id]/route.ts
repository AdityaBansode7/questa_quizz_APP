// Placeholder content for route.ts
// app/api/quiz/[id]/responses/route.ts
import { NextResponse } from 'next/server'
// import prisma from '@/lib/prisma'
import prisma from '@/lib/db'
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const quizId = params.id
  const { answers } = await req.json()
  
  try {
    const response = await prisma.response.create({
      data: {
        quizId,
        answers: {
          create: answers.map((a: any) => ({
            questionId: a.questionId,
            textAnswer: a.textAnswer,
            optionIndex: a.optionIndex
          }))
        }
      }
    })
    
    return NextResponse.json({ responseId: response.id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit response' }, { status: 500 })
  }
}