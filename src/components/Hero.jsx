import { motion } from 'framer-motion'

export default function Hero({ onRegister }) {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/60 to-slate-900"></div>
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-cyan-400" />
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-cyan-400 via-emerald-400 to-indigo-500" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.08),rgba(0,0,0,0))]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white"
          >
            Elevate. Inspire. Connect.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl"
          >
            Experience a world-class event crafted with cinematic motion, bold typography,
            and immersive interactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-10 flex gap-4"
          >
            <button onClick={onRegister} className="group relative overflow-hidden rounded-xl bg-white/10 px-6 py-3 text-white backdrop-blur border border-white/20 hover:bg-white/20 transition">
              <span className="relative z-10">Get Tickets</span>
              <span className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400" />
            </button>
            <a href="#speakers" className="px-6 py-3 rounded-xl border border-white/15 text-white/90 hover:text-white hover:border-white/30 transition">Meet the Speakers</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
