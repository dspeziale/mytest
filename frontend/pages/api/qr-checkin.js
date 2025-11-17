import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const { token } = req.body
  // Demo token format: user:<userId>|loc:<locationId>
  try {
    const parts = (token || '').split('|').reduce((acc, p) => {
      const [k,v] = p.split(':')
      acc[k] = v
      return acc
    }, {})
    const userId = Number(parts.user)
    const locationId = Number(parts.loc)
    if (!userId || !locationId) return res.status(400).json({ error: 'token invalid' })
    const activity = await prisma.activityLog.create({ data: { userId, locationId, type: 'qr_checkin', metadata: JSON.stringify({ token }) } })
    return res.status(201).json(activity)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server error' })
  }
}
