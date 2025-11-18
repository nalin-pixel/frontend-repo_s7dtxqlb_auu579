import { motion } from "framer-motion";
import { Megaphone, Globe2, Rss } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="mx-auto max-w-6xl py-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-white"
        >
          One Content Hub. Two Destinations.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-3 max-w-2xl text-slate-300"
        >
          Create once, publish everywhere. Power your native site and WordPress simultaneously with a clean JSON API.
        </motion.p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { icon: Megaphone, title: "Admin-first", desc: "Draft, schedule and publish with one click." },
            { icon: Globe2, title: "Native Site", desc: "Fast, modern frontend with Tailwind and React." },
            { icon: Rss, title: "WP Feed", desc: "Syndicate to WordPress via JSON feed." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="rounded-xl border border-slate-700/80 bg-slate-800/60 p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <f.icon className="text-blue-300" />
                <div>
                  <div className="text-white font-medium">{f.title}</div>
                  <div className="text-sm text-slate-300">{f.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
