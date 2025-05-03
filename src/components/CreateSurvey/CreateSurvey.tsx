import { QuestionsStructure } from "@/types/question";
import "./CreateSurvey.css";
import { useState } from "@/ourReact/jsx-runtime";

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

export const CreateSurvey = ({number_of_question}: {number_of_question: string}) => {
    const [text, setText] = useState<QuestionsStructure>(exam);
    const [question, setQuestion] = useState("");
    const [leftLabel, setLeftLabel] = useState("");
    const [rightLabel, setRightLabel] = useState("");
    const [metric, setMetric] = useState("CSAT");

    return (
        <div className="header__survey">
            <h1 className="header__survey__name">Вопрос {number_of_question}</h1>
            <div className="division">
                <div className="strings division">
                    Вопрос
                    <input
                        type="text"
                        className="text__input"
                        style={{ height: '39px' }}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className="strings division">
                    Левая подпись
                    <input
                        type="text"
                        className="text__input"
                        style={{ height: '39px' }}
                        value={leftLabel}
                        onChange={(e) => setLeftLabel(e.target.value)}
                    />
                </div>
                <div className="strings division">
                    Правая подпись
                    <input
                        type="text"
                        className="text__input"
                        style={{ height: '39px' }}
                        value={rightLabel}
                        onChange={(e) => setRightLabel(e.target.value)}
                    />
                </div>
                <div className="strings division">
                    Метрика
                    <select
                        value={metric}
                        onChange={(e) => setMetric(e.target.value)}
                    >
                        <option>CSAT</option>
                        <option>NPS</option>
                        <option>CSI</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default CreateSurvey;