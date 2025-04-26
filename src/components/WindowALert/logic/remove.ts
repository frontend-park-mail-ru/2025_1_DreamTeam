import { setToast, useToast } from "@/App";

const removeToast = (id: number) => {
  const toast = useToast();

  const updatedData = toast.data.map((t) =>
    t.id === id ? { ...t, disappear: true } : t
  );

  setToast({ ...toast, data: updatedData });

  setTimeout(() => {
    const latest = useToast();
    setToast({
      ...latest,
      data: latest.data.filter((t) => t.id !== id),
    });
  }, 300);
};

export default removeToast;
