import { setToast, useToast } from "@/App";
import { ToastType } from "@/types/notifications";

const addToast = (type: ToastType, message: string) => {
  const toast = useToast();
  const newToast = {
    id: toast.count,
    type,
    message,
  };

  setToast({
    data: [...toast.data, newToast],
    count: toast.count + 1,
  });
};

export default addToast;
