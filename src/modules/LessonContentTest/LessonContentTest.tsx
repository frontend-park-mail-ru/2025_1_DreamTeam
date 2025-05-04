import { getNextLessons, getQuizLesson, getTestLesson, postQuizLesson, postTestLesson } from "@/api";
import { useCourseOpen } from "@/App";
import { useState } from "@/ourReact/jsx-runtime";
import { LessonsStructure } from "@/types/lesson";
import { QuizStructure, TestStructure } from "@/types/test";
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

const example = {
    "question": {
        "question_id": 1,
        "question": "Какие на Ваш взгляд существуют проблемы с ИБ в 2025?",
        "user_answer": {
            "status": "pending",
            "answer": "Нет проблем"
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
    const [quiz, setQuiz] = useState<QuizStructure>(exam);
    const [test, setTest] = useState<TestStructure>(example);
    const [isLoading, setLoading] = useState(true);
    const [check, setCheck] = useState("0");
    const body_lesson = text.lesson.lesson_body;
    const pagesPrev = body_lesson.footer.previous_lesson_id;
    const pagesNext = body_lesson.footer.next_lesson_id;
    const pagesCurrent = body_lesson.footer.current_lesson_id;
    const quiz_test = body_lesson.blocks[0].body === "quiz"
    if (isLoading) {
        quiz_test ?
        getQuizLesson(pagesCurrent).then((result) => {
            if (result === undefined) {
              console.error(result);
              setLoading(false)
              return <div>Ошибка</div>;
            }
            setQuiz(result);
            setLoading(false)
          }) : getTestLesson(pagesCurrent).then((result) => {
            if (result === undefined) {
              console.error(result);
              setLoading(false)
              return <div>Ошибка</div>;
            }
            setTest(result);
            setLoading(false)
          })
    }
    const question = quiz_test ? quiz.test.question : test.question.question
    

  return (
    <div class="lesson--content">
        <div class="lesson__test">
            <strong>Вопрос</strong>
        </div>
        <div class="lesson__test">
            {question}
        </div>
        <form class="form-answer">
            { quiz_test ?
             (quiz.test.answers.map((block) => (
                <div class={`block-answer ${quiz.test.user_answer.answer_id != 0 ? (quiz.test.user_answer.answer_id === block.answer_id ? (quiz.test.user_answer.is_right === true ? "right" : "wrong") : "") : ""} ${quiz.test.user_answer.answer_id != 0 ? (block.is_right === true ? "right": "") : ""}`}>
                    <input type="radio" class="block-answer__input" name="contact" {...(quiz.test.user_answer.answer_id != 0 ? (quiz.test.user_answer.answer_id === block.answer_id ? {checked: true} : {}) : {})} value={block.answer_id} ON_input={(event: { target: { value: string } }) => {
                setCheck(event.target.value);
            }}/>
                    <div>{block.answer}</div>
                </div>
                ))
        ): (<input type="text" class="text__input__test" value={test.question.user_answer.status != "not passed" ? test.question.user_answer.answer : ""} ON_input={(event: { target: { value: string } }) => {
                setCheck(event.target.value);
              }}/>)}
        </form>
        <div>{quiz_test ? (test.question.user_answer.status != "not passed" ? test.question.user_answer.status : "") : ""}</div>
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
          ON_click={async () => {
            const id = useCourseOpen().id;
            if (id === undefined) {
              console.error("Ошибка");
              return;
            }
            const check_test = quiz_test ? await postQuizLesson(pagesCurrent, Number(check), id) : await postTestLesson(test.question.question_id, check);
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
