import formatTime from "./logic/formatTime";

export default function VideoPlayer({ video }: { video: string }) {
  return (
    <div class="video-player">
      <video
        class="video-player__video"
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

      <div class="video-player__controls">
        <button
          class="video-player__button"
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
          class="video-player__range"
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

        <span class="video-player__time" id="time">
          0:00 / 0:00
        </span>

        <button
          class="video-player__button"
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
          class="video-player__range"
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
          class="video-player__button"
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
