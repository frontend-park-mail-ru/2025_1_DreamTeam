// logic/clear.ts
import { setToast } from "@/stores";

const clearToast = () => {
  setToast({ data: [], count: 0 });
};

export default clearToast;
