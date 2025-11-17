import { getCsrfToken, signIn } from 'next-auth/react'
import { useState } from 'react'

export default function Login({ csrfToken }) {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  return (
    <main style={{padding:20}}>
      <h1>Login</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          const res = await signIn('credentials', { redirect: false, email, password })
          if (res?.ok) window.location.href = '/dashboard'
          else alert('Credenziali non valide (demo)')
        }}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Accedi</button>
      </form>
    </main>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
