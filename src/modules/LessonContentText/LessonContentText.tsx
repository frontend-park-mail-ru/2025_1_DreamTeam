import {
  Completed,
  getLessons,
  getNextLessons,
  markCourseAsCompleted,
  notCompleted,
} from "@/api";
import { useCourseOpen } from "@/stores";
import { LessonsStructure } from "@/types/lesson";
import PageButton from "@/ui/PageButton";
import styles from "./LessontContentText.module.scss";
import { useState } from "@/ourReact/jsx-runtime";
import { generateSertificate, getSertificate } from "@/api/Course/certificate";
import { router } from "@/router";

export default function LessonContentText({
  setText,
  text,
  current_lesson_id,
}: {
  setText: (argv0: LessonsStructure) => void;
  text: LessonsStructure;
  current_lesson_id: number;
}) {
  const [isLoading, setLoading] = useState(false);
  const [isNumber, setNumber] = useState(current_lesson_id);
  const [isGo, setGo] = useState(false);
  const body_lesson = text.lesson.lesson_body;
  const pagesPrev = body_lesson.footer.previous_lesson_id;
  const pagesNext = body_lesson.footer.next_lesson_id;
  if (isLoading) {
    let is_done_current_id = false;
    text.lesson.header.Points.forEach((lessons) => {
      lessons.lesson_id === current_lesson_id
        ? lessons.is_done
          ? (is_done_current_id = true)
          : (is_done_current_id = false)
        : (is_done_current_id = false);
    });
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const targetElement = document.querySelector(".target-element");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setNumber(current_lesson_id);
          setGo(true);
        }
      });
    }, options);
    if (targetElement && !is_done_current_id) {
      observer.observe(targetElement);
    } else {
      console.log("YYYYYYYYYY");
    }
    if (isGo && isNumber === current_lesson_id) {
      Completed(current_lesson_id)
        .then((r) => {
          if (r === undefined) {
            console.error("Course не определён");
            return;
          }
          observer.disconnect();
          console.log(current_lesson_id, "УУУУУУУУУУУУУУ");
        })
        .catch((error) => {
          console.error("Ошибка при выполнении Completed:", error);
        });
      console.log("Элемент виден!");
      observer.disconnect();
      setGo(false);
      setLoading(false);
    }
  }
  console.log(isLoading);

  return (
    <div class={styles.content}>
      <div class={styles.lessonText}>
        {body_lesson.blocks.map((block) => (
          <div innerHTML={block.body}></div>
        ))}
      </div>
      <div class={`${styles.lessonPages}`}>
        <PageButton
          key={"previous_lesson" + pagesPrev.toString()}
          page_id={pagesPrev.toString()}
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
          class={`${styles.pageCheck}`}
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
                  window.scrollTo(0, 0);
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
          page_id={pagesNext.toString()}
          type="Следующая"
          onClick={() => {
            const courseId = useCourseOpen().id;
            if (courseId === undefined) {
              console.error("Course не определён");
              return;
            }
            console.log(courseId);
            if (pagesNext !== -1) {
              getNextLessons(courseId, pagesNext).then((result) => {
                setText(result);
              });
            } else {
              console.log("AAAAAAAAAAAAAKKROFJKROJVROCOVJOCJVEOJV");
              generateSertificate(courseId).then((result) => {
                if (result === undefined) {
                  console.error("Ошибка в гет сертификат");
                }
                // router.goToPath(`/course/${courseId}/description`);
                console.log(result);
                router.goToPath(`/course/${courseId}/end`);
              });
              markCourseAsCompleted(courseId).then((result) => {
                if (result === undefined) {
                  console.error("Ошибка в марк курсе как завершён");
                }
              });
              console.error("Course не определён");
              return;
            }
          }}
        />
      </div>
      <div
        class={`target-element`}
        value={current_lesson_id}
        ON_click={setLoading(true)}
      />
    </div>
  );
}
