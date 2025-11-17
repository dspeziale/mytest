import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // Demo: accept any user that exists in DB and password === 'password'
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (user && credentials.password === 'password') {
          return { id: user.id, name: user.name, email: user.email, role: user.role }
        }
        return null
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }){
      // attach role
      if (token?.role) session.user.role = token.role
      return session
    },
    async jwt({ token, user }){
      if (user) token.role = user.role || 'OPERATOR'
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev_secret',
  session: { strategy: 'jwt' }
})
