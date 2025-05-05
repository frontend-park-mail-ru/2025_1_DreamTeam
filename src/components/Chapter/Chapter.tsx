import { setLessonID, useCourseOpen } from "@/stores";
import { useState } from "@/ourReact/jsx-runtime";
import { Bucket } from "@/pages/CourseMenu/CourseMenuContent";
import { router } from "@/router";
import arrowDownIcon from "Public/static/icons/arrowDown40x40.svg";
import styles from "./Chapter.module.scss";

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
    ? styles.color_is_done
    : styles.color_is_not_done;

  return (
    <div class={styles.chapter}>
      <div class={styles.progressColumn}>
        <div class={styles.progress__progressCircle_type_big}>
          <div
            class={`${styles.circle} ${styles.w24} ${styles.h24} ${chapterIsDone}`}
          ></div>
        </div>
        <div class={styles.progress__progressLine}>
          <div class={`${styles.line} ${chapterIsDone}`}></div>
        </div>
      </div>
      <div
        class={styles.progressTextBlock}
        ON_click={() => {
          setStatus(!useStatus);
        }}
      >
        <div class={styles.progressTextBlockTitle}>
          {title}
          <img
            src={arrowDownIcon}
            alt=""
            class={`${styles.animationRotate} ${
              useStatus ? styles.flipped : ""
            }`}
          />
        </div>
        {useStatus ? (
          <div>
            {subchapters.map((subchapter) => {
              console.log(subchapter);
              const subchapterIsDone = subchapter.lessons.every(
                (lesson) => lesson.is_done
              )
                ? styles.color_is_done
                : styles.color_is_not_done;

              return (
                <div>
                  <div class={styles.progress__progressLine_type_small}>
                    <div class={`${styles.line} ${subchapterIsDone}`}></div>
                  </div>
                  <div
                    class={styles.subchapter}
                    ON_click={() => {
                      setLessonID(subchapter.lessons[0].lesson_id);
                      router.goToPath(`/course/${useCourseOpen().id}/lessons`);
                    }}
                  >
                    <div class={styles.progress__progressCircle_type_small}>
                      <div
                        class={`${styles.circle} ${styles.w24} ${styles.h24} ${subchapterIsDone}`}
                      ></div>
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
