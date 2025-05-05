export type Toast = {
  id: number;
  type: ToastType;
  message: string;
  disappear: boolean;
}[];

export type ToastType = "error" | "success" | "warning" | "notification";
