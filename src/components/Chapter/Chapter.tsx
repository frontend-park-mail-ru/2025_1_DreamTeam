import { setLessonID, useCourseOpen } from "@/App";
import { useState } from "@/ourReact/jsx-runtime";
import { Bucket } from "@/pages/CourseMenu/CourseMenuContent";
import { router } from "@/router";
import arrowDownIcon from "Public/static/icons/arrowDown40x40.svg";

export default function Chapter({
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
                  <div
                    class="subchapter"
                    ON_click={() => {
                      setLessonID(subchapter.lessons[0].lesson_id);
                      router.goToPath(`/course/${useCourseOpen().id}/lessons`);
                    }}
                  >
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
