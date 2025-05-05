import formatTime from "./logic/formatTime";
import styles from "./VideoPlayer.module.scss";

export default function VideoPlayer({ video }: { video: string }) {
  return (
    <div class={styles.videoPlayer}>
      <video
        class={styles.videoPlayer__video}
        id="video"
        ON_timeupdate={() => {
          const video = document.getElementById("video") as HTMLVideoElement;
          const progress = document.getElementById(
            "progress"
          ) as HTMLInputElement;
          const time = document.getElementById("time") as HTMLSpanElement;

          if (!video || !progress || !time) return;

          progress.value = video.currentTime.toString();
          time.textContent =
            formatTime(video.currentTime) + " / " + formatTime(video.duration);
        }}
        ON_loadedmetadata={() => {
          const video = document.getElementById("video") as HTMLVideoElement;
          const progress = document.getElementById(
            "progress"
          ) as HTMLInputElement;
          if (video && progress) {
            progress.max = video.duration.toString();
          }
        }}
      >
        <source src={video} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <div class={styles.videoPlayer__controls}>
        <button
          class={styles.videoPlayer__button}
          id="play-pause"
          ON_click={() => {
            const video = document.getElementById("video") as HTMLVideoElement;
            const playPause = document.getElementById(
              "play-pause"
            ) as HTMLButtonElement;
            if (!video || !playPause) return;

            if (video.paused) {
              video.play();
              playPause.textContent = "⏸️";
            } else {
              video.pause();
              playPause.textContent = "▶️";
            }
          }}
        >
          ▶️
        </button>

        <input
          class={styles.videoPlayer__range}
          type="range"
          id="progress"
          value="0"
          min="0"
          step="0.1"
          ON_input={(e: Event) => {
            const video = document.getElementById("video") as HTMLVideoElement;
            const input = e.target as HTMLInputElement;
            if (video) {
              video.currentTime = parseFloat(input.value);
            }
          }}
        />

        <span class={styles.videoPlayer__time} id="time">
          0:00 / 0:00
        </span>

        <button
          class={styles.videoPlayer__button}
          id="mute"
          ON_click={() => {
            const video = document.getElementById("video") as HTMLVideoElement;
            const mute = document.getElementById("mute") as HTMLButtonElement;
            if (!video || !mute) return;
            video.muted = !video.muted;
            mute.textContent = video.muted ? "🔇" : "🔈";
          }}
        >
          🔈
        </button>

        <input
          class={styles.videoPlayer__range}
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.05"
          value="1"
          ON_input={(e: Event) => {
            const video = document.getElementById("video") as HTMLVideoElement;
            const input = e.target as HTMLInputElement;
            if (video) {
              video.volume = parseFloat(input.value);
            }
          }}
        />

        <button
          class={styles.videoPlayer__button}
          id="fullscreen"
          ON_click={() => {
            const video = document.getElementById("video") as HTMLVideoElement;
            if (video.requestFullscreen) {
              video.requestFullscreen();
            } else if ((video as any).webkitRequestFullscreen) {
              (video as any).webkitRequestFullscreen();
            } else if ((video as any).msRequestFullscreen) {
              (video as any).msRequestFullscreen();
            }
          }}
        >
          ⛶
        </button>
      </div>
    </div>
  );
}
