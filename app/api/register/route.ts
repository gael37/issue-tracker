import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import bcrypt from 'bcrypt'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5),
  passwordConfirmation: z.string().min(5),
})

export async function POST(request: NextRequest) {
  const body = await request.json()


  const validation = schema.safeParse(body)
  if (!validation.success) {
    console.log('erreur au niceau du handler')
    return NextResponse.json(validation.error.errors, { status: 400 })
  }

  if (body.password !== body.passwordConfirmation)
    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
  console.log('passwords DO match')

  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })
  console.log('on est la?')
  if (user)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })

  const hashedPassword = await bcrypt.hash(body.password, 10)
  console.log('we arrive at the level of creating')
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword
    }
  })

  return NextResponse.json({ name: newUser.name, email: newUser.email })
}