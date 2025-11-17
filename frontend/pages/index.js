import Link from 'next/link'

export default function Home() {
  return (
    <main style={{padding:20}}>
      <h1>BnB Ops — Dashboard</h1>
      <p>Benvenuto. Accedi per gestire le location e le attività.</p>
      <div style={{marginTop:20}}>
        <Link href="/login">Login</Link>
        <span style={{marginLeft:10}} />
        <Link href="/dashboard">Dashboard (demo)</Link>
      </div>
    </main>
  )
}
