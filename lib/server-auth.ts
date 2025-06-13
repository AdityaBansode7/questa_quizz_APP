import { PrismaClient } from '@prisma/client'
import { hash, compare } from 'bcryptjs'
import { supabase } from './auth'

const prisma = new PrismaClient()

export async function signInWithEmail(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('User not found')
  
  const isValid = await compare(password, user.password)
  if (!isValid) throw new Error('Invalid password')
  
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  const hashedPassword = await hash(password, 12)
  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  })
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name
      }
    }
  })
  if (error) throw error
  return data
}