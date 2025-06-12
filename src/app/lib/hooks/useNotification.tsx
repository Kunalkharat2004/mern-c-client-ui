/* hooks/useNotification.tsx */
import React from "react";
import { toast } from "sonner";
import { Check, X as XIcon, Info, AlertTriangle } from "lucide-react";

export const useNotification = () => {
  const success = (message: string) => {
    toast(message, {
      icon: <Check className="w-5 h-5" />,
      className: "bg-green-600 text-white font-medium",
    });
  };

  const error = (message: string) => {
    toast(message, {
      icon: <XIcon className="w-5 h-5" />,
      className: "bg-red-600 text-white font-medium",
    });
  };

  const warning = (message: string) => {
    toast(message, {
      icon: <AlertTriangle className="w-5 h-5" />,
      className: "bg-yellow-500 text-gray-900 font-medium",
    });
  };

  const info = (message: string) => {
    toast(message, {
      icon: <Info className="w-5 h-5" />,
      className: "bg-blue-600 text-white font-medium",
    });
  };

  return { success, error, warning, info };
};