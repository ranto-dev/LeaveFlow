import toast from "react-hot-toast";

export const notify = {
  success: (message: string) =>
    toast.success(message, {
      icon: "✅",
    }),

  error: (message: string) =>
    toast.error(message, {
      icon: "❌",
    }),

  loading: (message: string) => toast.loading(message),
};
