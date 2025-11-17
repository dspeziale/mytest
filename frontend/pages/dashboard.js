import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Dashboard(){
  const { data: session } = useSession()
  return (
    <main style={{padding:20}}>
      <h1>Dashboard</h1>
      <p>Benvenuto {session?.user?.name ?? session?.user?.email ?? 'ospite'}</p>
      <nav>
        <ul>
          <li><Link href="/locations">Locations</Link></li>
          <li><Link href="/flows">Flows</Link></li>
          <li><Link href="/qr">QR Scanner</Link></li>
        </ul>
      </nav>
      <div style={{marginTop:20}}>
        <button onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
      </div>
    </main>
  )
}
