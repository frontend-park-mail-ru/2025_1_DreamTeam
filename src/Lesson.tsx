import { useState } from "./ourReact/jsx-runtime";
import { getLessons, getNextLessons, notCompleted } from "./api";
import { useCourseOpen, useLessonID } from "./App";

export type Footer = {
  next_lesson_id: number;
  current_lesson_id: number;
  previous_lesson_id: number;
};

export type Blocks = {
  body: string;
};

export type LessonBody = {
  blocks: Blocks[];
  footer: Footer;
};

export type Points = {
  lesson_id: number;
  type: string;
  is_done: boolean;
};

export type Bucket = {
  order: number;
  title: string;
};

export type Part = {
  order: number;
  title: string;
};

export type Header = {
  course_title: string;
  part: Part;
  bucket: Bucket;
  Points: Points[];
};

export type Lessons = {
  header: Header;
  lesson_body: LessonBody;
};

export type LessonsStructure = {
  lesson: Lessons;
};

let exam = {
  lesson: {
    header: {
      course_title: "Информационная безопасность",
      part: {
        order: 1,
        title: "Введение",
      },
      bucket: {
        order: 1,
        title: "Первый урок",
      },
      Points: [
        {
          lesson_id: 1,
          type: "video",
          is_done: true,
        },
        {
          lesson_id: 2,
          type: "video",
          is_done: false,
        },
        {
          lesson_id: 3,
          type: "text",
          is_done: true,
        },
      ],
    },
    lesson_body: {
      blocks: [
        {
          body: "<p><strong>Разведка в сети</strong> – это процесс сбора информации об объекте или цели в интернете. Это может быть любая информация, которая может помочь в осуществлении дальнейших действий по отношению к объекту. Например, определение уязвимостей или сбор данных для атаки.</p>\n\n        <p><strong>Сетевой сканер</strong> – это программа, предназначенная для сканирования компьютерных сетей и обнаружения устройств, портов и служб, работающих на этих устройствах. Они используются для проверки безопасности сетей, выявления уязвимостей и проверки соответствия настроек безопасности определенным стандартам.</p>\n\n        <p><strong>Доменное имя</strong> – это уникальное текстовое имя, которое используется для идентификации адреса ресурса в Интернете.</p>\n\n        <p><strong>SSL (Secure Sockets Layer) сертификат</strong> – это цифровой сертификат, который подтверждает подлинность веб-сайта и обеспечивает защищенное соединение между веб-браузером и сервером, на котором расположен веб-сайт. Сертификаты выпускаются специальными доверенными удостоверяющими центрами по всему миру, представляют из себя файлы определенного формата, которые располагаются на серверах, для предоставления их пользователям и проверки легитимности сервисов.</p>",
        },
        {
          body: "<p><strong>Сетевой порт</strong> – это номер, который идентифицирует определенный сетевой протокол и процесс, который использует этот протокол для передачи данных в компьютерных сетях. Когда компьютер или устройство отправляет или получает данные через сеть, он использует определенный порт для связи с другим устройством или сервером по определенному сетевому протоколу. Номер порта представляет собой целое число от 0 до 65535.</p>\n\n        <p>Хост / узел – это устройство или программа, которая может быть связана с другими устройствами или программами в компьютерной сети. Узлы сети могут выполнять различные функции, такие, как передача данных, маршрутизация, хранение информации, обработка запросов и т.д. Каждый узел сети имеет свой уникальный адрес, который позволяет другим узлам обращаться к нему и передавать данные. Примерами узлов сети могут быть компьютеры, маршрутизаторы, сетевые принтеры, серверы, мобильные устройства и т.д.</p>",
        },
      ],
      footer: {
        next_lesson_id: 2,
        current_lesson_id: 1,
        previous_lesson_id: -1,
      },
    },
  },
};

export function LessonPage() {
  const [text, setText] = useState<LessonsStructure>(exam);
  const [isLoading, setLoading] = useState(true);
  if (isLoading) {
    const courseId = useCourseOpen().id;
    if (courseId === undefined) {
      console.error("Ошибка");
      return <div>Ошибка</div>;
    }
    const id = useLessonID();
    if (id === false) {
      getLessons(courseId).then((result) => {
        if (result === undefined) {
          console.error(result);
          return <div>Ошибка</div>;
        }
        setText(result);
        setLoading(false);
      });
    } else {
      getNextLessons(courseId, id).then((result) => {
        if (typeof result === "string") {
          console.error(result);
          return <div>Ошибка</div>;
        }
        setText(result);
        setLoading(false);
      });
    }
  }
  if (isLoading) {
    console.log("loading");
    return <div>Загрузка</div>;
  }
  return (
    <div>
      <LessonHeader
        key="ClassHeader"
        setText={setText}
        text={text}
        header={text.lesson.header}
      />
      <LessonContentText key="ClassContent" setText={setText} text={text} />
    </div>
  );
}

export function LessonHeader({
  setText,
  header,
  text,
}: {
  setText: (argv0: LessonsStructure) => void;
  header: Header;
  text: LessonsStructure;
}) {
  const lesson = header.part.order.toString();
  const current_lesson = text.lesson.lesson_body.footer.current_lesson_id;
  const name_lesson = header.part.title;
  const lesson_after = header.bucket.order.toString();
  const name_lesson_after = header.bucket.title;
  let count_watch = 0;
  header.Points.forEach((lessons) => {
    lessons.is_done.toString() === "true" ? (count_watch += 1) : count_watch;
  });
  return (
    <header class="info">
      <div class="headlines">{header.course_title}</div>
      <div class="headlines under">
        {lesson}. {name_lesson} {lesson_after}. {name_lesson_after}
      </div>
      <div class="lesson--pages">
        <div class="headlines under">
          Пройдено шагов {count_watch.toString()} из{" "}
          {header.Points.length.toString()}
        </div>
        <div class="lessons--watch">
          {header.Points.map((lessons) => {
            return (
              <ButtonOnClick
                key={"lesson" + lessons.lesson_id.toString()}
                type={lessons.type}
                current_lesson_id={current_lesson}
                lesson_id={lessons.lesson_id}
                is_done={lessons.is_done.toString()}
                onClick={() => {
                  const courseId = useCourseOpen().id;
                  if (courseId === undefined) {
                    console.error("Course не определён");
                    return;
                  }
                  getNextLessons(courseId, lessons.lesson_id).then((result) => {
                    setText(result);
                  });
                }}
              />
            );
          })}
        </div>
      </div>
    </header>
  );
}

function ButtonOnClick({
  is_done,
  type,
  onClick,
  current_lesson_id,
  lesson_id,
}: {
  is_done: string;
  type: string;
  onClick: Function;
  current_lesson_id: number;
  lesson_id: number;
}) {
  const isCurrent = current_lesson_id === lesson_id;
  return (
    <button
      class={`page--lesson--choose ${is_done === "true" ? "" : "none"} ${
        isCurrent ? "current-lessons" : ""
      }`}
      ON_click={onClick}
    >
      {type === "video" ? (
        <img src="../static/icons/video.svg" alt="" class="video__icon" />
      ) : (
        ""
      )}
    </button>
  );
}

export function LessonContentText({
  setText,
  text,
}: {
  setText: (argv0: LessonsStructure) => void;
  text: LessonsStructure;
}) {
  const body_lesson = text.lesson.lesson_body;
  const pagesPrev = body_lesson.footer.previous_lesson_id;
  const pagesNext = body_lesson.footer.next_lesson_id;

  return (
    <div class="lesson--content">
      <div class="lesson--text">
        {body_lesson.blocks.map((block) => (
          <div innerHTML={block.body}></div>
        ))}
      </div>
      <div class="lesson--pages">
        <PageButton
          key={"previous_lesson" + pagesPrev.toString()}
          page_id={pagesPrev}
          type="Предыдущая"
          onClick={() => {
            const courseId = useCourseOpen().id;
            if (courseId === undefined) {
              console.error("Course не определён");
              return;
            }
            getNextLessons(courseId, pagesPrev).then((result) => {
              setText(result);
            });
          }}
        />
        <button
          class="page--check"
          ON_click={() => {
            notCompleted(body_lesson.footer.current_lesson_id);
          }}
        >
          Отметить непройденным
        </button>
        <PageButton
          key={"lesson_page" + pagesNext.toString()}
          page_id={pagesNext}
          type="Следующая"
          onClick={() => {
            const courseId = useCourseOpen().id;
            if (courseId === undefined) {
              console.error("Course не определён");
              return;
            }
            getNextLessons(courseId, pagesNext).then((result) => {
              setText(result);
            });
          }}
        />
      </div>
    </div>
  );
}

function PageButton({
  page_id,
  type,
  onClick,
}: {
  page_id: number;
  type: string;
  onClick: Function;
}) {
  return page_id.toString() === "-1" ? (
    <button class="page--choose" ON_click={onClick} disabled>
      <label>{type}</label>
    </button>
  ) : (
    <button class="page--choose" ON_click={onClick}>
      <label>{type}</label>
    </button>
  );
}

export function TextVideo({
  type,
  current_lesson_id,
  lesson_id,
  body_lesson,
}: {
  type: string;
  current_lesson_id: number;
  lesson_id: number;
  body_lesson: LessonBody;
}) {
  const isCurrent = type === "video";
  //body_lesson.blocks.map((block) => <div innerHTML={block.body}></div>);
  return isCurrent ? (
    <video id="video">
      <source
        src={`http://217.16.21.64/api/video?lesson_id=${lesson_id}`}
        type="video/mp4"
      />
      Ваш браузер не поддерживает видео.
    </video>
  ) : (
    { body_lesson }
  );
}

export function VideoPlayer(video: string) {
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

function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60) || 0;
  const sec = Math.floor(seconds % 60) || 0;
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}
