import { defineStore } from "@/ourReact/jsx-runtime";

export const [useDevice, setDevice] = defineStore("device", {
  isMobile: window.innerWidth <= 780,
});

addEventListener("resize", () => {
  setDevice({ isMobile: window.innerWidth <= 780 });
});
