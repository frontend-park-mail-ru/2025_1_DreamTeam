import { getLessons, getNextLessons, notCompleted } from "@/api";
import { useCourseOpen } from "@/stores";
import { LessonsStructure } from "@/types/lesson";
import PageButton from "@/ui/PageButton";
import styles from "./LessontContentText.module.scss";

export default function LessonContentText({
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
    <div class={styles.content}>
      <div class={styles.lessonText}>
        {body_lesson.blocks.map((block) => (
          <div innerHTML={block.body}></div>
        ))}
      </div>
      <div class={styles.lessonPages}>
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
          class={styles.pageCheck}
          ON_click={() => {
            const id = useCourseOpen().id;
            if (id === undefined) {
              console.error("Ошибка");
              return;
            }
            notCompleted(body_lesson.footer.current_lesson_id).then((r) => {
              if (r === undefined) {
                console.error("Course не определён");
                return;
              }
              getLessons(id).then((result) => {
                if (result === undefined) {
                  console.error("Course не определён");
                  return;
                }
                setText(result);
              });
            });
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
