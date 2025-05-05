import { setToast, useToast } from "@/stores";
import { ToastType } from "@/types/notifications";
import removeToast from "./remove";

const addToast = (type: ToastType, message: string) => {
  const toast = useToast();
  const newToast = {
    id: toast.count,
    type,
    message,
    disappear: false,
  };

  setToast({
    data: [...toast.data, newToast],
    count: toast.count + 1,
  });

  setTimeout(() => {
    removeToast(newToast.id);
  }, 5000);
};

export default addToast;
