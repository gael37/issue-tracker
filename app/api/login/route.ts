import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const validation = schema.safeParse(body)
  if (!validation.success) {
    console.log('erreur au niceau de Zod request body validation')
    return NextResponse.json(validation.error.errors, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })
  console.log('user found during login')
  if (!user)
    return NextResponse.json({ error: 'Email does not match any existing user.' }, { status: 404 })


  const payload: { sub: string, email: string } = {
    sub: user.id!,
    email: user.email!
  }


  if (!bcrypt.compare(body.password, user.hashedPassword!)) {
    console.log('passwords do not match')

    return NextResponse.json('passwords do not match', { status: 400 })
  }

  else {
    console.log('passwords MATCH 🟢🌸')
    console.log('payload', payload)
    // Finally, we build the token using the payload, secret & options. Here the expiresIn option adds "iat" (issued at) and "exp" (expiration time) keys to the payload in the created token
    const token: string = jwt.sign(payload, process.env.SECRET!, { expiresIn: '1h' })
    console.log('token returned', token)
    return NextResponse.json({ name: user.name, email: user.email!, token: token }, { status: 200 })

  }

}
