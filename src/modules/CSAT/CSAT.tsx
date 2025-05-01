import { useState } from "@/ourReact/jsx-runtime";
import "./CSAT.css";
import logicNext from "./logic/logicNext";
import { setCSAT, useCSAT } from "@/App";
import { getSurvey } from "@/api";

const Csat = () => {
  const [useNumber, setNumber] = useState(-1);
  const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [isLoading, setLoading] = useState(true);

  if (isLoading) {
    getSurvey().then((data) => {
      if (data) {
        setCSAT({
          question: data,
          currentQuest: 0,
        });
      }
      setLoading(false);
    });
  }

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  const countQuestion = useCSAT().question.survey.questions.length;

  const oneQuestionIndex = useCSAT().question.survey.questions[0].question_id;

  const lastQuestionIndex = oneQuestionIndex + countQuestion - 1;

  const currentQuestionData =
    useCSAT().question.survey.questions[useCSAT().currentQuest];

  console.log(useCSAT());

  return (
    <div class="CSAT">
      <div class="CSAT__text">{currentQuestionData.question}</div>
      <div class="CSAT-choose-rating">
        {number.map((numb) => {
          return (
            <div
              class={`CSAT-choose-rating__choose ${
                numb <= useNumber ? "choose-rating-number" : ""
              }`}
              ON_click={() => {
                setNumber(numb);
              }}
            >
              {numb.toString()}
            </div>
          );
        })}
      </div>
      <div class="CSAT-critical-points">
        <div class="CSAT-critical-points__point_min">
          {currentQuestionData.left_label}
        </div>
        <div class="CSAT-critical-points__point_max">
          {currentQuestionData.right_label}
        </div>
      </div>
      <div class="CSAT-buttons">
        <div
          class="CSAT-buttons__button"
          ON_click={() => {
            if (useNumber === -1) {
              return;
            }
            logicNext(useNumber);
            setNumber(-1);
          }}
        >
          {currentQuestionData.question_id === lastQuestionIndex
            ? "Готово"
            : "Далее"}
        </div>
      </div>
    </div>
  );
};

export default Csat;
