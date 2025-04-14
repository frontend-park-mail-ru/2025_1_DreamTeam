import { createApp } from "@/ourReact/jsx-runtime";
import WindowLogin from "../WindowLogin";

export default function openWindow() {
  const blur = document.getElementById("blur") as Element;
  createApp(blur, WindowLogin);
}
