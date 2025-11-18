import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";

export default function PostCard({ post, onClick }) {
  const date = post.published_at ? new Date(post.published_at).toLocaleDateString() : null;
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <motion.article
      layout
      onClick={onClick}
      whileHover={{ y: -3, boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur hover:border-blue-500/40 transition"
    >
      {post.image_url && (
        <div className="relative">
          <img
            src={post.image_url}
            alt={post.title}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition line-clamp-2">
          {post.title}
        </h3>
        {date && (
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        )}
        {post.excerpt && (
          <p className="mt-3 text-sm text-slate-300 line-clamp-3">{post.excerpt}</p>
        )}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((t) => (
              <span key={t} className="inline-flex items-center gap-1 rounded-full bg-slate-700/70 px-2 py-1 text-xs text-slate-200">
                <Tag size={12} />
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
