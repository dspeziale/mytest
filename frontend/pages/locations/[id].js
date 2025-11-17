import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(r => r.json())

export default function LocationDetail(){
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(id ? `/api/locations/${id}` : null, fetcher)
  if (error) return <div>Errore</div>
  if (!data) return <div>Caricamento...</div>
  return (
    <main style={{padding:20}}>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
