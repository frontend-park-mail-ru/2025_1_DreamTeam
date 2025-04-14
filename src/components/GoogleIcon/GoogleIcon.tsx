import "./GoogleIcon.css";

export type GoogleIconType = "search" | "home" | "menu" | "play_Lesson";

export default function GoogleIcon({
  i,
  width,
  height,
}: {
  i: GoogleIconType;
  width: number;
  height: number;
}) {
  return <i class={`google-icon w-${width} h-${height}`}>{i}</i>;
}
