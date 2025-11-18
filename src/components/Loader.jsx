export default function Loader() {
  return (
    <div className="flex items-center gap-2 text-slate-300">
      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.2s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-300" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-200 [animation-delay:0.2s]" />
    </div>
  );
}
