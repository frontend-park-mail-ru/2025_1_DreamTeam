import { getLessons, getNextLessons, getQuizLesson, getTestLesson, postQuizLesson, postTestLesson } from "@/api";
import { useCourseOpen } from "@/App";
import { useState } from "@/ourReact/jsx-runtime";
import { LessonsStructure } from "@/types/lesson";
import { QuizStructure} from "@/types/test";
import PageButton from "@/ui/PageButton";
import "./LessonContentQuiz.scss"

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
            "is_right": false,
            "question_id": 2,
            "answer_id": 0
        }
    }
}

export default function LessonContentQuiz({
  setText,
  text,
}: {
  setText: (argv0: LessonsStructure) => void;
  text: LessonsStructure;
}) {
    const [quiz, setQuiz] = useState<QuizStructure>(exam);
    const [isLoading, setLoading] = useState(true);
    const [check, setCheck] = useState("0");
    const body_lesson = text.lesson.lesson_body;
    const pagesPrev = body_lesson.footer.previous_lesson_id;
    const pagesNext = body_lesson.footer.next_lesson_id;
    const pagesCurrent = body_lesson.footer.current_lesson_id;
    if (isLoading) {
      getQuizLesson(pagesCurrent).then((result) => {
            if (result === undefined) {
              console.error(result);
              setLoading(false)
              return <div>Ошибка</div>;
            }
            setQuiz(result);
            setLoading(false)
          }) 
      }

    const question = quiz.test.question
    const right = quiz.test.user_answer
    console.log(quiz)
    

  return (
    <div class="lesson--content">
        <div class="lesson__test">
            <strong>Вопрос</strong>
        </div>
        <div class="lesson__test">
            {question}
        </div>
        <form class="form-answer">
            { quiz.test.answers.map((block) => (
                <div class={`block-answer ${right.answer_id != 0 ? (right.answer_id === block.answer_id ? (right.is_right === true ? "right" : "wrong") : "") : ""} ${right.answer_id != 0 ? (block.is_right === true ? "right": "") : ""}`}>
                    <input type="radio" class="block-answer__input" name="contact" {...(right.answer_id !== 0 ? (right.answer_id === block.answer_id ? {checked: true} : {}) : {})} value={block.answer_id} ON_input={(event: { target: { value: string } }) => {
                setCheck(event.target.value);
            }}/>
                    <div>{block.answer}</div>
                </div>
                ))
        }
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
          class="page__check"
          ON_click={() => {
            const id = useCourseOpen().id;
            if (id === undefined) {
              console.error("Ошибка");
              return;
            }
            if (check != "0") {
              postQuizLesson(pagesCurrent, Number(check), id).then((r) => {
                if (r === undefined) {
                  console.error("Course не определён");
                  return;
                }
                getQuizLesson(pagesCurrent).then((result) => {
                  if (result === undefined) {
                    console.error(result);
                    return <div>Ошибка</div>;
                  }
                  setQuiz(result);
                })});
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
