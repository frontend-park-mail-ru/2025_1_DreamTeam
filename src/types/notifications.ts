export type Toast = {
  id: number;
  type: ToastType;
  message: string;
}[];

export type ToastType = "error" | "success" | "warning" | "notification";
