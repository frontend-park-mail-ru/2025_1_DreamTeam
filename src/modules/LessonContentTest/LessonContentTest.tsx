import { getLessons, getNextLessons, getTestLesson, notCompleted, postTestLesson } from "@/api";
import { useCourseOpen } from "@/App";
import { useState } from "@/ourReact/jsx-runtime";
import { LessonsStructure } from "@/types/lesson";
import { TestStructure } from "@/types/test";
import PageButton from "@/ui/PageButton";
import "./LessonContentTest.scss"

const exam = {
    "test": {
        "question_id": 2,
        "question": "Выберите то, что не относится к методам обеспечения конфиденциальности",
        "answers": [
            {
                "answer_id": 2,
                "answer": "Шифрование данных",
                "is_right": false
            },
            {
                "answer_id": 3,
                "answer": "Системы аутентификации и авторизации",
                "is_right": false
            },
            {
                "answer_id": 4,
                "answer": "Политики разграничения доступа",
                "is_right": false
            },
            {
                "answer_id": 5,
                "answer": "Цифровые подписи",
                "is_right": true
            }
        ],
        "user_answer": {
            "is_right": true,
            "question_id": 2,
            "answer_id": 5
        }
    }
}
export default function LessonContentTest({
  setText,
  text,
}: {
  setText: (argv0: LessonsStructure) => void;
  text: LessonsStructure;
}) {
    const [test, setTest] = useState<TestStructure>(exam);
    const [isLoading, setLoading] = useState(true);
    const [check, setCheck] = useState(0);
    const body_lesson = text.lesson.lesson_body;
    const pagesPrev = body_lesson.footer.previous_lesson_id;
    const pagesNext = body_lesson.footer.next_lesson_id;
    const pagesCurrent = body_lesson.footer.current_lesson_id;
    if (isLoading) {
        getTestLesson(pagesCurrent).then((result) => {
            if (result === undefined) {
              console.error(result);
              setLoading(false)
              return <div>Ошибка</div>;
            }
            setTest(result);
            setLoading(false)
          });
    }
    const right = test.test.user_answer;
    console.log(test)

  return (
    <div class="lesson--content">
        <div class="lesson__test">
            <strong>Вопрос</strong>
        </div>
        <div class="lesson__test">
            {test.test.question}
        </div>
        <form class="form-answer">
            {test.test.answers.map((block) => (
            <div class={`block-answer ${right.answer_id != 0 ? (right.answer_id === block.answer_id ? (right.is_right ? "right" : "wrong") : "") : ""}`}>
                <input type="radio" class="block-answer__input" name="contact" value={block.answer_id} ON_input={(event: { target: { value: number } }) => {
            setCheck(event.target.value);
          }}/>
                <div>{block.answer}</div>
            </div>
            ))}
        </form>
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
          ON_click={async () => {
            const id = useCourseOpen().id;
            if (id === undefined) {
              console.error("Ошибка");
              return;
            }
            const check_test = await postTestLesson(pagesCurrent, Number(check), id);
            if (check_test) {
                console.log("fyguglihlifkyrdkif" + "    " + check)
            }

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
