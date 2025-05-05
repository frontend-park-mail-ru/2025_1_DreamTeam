export default function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60) || 0;
  const sec = Math.floor(seconds % 60) || 0;
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}
