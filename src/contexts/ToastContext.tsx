"use client";
import {createContext, useContext, useState, ReactNode} from "react";
import {Toast} from "../ui/Toast";

interface ToastContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({children}: {children: ReactNode}) {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showSuccess = (message: string) => {
    setToast({message, type: "success"});
  };

  const showError = (message: string) => {
    setToast({message, type: "error"});
  };

  return (
    <ToastContext.Provider value={{showSuccess, showError}}>
      {children}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
