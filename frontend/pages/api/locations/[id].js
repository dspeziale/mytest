import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res){
  const { id } = req.query
  if (req.method === 'GET'){
    const loc = await prisma.location.findUnique({ where: { id: Number(id) } })
    if (!loc) return res.status(404).json({ error: 'Not found' })
    return res.json(loc)
  }
  res.status(405).end()
}
