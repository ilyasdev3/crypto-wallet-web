import { ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const showToast = {
  success: (message: string) => {
    toast.success(message, toastConfig);
  },
  error: (message: string) => {
    toast.error(message, toastConfig);
  },
  info: (message: string) => {
    toast.info(message, toastConfig);
  },
  warning: (message: string) => {
    toast.warning(message, toastConfig);
  },

  custom: (message: string, className: string = "") => {
    toast(message, {
      ...toastConfig,
      className: `${className} font-ppNeue`,
    });
  },
};

export const containerStyle = {
  toastContainer: {
    width: "auto",
    maxWidth: "420px",
  },
  toast: {
    fontSize: "14px",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#1a1a1a",
  },
  success: {
    backgroundColor: "#378B4E",
    color: "white",
  },
  error: {
    backgroundColor: "#DC3545",
    color: "white",
  },
  warning: {
    backgroundColor: "#FFF6D5",
    color: "#1a1a1a",
  },
  info: {
    backgroundColor: "#17A2B8",
    color: "white",
  },
};
