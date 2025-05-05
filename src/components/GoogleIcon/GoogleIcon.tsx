import "./GoogleIcon.css";

export type GoogleIconType =
  | "search"
  | "home"
  | "menu"
  | "play_Lesson"
  | "favorite";

export default function GoogleIcon({
  i,
  width,
}: {
  i: GoogleIconType;
  width: number;
}) {
  return <i class={`google-icon w-${width}`}>{i}</i>;
}
