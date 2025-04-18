import { setToast } from "@/App";

export const openModal = () => {
  setToast(true);
};

export const closeModal = () => {
  setToast(false);
};
