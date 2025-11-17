import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res){
  if (req.method === 'GET'){
    const locs = await prisma.location.findMany()
    return res.json(locs)
  }
  if (req.method === 'POST'){
    const { name, address, description } = req.body
    const created = await prisma.location.create({ data: { name, address, description } })
    return res.status(201).json(created)
  }
  res.status(405).end()
}
