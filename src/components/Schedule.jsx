import { useEffect, useState } from 'react'

export default function Schedule() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions`)
        const data = await res.json()
        setSessions(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchSessions()
  }, [])

  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Schedule</h2>
          <p className="text-slate-300 mt-3 max-w-2xl">A carefully curated program blending keynotes, panels, and hands-on workshops.</p>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading schedule…</p>
        ) : (
          <div className="space-y-4">
            {sessions.map((sess) => (
              <div key={sess.id} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-slate-300 text-sm">{new Date(sess.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} — {new Date(sess.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  <h3 className="text-white font-semibold text-lg">{sess.title}</h3>
                  <p className="text-slate-300/80 text-sm">{sess.stage || 'Main Stage'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
