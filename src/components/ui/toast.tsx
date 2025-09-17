import { useEffect } from "react";

type ToastProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
};

export default function Toast({ message, visible, onClose }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onClose, 2500); // fecha automático em 2.5s
    return () => clearTimeout(t);
  }, [visible, onClose]);

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 transform -translate-x-1/2 transition-all duration-300
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0 pointer-events-none"
              }`}
    >
      <div className="rounded-lg bg-gray-900 text-white px-4 py-2 shadow-lg text-sm font-medium">
        {message}
      </div>
    </div>
  );
}
