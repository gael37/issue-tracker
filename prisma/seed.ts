const { PrismaClient } = require('@prisma/client')
const { issues } = require('./data.ts')
const prisma = new PrismaClient()

const load = async () => {
  try {

    await prisma.issues.deleteMany()
    console.log('Issues are deleted')

    await prisma.issues.createMany({
      data: issues
    })
    console.log('Issues are created')
  } catch (e) {
    console.error(e)
  } finally {
    await prisma.$disconnect();
  }
}

load();