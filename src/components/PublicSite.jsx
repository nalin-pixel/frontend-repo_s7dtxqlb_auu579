import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import Filters from "./Filters";
import PostCard from "./PostCard";
import Modal from "./Modal";
import EmptyState from "./EmptyState";
import Loader from "./Loader";

const API = import.meta.env.VITE_BACKEND_URL || "";

export default function PublicSite() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", tag: "" });
  const [active, setActive] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/posts?page=1&page_size=24`);
        const data = await res.json();
        setPosts(data.items || []);
      } catch (e) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const categoryMatch = !filters.category || p.category_slug === filters.category;
      const tagMatch = !filters.tag || (Array.isArray(p.tags) && p.tags.join(" ").toLowerCase().includes(filters.tag.toLowerCase()));
      return categoryMatch && tagMatch;
    });
  }, [posts, filters]);

  return (
    <div className="relative">
      <Hero />
      <div className="mx-auto max-w-6xl pb-16">
        <Filters onChange={setFilters} />
        {loading ? (
          <div className="grid place-items-center py-10"><Loader /></div>
        ) : filtered.length === 0 ? (
          <EmptyState title="No matching posts" subtitle="Try a different category or tag." />
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((p) => (
                <PostCard key={p.id} post={p} onClick={() => setActive(p)} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div>
            {active.image_url && (
              <img src={active.image_url} alt={active.title} className="mb-4 h-64 w-full rounded-xl object-cover" />
            )}
            <h3 className="text-xl font-semibold text-white">{active.title}</h3>
            <div className="prose prose-invert mt-3 max-w-none text-slate-200">
              <p className="whitespace-pre-wrap">{active.content}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
