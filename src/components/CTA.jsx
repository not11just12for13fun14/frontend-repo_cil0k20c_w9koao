import { useState } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const subscribe = async (e) => {
    e.preventDefault()
    setStatus('')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('Success! You\'re subscribed.')
      setEmail('')
    } catch {
      setStatus('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur p-10 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white">Be the first to know</h3>
          <p className="text-slate-300 mt-3">Get program announcements, ticket drops, and speaker reveals straight to your inbox.</p>

          <form onSubmit={subscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="rounded-xl bg-white text-slate-900 px-6 py-3 font-medium hover:bg-slate-100 transition">Subscribe</button>
          </form>
          {status && <p className="mt-4 text-slate-200">{status}</p>}
        </div>
      </div>
    </section>
  )
}
