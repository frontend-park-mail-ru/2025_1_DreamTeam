import { getNextLessons } from "@/api";
import { setCourseOpen, useCourseOpen } from "@/stores";
import { router } from "@/router";
import { Header, LessonsStructure } from "@/types/lesson";
import ButtonCourse from "@/ui/ButtonCourse";
import closeIcon from "Public/static/icons/closeCourse.svg";
import arrowDownIcon from "Public/static/icons/arrowDown40x40.svg";
import styles from "./Lesson.module.scss";

export const LessonHeader = ({
  setText,
  header,
  text,
}: {
  setText: (argv0: LessonsStructure) => void;
  header: Header;
  text: LessonsStructure;
}) => {
  const lesson = header.part.order.toString();
  const current_lesson = text.lesson.lesson_body.footer.current_lesson_id;
  const name_lesson = header.part.title;
  const lesson_after = header.bucket.order.toString();
  const name_lesson_after = header.bucket.title;
  let count_watch = 0;
  header.Points.forEach((lessons) => {
    lessons.is_done.toString() === "true" ? (count_watch += 1) : count_watch;
  });
  let count_page = 0;
  return (
    <header class={styles.courseHeader}>
      <div
        class={styles.closePage}
        ON_click={() => {
          const id = useCourseOpen().id;
          router.goToPath(`/course/${id}`);
        }}
      >
        <img style={"cursor: pointer;"} src={arrowDownIcon} />
      </div>
      <div class={styles.info}>
        <div class={styles.headlines}>{header.course_title}</div>
        <div class={`${styles.headlines} ${styles.under}`}>
          {lesson}. {name_lesson} {lesson_after}. {name_lesson_after}
        </div>
        <div class={styles.lessonPages}>
          <div class={`${styles.headlines} ${styles.under} ${styles.count}`}>
            Пройдено шагов {count_watch.toString()} из{" "}
            {header.Points.length.toString()}
          </div>
          <div class={styles.lessonsWatch}>
            {header.Points.map((lessons) => {
              count_page += 1;
              return (
                <ButtonCourse
                  key={"lesson" + lessons.lesson_id.toString()}
                  current_lesson_id={current_lesson}
                  count_page={count_page}
                  lesson_id={lessons.lesson_id}
                  is_done={lessons.is_done.toString()}
                  points={header}
                  onClick={() => {
                    const courseId = useCourseOpen().id;
                    if (courseId === undefined) {
                      console.error("Course не определён");
                      return;
                    }
                    getNextLessons(courseId, lessons.lesson_id).then(
                      (result) => {
                        setText(result);
                      }
                    );
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div
        class={styles.closePage}
        ON_click={() => {
          setCourseOpen({});
          router.goByState("MainMenu");
        }}
      >
        <img style={"cursor: pointer;"} src={closeIcon} />
      </div>
    </header>
  );
};
