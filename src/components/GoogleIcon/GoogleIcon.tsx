import "./GoogleIcon.css";

type GoogleIconType = "search" | "home" | "menu";

export default function GoogleIcon({ i }: { i: GoogleIconType }) {
  return <i class={"google-icon"}>{i}</i>;
}
