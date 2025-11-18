import { useState } from "react";
import AdminPanel from "./components/AdminPanel";
import PublicSite from "./components/PublicSite";

function App() {
  const [tab, setTab] = useState("public");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(34,211,238,0.06),transparent_40%)]" />

      <header className="relative z-10 border-b border-blue-500/10 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-white font-bold">CH</div>
            <div>
              <h1 className="text-white font-semibold leading-tight">Core Content Hub</h1>
              <p className="-mt-0.5 text-xs text-blue-300/80">Single source of truth → Native + WordPress</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <button onClick={() => setTab("public")} className={`rounded-lg border px-3 py-1.5 text-sm ${tab === "public" ? "bg-blue-600 text-white border-blue-500" : "bg-slate-800 border-slate-700 text-slate-200"}`}>Public Site</button>
            <button onClick={() => setTab("admin")} className={`rounded-lg border px-3 py-1.5 text-sm ${tab === "admin" ? "bg-blue-600 text-white border-blue-500" : "bg-slate-800 border-slate-700 text-slate-200"}`}>Admin</button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 px-6">
        {tab === "public" ? <PublicSite /> : <AdminPanel />}
      </main>

      <footer className="relative z-10 border-t border-blue-500/10 py-8 text-center text-slate-400 text-sm">
        Built with a clean REST API, MongoDB persistence, and a WordPress JSON feed. Create once, publish everywhere.
      </footer>
    </div>
  );
}

export default App;
