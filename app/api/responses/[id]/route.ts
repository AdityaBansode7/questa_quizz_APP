import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const response = await prisma.response.findUnique({
      where: { id: params.id },
      include: {
        answers: {
          include: {
            question: true
          }
        }
      }
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch response' }, { status: 500 })
  }
}