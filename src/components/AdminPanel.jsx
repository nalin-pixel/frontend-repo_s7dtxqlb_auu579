import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BACKEND_URL || "";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-200 mb-1">{label}</span>
      {children}
    </label>
  );
}

export default function AdminPanel() {
  const [tab, setTab] = useState("posts");
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    const res = await fetch(`${API}/api/admin/categories`);
    const data = await res.json();
    setCategories(data);
  }

  async function fetchPosts() {
    const res = await fetch(`${API}/api/admin/posts`);
    const data = await res.json();
    setPosts(data);
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
    await fetch(`${API}/api/admin/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    e.currentTarget.reset();
    fetchCategories();
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.tags = payload.tags ? payload.tags.split(",").map((t) => t.trim()) : undefined;
    setLoading(true);
    await fetch(`${API}/api/admin/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    e.currentTarget.reset();
    fetchPosts();
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab("posts")} className={`px-4 py-2 rounded-lg border ${tab === "posts" ? "bg-blue-600 text-white" : "bg-slate-800 border-slate-700 text-slate-200"}`}>Posts</button>
        <button onClick={() => setTab("categories")} className={`px-4 py-2 rounded-lg border ${tab === "categories" ? "bg-blue-600 text-white" : "bg-slate-800 border-slate-700 text-slate-200"}`}>Categories</button>
      </div>

      {tab === "categories" && (
        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={handleCreateCategory} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Create Category</h3>
            <div className="space-y-4">
              <Field label="Name">
                <input name="name" required className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <Field label="Slug">
                <input name="slug" required className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <Field label="Description">
                <textarea name="description" className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60">{loading ? "Saving..." : "Save"}</button>
            </div>
          </form>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Existing Categories</h3>
            <ul className="divide-y divide-slate-700">
              {categories.map((c) => (
                <li key={c.id} className="py-3 text-slate-200"><span className="font-medium">{c.name}</span> <span className="text-slate-400">/ {c.slug}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {tab === "posts" && (
        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={handleCreatePost} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Create Post</h3>
            <div className="space-y-4">
              <Field label="Title">
                <input name="title" required className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <Field label="Slug">
                <input name="slug" required className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <Field label="Excerpt">
                <textarea name="excerpt" className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <Field label="Content">
                <textarea name="content" required rows={6} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <Field label="Image URL">
                <input name="image_url" className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <Field label="Category Slug">
                <input name="category_slug" className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <Field label="Tags (comma-separated)">
                <input name="tags" className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <Field label="Status">
                <select name="status" className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </Field>
              <Field label="Author">
                <input name="author" className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
              </Field>
              <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60">{loading ? "Saving..." : "Publish"}</button>
            </div>
          </form>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Recent Posts</h3>
            <ul className="divide-y divide-slate-700">
              {posts.map((p) => (
                <li key={p.id} className="py-3">
                  <div className="text-slate-100 font-medium">{p.title}</div>
                  <div className="text-slate-400 text-sm">/{p.slug}</div>
                  <div className="text-slate-400 text-sm">{p.status} • {p.published_at || "—"}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
