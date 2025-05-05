import { useState } from "@/ourReact/jsx-runtime";

import CreateSurvey from "@/components/CreateSurvey";
import "./CreateSurvey.css";
import { QuestionsStructure } from "@/types/question";
import { sendQuestions } from "@/api";

const exam = {
    "questions": [
      {
        "question": "Насколько вы удовлетворены нашим продуктом?",
        "left_lebal": "Совсем не удовлетворен",
        "right_lebal": "Полностью удовлетворен",
        "metric": "CSAT"
      },
      {
        "question": "Насколько вероятно, что вы порекомендуете наш сервис компанию друзьям или коллегам?",
        "left_lebal": "Точно не порекомендую",
        "right_lebal": "Обязательно порекомендую",
        "metric": "NPS"
      },
      {
        "question": "Насколько вам удобно перемещаться между шагами?",
        "left_lebal": "Не удобно абсолютно",
        "right_lebal": "Все идеально",
        "metric": "CSI"
      }
    ]
}

const SurveyContent = () => {
  const [numbers, setNumbers] = useState(1);
  const [text, setText] = useState<QuestionsStructure>(exam);
  const [question, setQuestion] = useState({
        "question": "Насколько вам удобно перемещаться между шагами?",
        "left_lebal": "Не удобно абсолютно",
        "right_lebal": "Все идеально",
        "metric": "CSI"
      });
  const save_number = () => {
    let array = []
    for(let i=1; i<=numbers; i++) {
        array.push(i)
    }
    return array
  }

  const s = save_number();
  console.log(s)

  return (
    <div class="profile">
        <div class="profile__block">
            <div class="profile__block__question">Сколько вопросов хотите задать пользователям?</div>
            <div>
                <input type="number"
                class="number__input" 
                min="1"
                value="1"
                ON_input={(event: { target: { value: number } }) => {
                setNumbers(event.target.value);
                const s = save_number();
                }}/>
            </div>
        </div>
        <div>
            {s.map((element) => {
                return (<div class="header__survey">
                    <h1 class="header__survey__name">Вопрос {element.toString()}</h1>
                    <div class="division">
                        <div class="strings">
                            Вопрос
                            <input
                                type="text"
                                class="text__input"
                                style={{ height: '39px' }}
                                ON_input={(event: { target: { value: string } }) => {
                                    setQuestion({
                                        "question": event.target.value,
                                        "left_lebal": question.left_lebal,
                                        "right_lebal": question.right_lebal,
                                        "metric": question.metric
                                      });
                                    }}
                            />
                        </div>
                        <div class="strings">
                            Левая подпись
                            <input
                                type="text"
                                class="text__input"
                                style={{ height: '39px' }}
                                ON_input={(event: { target: { value: string } }) => {
                                    setQuestion({
                                        "question": question.question,
                                        "left_lebal": event.target.value,
                                        "right_lebal": question.right_lebal,
                                        "metric": question.metric
                                      });
                                    }}
                            
                            />
                        </div>
                        <div class="strings">
                            Правая подпись
                            <input
                                type="text"
                                class="text__input"
                                style={{ height: '39px' }}
                                ON_input={(event: { target: { value: string } }) => {
                                    setQuestion({
                                        "question": question.question,
                                        "left_lebal": question.left_lebal,
                                        "right_lebal": event.target.value,
                                        "metric": question.metric
                                      });
                                    }}
                            />
                        </div>
                        <div class="strings">
                            Метрика
                            <input
                                type="text"
                                class="text__input"
                                style={{ height: '39px' }}
                                ON_input={(event: { target: { value: string } }) => {
                                    setQuestion({
                                        "question": question.question,
                                        "left_lebal": question.left_lebal,
                                        "right_lebal": question.right_lebal,
                                        "metric": event.target.value
                                      });
                                    }}
                            />
                        </div>
                    </div>
                </div>)

            })}
            </div>
        <div>
            <button class="button__input" style="width: 150px;" ON_click={() => {
          setText({"questions": [question]});
          sendQuestions({"questions": [question]})
          console.log(question)
        }}>
            <div class="survey__name" >Создать опрос</div>
            </button>
        </div>

    </div>
      
  );
}

export default SurveyContent;
