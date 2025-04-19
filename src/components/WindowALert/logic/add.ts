import { setToast1, useToast1 } from "@/App";
import { ToastType } from "@/types/notifications";

const addToast = (type: ToastType, message: string) => {
  const toast = useToast1();
  const newToast = {
    id: toast.count,
    type,
    message,
  };

  setToast1({
    data: [...toast.data, newToast],
    count: toast.count + 1,
  });
};

export default addToast;
