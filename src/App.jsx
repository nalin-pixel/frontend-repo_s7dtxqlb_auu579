import { useState } from "react";
import AdminPanel from "./components/AdminPanel";
import PublicSite from "./components/PublicSite";

function App() {
  const [tab, setTab] = useState("public");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <header className="relative z-10 border-b border-blue-500/10 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Flames" className="w-8 h-8" />
            <div>
              <h1 className="text-white font-semibold leading-tight">Core Content Hub</h1>
              <p className="text-xs text-blue-300/70 -mt-0.5">Dual-output CMS (Native + WordPress)</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <button onClick={() => setTab("public")} className={`px-3 py-1.5 rounded-lg text-sm border ${tab === "public" ? "bg-blue-600 text-white border-blue-500" : "bg-slate-800 border-slate-700 text-slate-200"}`}>Public Site</button>
            <button onClick={() => setTab("admin")} className={`px-3 py-1.5 rounded-lg text-sm border ${tab === "admin" ? "bg-blue-600 text-white border-blue-500" : "bg-slate-800 border-slate-700 text-slate-200"}`}>Admin</button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 px-6">
        {tab === "public" ? <PublicSite /> : <AdminPanel />}
      </main>

      <footer className="relative z-10 border-t border-blue-500/10 py-6 text-center text-slate-400 text-sm">
        Powered by a single content hub with a JSON REST API and a WordPress feed endpoint.
      </footer>
    </div>
  );
}

export default App;
