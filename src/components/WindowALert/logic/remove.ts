import { setToast1, useToast1 } from "@/App";

const removeToast = (id: number) => {
  const toast = useToast1();
  setToast1({
    ...toast,
    data: toast.data.filter((t) => t.id !== id),
  });
};

export default removeToast;
