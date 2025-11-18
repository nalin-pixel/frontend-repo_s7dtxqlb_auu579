import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Toast from "./Toast";
import Loader from "./Loader";
import { Pencil, Trash2, Check, X } from "lucide-react";

const API = import.meta.env.VITE_BACKEND_URL || "";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-200">{label}</span>
      {children}
    </label>
  );
}

export default function AdminPanel() {
  const [tab, setTab] = useState("posts");
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ msg: "", type: "success" });

  const categoryOptions = useMemo(() => categories.map((c) => ({ value: c.slug, label: c.name })), [categories]);

  async function fetchCategories() {
    try {
      const res = await fetch(`${API}/api/admin/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (e) {}
  }

  async function fetchPosts() {
    try {
      const res = await fetch(`${API}/api/admin/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (e) {}
  }

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  async function handleCreateCategory(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setToast({ msg: "Category created", type: "success" });
      e.currentTarget.reset();
      fetchCategories();
    } catch (e) {
      setToast({ msg: "Error creating category", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.tags = payload.tags ? payload.tags.split(",").map((t) => t.trim()) : undefined;
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setToast({ msg: "Post saved", type: "success" });
      e.currentTarget.reset();
      fetchPosts();
    } catch (e) {
      setToast({ msg: "Error saving post", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function removePost(id) {
    if (!confirm("Delete this post?")) return;
    try {
      await fetch(`${API}/api/admin/posts/${id}`, { method: "DELETE" });
      setToast({ msg: "Post deleted", type: "success" });
      fetchPosts();
    } catch (e) {
      setToast({ msg: "Failed to delete", type: "error" });
    }
  }

  return (
    <div className="mx-auto max-w-6xl py-10">
      <div className="mb-6 flex gap-2">
        <button onClick={() => setTab("posts")} className={`rounded-lg border px-4 py-2 ${tab === "posts" ? "bg-blue-600 text-white" : "border-slate-700 bg-slate-800 text-slate-200"}`}>Posts</button>
        <button onClick={() => setTab("categories")} className={`rounded-lg border px-4 py-2 ${tab === "categories" ? "bg-blue-600 text-white" : "border-slate-700 bg-slate-800 text-slate-200"}`}>Categories</button>
      </div>

      {tab === "categories" && (
        <div className="grid gap-6 md:grid-cols-2">
          <motion.form layout onSubmit={handleCreateCategory} className="rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h3 className="mb-4 font-semibold text-white">Create Category</h3>
            <div className="space-y-4">
              <Field label="Name">
                <input name="name" required className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
              </Field>
              <Field label="Slug">
                <input name="slug" required className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
              </Field>
              <Field label="Description">
                <textarea name="description" className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
              </Field>
              <button disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-60">{loading ? <Loader /> : "Save"}</button>
            </div>
          </motion.form>

          <motion.div layout className="rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h3 className="mb-4 font-semibold text-white">Existing Categories</h3>
            <ul className="divide-y divide-slate-700">
              {categories.map((c) => (
                <li key={c.id} className="py-3 text-slate-200"><span className="font-medium">{c.name}</span> <span className="text-slate-400">/ {c.slug}</span></li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}

      {tab === "posts" && (
        <div className="grid gap-6 md:grid-cols-2">
          <motion.form layout onSubmit={handleCreatePost} className="rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h3 className="mb-4 font-semibold text-white">Create Post</h3>
            <div className="space-y-4">
              <Field label="Title">
                <input name="title" required className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
              </Field>
              <Field label="Slug">
                <input name="slug" required className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
              </Field>
              <Field label="Excerpt">
                <textarea name="excerpt" className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
              </Field>
              <Field label="Content">
                <textarea name="content" required rows={6} className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
              </Field>
              <Field label="Image URL">
                <input name="image_url" className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
              </Field>
              <Field label="Category">
                <select name="category_slug" className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white">
                  <option value="">—</option>
                  {categoryOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Tags (comma-separated)">
                <input name="tags" className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
              </Field>
              <Field label="Status">
                <select name="status" className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </Field>
              <Field label="Author">
                <input name="author" className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-white" />
              </Field>
              <button disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-60">{loading ? <Loader /> : "Publish"}</button>
            </div>
          </motion.form>

          <motion.div layout className="rounded-xl border border-slate-700 bg-slate-800 p-6">
            <h3 className="mb-4 font-semibold text-white">Recent Posts</h3>
            <ul className="divide-y divide-slate-700">
              {posts.map((p) => (
                <li key={p.id} className="py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-slate-100">{p.title}</div>
                      <div className="text-sm text-slate-400">/{p.slug}</div>
                      <div className="text-xs text-slate-500">{p.status} • {p.published_at || "—"}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => removePost(p.id)} className="rounded-md border border-red-500/40 bg-red-900/20 px-2 py-1 text-xs text-red-200 hover:bg-red-900/30">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}

      <Toast message={toast.msg} type={toast.type} onClose={() => setToast({ msg: "", type: "success" })} />
    </div>
  );
}
