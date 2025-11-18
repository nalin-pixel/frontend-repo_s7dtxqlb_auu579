import { ImageOff } from "lucide-react";

export default function EmptyState({ title = "No content yet", subtitle = "Start by adding your first post.", }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 p-10 text-center">
      <ImageOff className="h-10 w-10 text-slate-500" />
      <h3 className="mt-3 text-lg font-medium text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}
