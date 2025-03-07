import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AlertDialog({ message, subMessage, onConfirm, onClose, deleteMode = false }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
        />

        {/* Dialog */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-blue-700 hover:text-blue-900"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <h2 className="text-xl font-bold text-blue-800">
            {message || "Are you absolutely sure?"}
          </h2>
          <p className="text-sm text-blue-600">
            {subMessage ||
              "This action cannot be undone. Please confirm to continue."}
          </p>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-blue-300 text-blue-700 hover:bg-blue-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 rounded-md transition ${
                deleteMode
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {deleteMode ? "Delete" : "Continue"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AlertDialog;