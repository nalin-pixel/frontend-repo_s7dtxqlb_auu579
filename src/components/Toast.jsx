import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Toast({ message, type = "success", duration = 2500, onClose }) {
  const [open, setOpen] = useState(Boolean(message));
  useEffect(() => {
    setOpen(Boolean(message));
    if (!message) return;
    const t = setTimeout(() => {
      setOpen(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border px-3 py-2 text-sm shadow-lg ${
            type === "success"
              ? "border-green-500/30 bg-green-900/30 text-green-200"
              : "border-red-500/30 bg-red-900/30 text-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
