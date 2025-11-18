import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function Filters({ onChange }) {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState({ category: "", tag: "" });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/api/categories`);
        const data = await res.json();
        setCategories(data || []);
      } catch (e) {
        // ignore
      }
    }
    load();
  }, []);

  function update(next) {
    const state = { ...active, ...next };
    setActive(state);
    onChange?.(state);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => update({ category: "" })}
          className={`rounded-full px-3 py-1.5 text-sm border ${active.category === "" ? "bg-blue-600 text-white border-blue-500" : "bg-slate-800 text-slate-200 border-slate-700"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => update({ category: c.slug })}
            className={`rounded-full px-3 py-1.5 text-sm border ${active.category === c.slug ? "bg-blue-600 text-white border-blue-500" : "bg-slate-800 text-slate-200 border-slate-700"}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          placeholder="Filter by tag..."
          onChange={(e) => update({ tag: e.target.value })}
          className="w-48 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500"
        />
      </div>
    </motion.div>
  );
}
