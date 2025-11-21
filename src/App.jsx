import { useState } from 'react'
import Hero from './components/Hero'
import Speakers from './components/Speakers'
import Schedule from './components/Schedule'
import CTA from './components/CTA'

function App() {
  const [showRegister, setShowRegister] = useState(false)

  const handleRegister = () => setShowRegister(true)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-slate-950/40 border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-white font-bold tracking-tight text-xl">Evoke/25</a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#speakers" className="hover:text-white">Speakers</a>
            <a href="#schedule" className="hover:text-white">Schedule</a>
            <button onClick={handleRegister} className="rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2 text-white">Get Tickets</button>
          </nav>
        </div>
      </header>

      <main className="relative pt-16">
        <Hero onRegister={handleRegister} />
        <div id="speakers">
          <Speakers />
        </div>
        <div id="schedule">
          <Schedule />
        </div>
        <CTA />
      </main>

      {showRegister && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 backdrop-blur">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white text-xl font-semibold">Get Tickets</h4>
              <button className="text-white/60 hover:text-white" onClick={() => setShowRegister(false)}>Close</button>
            </div>
            <RegisterForm onSuccess={() => setShowRegister(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', ticket_type: 'standard' })
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('Success! Check your email for confirmation.')
      setForm({ name: '', email: '', ticket_type: 'standard' })
      setTimeout(() => onSuccess?.(), 1000)
    } catch {
      setStatus('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        required
        value={form.name}
        onChange={(e) => setForm(v => ({ ...v, name: e.target.value }))}
        placeholder="Full name"
        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <input
        required
        type="email"
        value={form.email}
        onChange={(e) => setForm(v => ({ ...v, email: e.target.value }))}
        placeholder="Email address"
        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <select
        value={form.ticket_type}
        onChange={(e) => setForm(v => ({ ...v, ticket_type: e.target.value }))}
        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <option value="standard">Standard</option>
        <option value="vip">VIP</option>
        <option value="student">Student</option>
      </select>
      <button className="w-full rounded-xl bg-white text-slate-900 px-6 py-3 font-medium hover:bg-slate-100 transition">Register</button>
      {status && <p className="text-slate-200">{status}</p>}
    </form>
  )
}

export default App
