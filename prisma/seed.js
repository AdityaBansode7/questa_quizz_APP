// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

async function main() {
  const prisma = new PrismaClient()
  
  try {
    // Create a sample user
    const sampleUser = await prisma.user.upsert({
      where: { email: 'sample@example.com' },
      update: {},
      create: {
        email: 'sample@example.com',
        name: 'Sample User',
        password: await bcrypt.hash('Password123', 12),
        quizzes: {
          create: {
            id: 'sample',
            title: 'Sample Quiz',
            description: 'Try out this sample quiz!',
            questions: {
              create: [
                {
                  text: 'What is 2 + 2?',
                  type: 'single_choice',
                  options: ['3', '4', '5'],
                  order: 1
                },
                {
                  text: 'What is your favorite color?',
                  type: 'short_answer',
                  options: [],
                  order: 2
                }
              ]
            }
          }
        }
      }
    })

    console.log('Created sample user:', sampleUser)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()