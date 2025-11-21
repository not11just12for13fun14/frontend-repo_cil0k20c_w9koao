import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Speakers() {
  const [speakers, setSpeakers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/speakers`)
        const data = await res.json()
        setSpeakers(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchSpeakers()
  }, [])

  return (
    <section id="speakers" className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white">Visionary Voices</h2>
          <p className="text-slate-300 mt-3 max-w-2xl">A lineup of creators, founders, and technologists pushing the boundaries of digital experiences.</p>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading speakers…</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur hover:border-white/20"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-700 to-slate-800" />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white">{s.name}</h3>
                  <p className="text-slate-300/80">{s.title}{s.company ? ` • ${s.company}` : ''}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
