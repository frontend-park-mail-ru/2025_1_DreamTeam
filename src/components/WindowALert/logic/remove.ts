import { setToast, useToast } from "@/App";

const removeToast = (id: number) => {
  const toast = useToast();
  setToast({
    ...toast,
    data: toast.data.filter((t) => t.id !== id),
  });
};

export default removeToast;
