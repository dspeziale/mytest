import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function Locations(){
  const { data, error } = useSWR('/api/locations', fetcher)
  if (error) return <div>Errore caricamento</div>
  if (!data) return <div>Caricamento...</div>
  return (
    <main style={{padding:20}}>
      <h1>Locations</h1>
      <ul>
        {data.map(loc => (
          <li key={loc.id}><Link href={`/locations/${loc.id}`}>{loc.name}</Link></li>
        ))}
      </ul>
    </main>
  )
}
