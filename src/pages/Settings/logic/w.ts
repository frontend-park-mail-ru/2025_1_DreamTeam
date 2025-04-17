import { createApp } from "@/ourReact/jsx-runtime";
import WindowALert from "../WindowALert";

export default function admitWindow() {
  const blur = document.getElementById("alert_admit") as Element;
  createApp(blur, WindowALert);
}