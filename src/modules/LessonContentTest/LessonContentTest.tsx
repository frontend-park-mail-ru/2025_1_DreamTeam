import { getNextLessons, getTestLesson, postTestLesson } from "@/api";
import { useCourseOpen } from "@/stores";
import { useState } from "@/ourReact/jsx-runtime";
import { LessonsStructure } from "@/types/lesson";
import { TestStructure } from "@/types/test";
import PageButton from "@/ui/PageButton";
import styles from "./LessonContentTest.module.scss";

const example = {
  question: {
    question_id: 1,
    question: "Какие на Ваш взгляд существуют проблемы с ИБ в 2025?",
    user_answer: {
      status: "pending",
      answer: "Нет проблем",
    },
  },
};
export default function LessonContentTest({
  setText,
  text,
}: {
  setText: (argv0: LessonsStructure) => void;
  text: LessonsStructure;
}) {
  const [test, setTest] = useState<TestStructure>(example);
  const [isLoading, setLoading] = useState(true);
  const [check, setCheck] = useState("not passed");
  const body_lesson = text.lesson.lesson_body;
  const pagesPrev = body_lesson.footer.previous_lesson_id;
  const pagesNext = body_lesson.footer.next_lesson_id;
  const pagesCurrent = body_lesson.footer.current_lesson_id;
  if (isLoading) {
    getTestLesson(pagesCurrent).then((result) => {
      if (result === undefined) {
        console.error(result);
        setLoading(false);
        return <div>Ошибка</div>;
      }
      setTest(result);
      setLoading(false);
    });
  }
  const question = test.question.question;

  return (
    <div class={styles.content}>
      <div class={styles.lesson__test}>
        <strong>Вопрос</strong>
      </div>
      <div class={styles.lesson__test}>{question}</div>
      <form class={styles.formAnswer}>
        <input
          type="text"
          class={styles.text__input__test}
          value={
            test.question.user_answer.status != "not passed"
              ? test.question.user_answer.answer
              : ""
          }
          ON_input={(event: { target: { value: string } }) => {
            setCheck(event.target.value);
          }}
        />
      </form>
      <div>
        {test.question.user_answer.status != "not passed"
          ? test.question.user_answer.status
          : ""}
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
          class={styles.page__check}
          ON_click={() => {
            const id = useCourseOpen().id;
            if (id === undefined) {
              console.error("Ошибка");
              return;
            }
            postTestLesson(test.question.question_id, check).then((r) => {
              if (r === undefined) {
                console.error("Course не определён");
                return;
              }
              getTestLesson(pagesCurrent).then((result) => {
                if (result === undefined) {
                  console.error(result);
                  setLoading(false);
                  return <div>Ошибка</div>;
                }
                setTest(result);
                setLoading(false);
              });
            });
          }}
        >
          Проверить
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
