# BnB Ops — Frontend (Next.js)

Scaffold base per l'app che gestisce Bed & Breakfast.

Quick start (Windows PowerShell):

```powershell
cd frontend
npm install
cp .env.example .env
# genera client prisma e migrazione dev
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Note:
- In sviluppo useremo SQLite (`prisma/dev.db`). In produzione consigliato PostgreSQL.
- Per il deploy su Vercel impostare `DATABASE_URL` e `NEXTAUTH_SECRET` nelle Environment Variables.
- Il progetto include: NextAuth (credentials demo), Prisma, API routes per report/qr-checkin.

Prossimi passi possibili:
- Implementare UI più ricca e editor flow
- Aggiungere storage per immagini (S3/Cloudinary)
- Integrazione SMS/email per notifiche
