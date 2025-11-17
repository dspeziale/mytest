import { PrismaClient } from '@prisma/client'
import PDFDocument from 'pdfkit'

const prisma = new PrismaClient()

export default async function handler(req, res){
  // expects query params: locationId, from, to
  const { locationId, from, to } = req.query
  if (!locationId) return res.status(400).json({ error: 'locationId required' })
  const where = { locationId: Number(locationId) }
  if (from || to) where.timestamp = {}
  if (from) where.timestamp.gte = new Date(from)
  if (to) where.timestamp.lte = new Date(to)

  const activities = await prisma.activityLog.findMany({ where, orderBy: { timestamp: 'asc' }, include: { user: true } })

  // Generate PDF
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="report_location_${locationId}.pdf"`)
  const doc = new PDFDocument()
  doc.pipe(res)
  doc.fontSize(18).text(`Report attività - Location ${locationId}`, { align: 'center' })
  doc.moveDown()
  activities.forEach(act => {
    doc.fontSize(12).text(`${act.timestamp.toISOString()} — ${act.type} — ${act.user?.name ?? act.userId}`)
    if (act.metadata) doc.fontSize(10).text(`  ${act.metadata}`)
    doc.moveDown(0.5)
  })
  doc.end()
}
