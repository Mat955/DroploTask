import {XMarkIcon} from "@heroicons/react/24/outline";
import {useEffect} from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export function Toast({message, type, onClose}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
        type === "success"
          ? "bg-[#ECFDF3] text-[#027A48]"
          : "bg-[#FEF3F2] text-[#B42318]"
      }`}
    >
      <span className='text-sm font-medium'>{message}</span>
      <button onClick={onClose} className='p-1 hover:bg-black/5 rounded'>
        <XMarkIcon className='w-4 h-4' />
      </button>
    </div>
  );
}
