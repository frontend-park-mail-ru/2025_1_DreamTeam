import { setCourseOpen, setPage, useCourseOpen } from "./App";
import starIcon from "../public/static/icons/star.svg";
import timeIcon from "../public/static/icons/time.svg";
import userIcon from "../public/static/icons/user.svg";
import addCourseIcon from "../public/static/icons/addCourse.svg";
import descIcon from "../public/static/icons/descriptionCourse.svg";
import contentIcon from "../public/static/icons/contentCourse.svg";
import reviewIcon from "../public/static/icons/reviewsCourse.svg";
import closeIcon from "../public/static/icons/closeCourse.svg";
import countMarkIcon from "../public/static/icons/courseCountMark.svg";
import countBestMarkIcon from "../public/static/icons/courseCountBestMark.svg";
import countTestIcon from "../public/static/icons/courseCountTest.svg";
import countTimeVideoIcon from "../public/static/icons/courseCountTimeVideo.svg";
import countLessonIcon from "../public/static/icons/courseCountLesson.svg";
import arrowDownIcon from "../public/static/icons/arrowDown40x40.svg";
import { useState } from "@/ourReact/jsx-runtime";
import GoogleIcon from "./components/GoogleIcon";
import { GoogleIconType } from "./components/GoogleIcon/GoogleIcon";

export function CourseMenuHeader({
  useFunc,
  setFunc,
}: {
  useFunc: string;
  setFunc: (argv0: string) => void;
}) {
  const data = useCourseOpen();
  const sections = [
    {
      type: "description",
      name: "Описание",
      image: descIcon,
      click: () => {
        setFunc("description");
      },
    },
    {
      type: "content",
      name: "Содержание",
      image: contentIcon,
      click: () => {
        setFunc("content");
      },
    },
    {
      type: "review",
      name: "Отзывы",
      image: reviewIcon,
      click: () => {
        setFunc("review");
      },
    },
  ];
  return (
    <header class="course-header1">
      <div class="close-page"></div>
      <div class="header-content">
        <div class="header-info">
          <div class="course-image"></div>
          <div class="course-text">
            <div class="course-name">{data.title}</div>
            <div class="course-descriptions">
              <div class="course-description">
                <img class="course-description__img" src={starIcon} />
                <div class="course-description__text">
                  <div class="course-description__text-number">
                    {(data.rating ?? 0).toFixed(1)}
                  </div>{" "}
                  <div class="course-description__text-text">рейтинг</div>
                </div>
              </div>
              <div class="course-description">
                <img class="course-description__img" src={timeIcon} />
                <div class="course-description__text">
                  <div class="course-description__text-number">
                    {data.time_to_pass?.toString()}
                  </div>{" "}
                  <div class="course-description__text-text">часов</div>
                </div>
              </div>
              <div class="course-description">
                <img class="course-description__img" src={userIcon} />
                <div class="course-description__text">
                  <div class="course-description__text-number">
                    {data.purchases_amount?.toString()}
                  </div>{" "}
                  <div class="course-description__text-text">записались</div>
                </div>
              </div>
            </div>
            <div class="course-tags">
              {data.tags?.map((tag, index) => (
                <div key={index} class="course-tag">
                  {tag}
                </div>
              ))}
            </div>
            <div class="course-price-and-button">
              <div
                class={`course-price-and-button__price ${
                  data.price === 0 ? "color-free" : ""
                }`}
              >
                {data.price === 0 ? "Бесплатно" : `${data.price?.toString()} ₽`}
              </div>
              <div class="course-price-and-button__button">
                <img class="button__icon" src={addCourseIcon} />
                Записаться на курс
              </div>
            </div>
          </div>
        </div>
        <div class="changes1">
          {sections.map((section) => (
            <div
              ON_click={section.click}
              class={
                "change" + (useFunc === section.type ? " change-active" : "")
              }
            >
              <img class="changes1__img" src={section.image} />
              {section.name}
            </div>
          ))}
        </div>
      </div>
      <div
        class="close-page"
        ON_click={() => {
          setCourseOpen({});
          setPage("MainMenu");
        }}
      >
        <img style={"cursor: pointer;"} src={closeIcon} />
      </div>
    </header>
  );
}

export function CourseMenuContent3() {
  const [useStatus, setStatus] = useState("description");

  return (
    <div>
      <CourseMenuHeader
        key="CourseHeader"
        useFunc={useStatus}
        setFunc={setStatus}
      />
      {useStatus === "description" ? (
        <CourseMenuContent key="CourseDescription" />
      ) : useStatus === "content" ? (
        <CourseMenuContent2 key="CourseContent" />
      ) : (
        ""
      )}
    </div>
  );
}

export function CourseMenuContent() {
  const data = useCourseOpen();
  return (
    <div class="content">
      <div class="text-content" innerHTML={data.description}></div>
    </div>
  );
}

export type Lesson = {
  lesson_id: number;
  lesson_title: string;
  lesson_type: string;
  is_done: boolean;
};

export type Bucket = {
  bucket_id: number;
  bucket_title: string;
  lessons: Lesson[];
};

export type Part = {
  part_id: number;
  part_title: string;
  buckets: Bucket[];
};

export type CourseStructure = {
  parts: Part[];
};

export function CourseMenuContent2() {
  const [parts, setParts] = useState<CourseStructure>({ parts: [] });
  const [isLoading, setLoading] = useState(true);
  const courseOpen = useCourseOpen();

  if (courseOpen.id === undefined) {
    console.error("ID is undefined");
    return <div class="content">Ошибка: ID не найден</div>;
  }

  if (isLoading) {
    getCourseRoadmap(courseOpen.id).then((data) => {
      console.log("data", data);
      setParts(data);
      console.log("data2", parts);
      setLoading(false);
    });
  }

  console.log("render CourseMenu");
  if (isLoading) {
    // TODO: Потом добавлю вывод более подробный
    return <div class="content">Загрузка</div>;
  }

  return (
    <div class="content">
      <div class="section-content">
        <div></div>
        <div class="content-table">
          {!parts.parts?.length ? (
            <div class="dont-content">Содержание отсутствует</div>
          ) : (
            parts.parts.map((part, index) => {
              const chapterIsDone = part.buckets.every((bucket) =>
                bucket.lessons.every((lesson) => lesson.is_done)
              )
                ? "color_is_done"
                : "color_is_not_done";

              return (
                <div>
                  <Chapter
                    key={`chapter-${part.part_id}`}
                    title={part.part_title}
                    subchapters={part.buckets}
                  />
                  {index !== parts.parts.length - 1 ? (
                    <div class="progress__progress-line_type_medium">
                      <div class={`line ${chapterIsDone}`}></div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          )}
        </div>
        {parts.parts?.length ? (
          <EnterCourse
            key="EnterCourse"
            mark={0}
            bestMark={0}
            countTest={countTests(parts.parts)}
            countTimeToPassVideo={0}
            countLesson={countLessons(parts.parts)}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export function Chapter({
  title,
  subchapters,
}: {
  title: string;
  subchapters: Bucket[];
}) {
  const [useStatus, setStatus] = useState(false);
  const chapterIsDone = subchapters.every((bucket) =>
    bucket.lessons.every((lesson) => lesson.is_done)
  )
    ? "color_is_done"
    : "color_is_not_done";

  return (
    <div class="chapter">
      <div class="progress-column">
        <div class="progress__progress-circle_type_big">
          <div class={`circle w-24 h-24 ${chapterIsDone}`}></div>
        </div>
        <div class="progress__progress-line">
          <div class={`line ${chapterIsDone}`}></div>
        </div>
      </div>
      <div
        class="progress-text-block"
        ON_click={() => {
          setStatus(!useStatus);
        }}
      >
        <div class="progress-text-block-title">
          {title}
          <img
            src={arrowDownIcon}
            alt=""
            class={`animation-rotate ${useStatus ? "flipped" : ""}`}
          />
        </div>
        {useStatus ? (
          <div>
            {subchapters.map((subchapter) => {
              console.log(subchapter);
              const subchapterIsDone = subchapter.lessons.every(
                (lesson) => lesson.is_done
              )
                ? "color_is_done"
                : "color_is_not_done";

              return (
                <div>
                  <div class="progress__progress-line_type_small">
                    <div class={`line ${subchapterIsDone}`}></div>
                  </div>
                  <div class="subchapter">
                    <div class="progress__progress-circle_type_small">
                      <div class={`circle w-24 h-24 ${subchapterIsDone}`}></div>
                    </div>
                    {subchapter.bucket_title}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

function pluralize(count: number, words: [string, string, string]) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return words[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return words[1];
  return words[2];
}

function countLessons(parts: Part[]): number {
  return parts.reduce((lessonCount, part) => {
    return (
      lessonCount +
      part.buckets.reduce((bucketCount, bucket) => {
        return bucketCount + bucket.lessons.length;
      }, 0)
    );
  }, 0);
}

function countTests(parts: Part[]): number {
  return parts.reduce((testCount, part) => {
    return (
      testCount +
      part.buckets.reduce((bucketCount, bucket) => {
        return (
          bucketCount +
          bucket.lessons.filter((lesson) => lesson.lesson_type === "test")
            .length
        );
      }, 0)
    );
  }, 0);
}

export function EnterCourse({
  mark,
  bestMark,
  countTest,
  countTimeToPassVideo,
  countLesson,
}: {
  mark: number;
  bestMark: number;
  countTest: number;
  countTimeToPassVideo: number;
  countLesson: number;
}) {
  const hours = Math.floor(countTimeToPassVideo / 3600);
  const minutes = Math.floor((countTimeToPassVideo % 3600) / 60);

  const hourLabel = pluralize(hours, ["час", "часа", "часов"]);
  const minuteLabel = pluralize(minutes, ["минута", "минуты", "минут"]);

  return (
    <div class="course-content-description">
      <div class="course-content-description-section">
        Сертификат
        <div class="course-content-description-block">
          <div class="course-content-description-block__desc">
            <img src={countMarkIcon} alt="" />
            {mark.toString()} баллов - об окончании
          </div>
          <div class="course-content-description-block__desc">
            <img src={countBestMarkIcon} alt="" />
            {bestMark.toString()} баллов - с отличием
          </div>
        </div>
      </div>
      <div class="course-content-description-section">
        В курс входят
        <div>
          <div class="course-content-description-block__desc">
            <img src={countTestIcon} alt="" />
            {countTest.toString()} тестов
          </div>
          <div class="course-content-description-block__desc">
            <img src={countTimeVideoIcon} alt="" />
            {hours > 0 ? `${hours.toString()} ${hourLabel}` : ""}{" "}
            {minutes.toString()} {minuteLabel} видео
          </div>
          <div class="course-content-description-block__desc">
            <img src={countLessonIcon} alt="" />
            {countLesson.toString()} уроков
          </div>
        </div>
      </div>
    </div>
  );
}

// FIX: пока не рабочий
export function IconAndText({
  icon,
  text,
  className,
}: {
  icon: GoogleIconType;
  text: string;
  className: string;
}) {
  return (
    <div class={className}>
      <GoogleIcon key={`icon-${icon}`} i={icon} width={40} height={40} />
      {text}
    </div>
  );
}
