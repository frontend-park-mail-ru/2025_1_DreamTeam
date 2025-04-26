// logic/clear.ts
import { setToast } from "@/App";

const clearToast = () => {
  setToast({ data: [], count: 0 });
};

export default clearToast;
