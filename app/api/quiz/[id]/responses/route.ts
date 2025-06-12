import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { answers } = await req.json()
  
  try {
    const response = await prisma.response.create({
      data: {
        quizId: params.id,
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