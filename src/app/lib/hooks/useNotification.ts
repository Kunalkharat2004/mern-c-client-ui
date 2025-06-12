import { toast } from "sonner"; // Import toast from sonner

// Define types for toast options (optional, but good for type safety)
interface ToastOptions {
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  onDismiss?: () => void;
  onClose?: () => void;
}

export const useNotification = () => {
  const showToast = (
    title: string,
    type: "success" | "error" | "warning" | "info" | "destructive",
    options?: ToastOptions
  ) => {
    switch (type) {
      case "success":
        toast.success(title, {
          description: options?.description,
          action: options?.action,
          duration: options?.duration || 3000,
          onDismiss: options?.onDismiss,
          onClose: options?.onClose,
        });
        break;
      case "error":
        toast.error(title, {
          description: options?.description,
          action: options?.action,
          duration: options?.duration || 5000, // Errors might stay longer
          onDismiss: options?.onDismiss,
          onClose: options?.onClose,
        });
        break;
      case "warning":
        toast.warning(title, {
          description: options?.description,
          action: options?.action,
          duration: options?.duration || 4000,
          onDismiss: options?.onDismiss,
          onClose: options?.onClose,
        });
        break;
      case "info":
        toast.info(title, {
          description: options?.description,
          action: options?.action,
          duration: options?.duration || 3000,
          onDismiss: options?.onDismiss,
          onClose: options?.onClose,
        });
        break;
      case "destructive":
        // Sonner doesn't have a direct 'destructive' type,
        // but you can style it with a custom class or use error for critical issues.
        // For demonstration, we'll use a custom class.
        toast.error(title, {
          description: options?.description,
          action: options?.action,
          duration: options?.duration || 5000,
          className: "bg-red-500 text-white", // Apply custom styling for destructive
          onDismiss: options?.onDismiss,
          onClose: options?.onClose,
        });
        break;
      default:
        toast(title, {
          description: options?.description,
          action: options?.action,
          duration: options?.duration || 3000,
          onDismiss: options?.onDismiss,
          onClose: options?.onClose,
        });
        break;
    }
  };

  const showSuccessToast = (title: string, options?: ToastOptions) =>
    showToast(title, "success", options);

  const showErrorToast = (title: string, options?: ToastOptions) =>
    showToast(title, "error", options);

  const showWarningToast = (title: string, options?: ToastOptions) =>
    showToast(title, "warning", options);

  const showInfoToast = (title: string, options?: ToastOptions) =>
    showToast(title, "info", options);

  const showDestructiveToast = (title: string, options?: ToastOptions) =>
    showToast(title, "destructive", options);

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    showDestructiveToast,
  };
};
