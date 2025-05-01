import { sendSurveyAnswer } from "@/api";
import { setCSAT, useCSAT } from "@/App";
import closeFrame from "@/closeFrame";

const logicNext = async (number: number) => {
  const currentQuestionIndex = useCSAT().currentQuest;

  const nextQuestion =
    useCSAT().question.survey.questions[currentQuestionIndex + 1];

  await sendSurveyAnswer(
    useCSAT().question.survey.questions[currentQuestionIndex].question_id,
    number
  );

  if (nextQuestion) {
    setCSAT({
      question: useCSAT().question,
      currentQuest: currentQuestionIndex + 1,
    });
  } else {
    console.log("Опрос завершен");
    closeFrame();
  }
};

export default logicNext;
