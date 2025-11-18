import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function PublicSite() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API}/api/posts?page=1&page_size=10`);
      const data = await res.json();
      setPosts(data.items || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-2xl font-bold text-white mb-6">Latest Articles</h2>
      {loading ? (
        <div className="text-slate-300">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <article key={p.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 hover:border-blue-500/40 transition">
              {p.image_url && (
                <img src={p.image_url} alt={p.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              )}
              <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-slate-300 text-sm mb-3">{p.excerpt}</p>
              <div className="text-slate-400 text-xs">{p.published_at ? new Date(p.published_at).toLocaleString() : "Unpublished"}</div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
