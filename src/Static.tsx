import { useState } from "@/ourReact/jsx-runtime";
import { getSurveyMetrics } from "./api";

interface SurveyAnswer {
  username: string;
  answer: number;
}

interface SurveyMetric {
  type: string;
  count: number;
  avg: number;
  distribution: number[];
  answers: SurveyAnswer[];
}

interface SurveyMetrics {
  survey_metrics: {
    metrics: SurveyMetric[];
  };
}

const mockData: SurveyMetrics = {
  survey_metrics: {
    metrics: [
      {
        type: "CSAT",
        count: 5,
        avg: 7.2,
        distribution: [0, 0, 0, 0, 0, 0, 40, 20, 20, 20, 0],
        answers: [
          { username: "Александр", answer: 8 },
          { username: "Александр", answer: 7 },
          { username: "Александр", answer: 9 },
          { username: "Александр", answer: 6 },
          { username: "Александр", answer: 6 },
        ],
      },
      {
        type: "NPS",
        count: 7,
        avg: 6.714285714285714,
        distribution: [0, 0, 14, 0, 0, 0, 42, 0, 14, 14, 14],
        answers: [
          { username: "Александр", answer: 6 },
          { username: "Александр", answer: 6 },
          { username: "Александр", answer: 6 },
          { username: "Александр", answer: 8 },
          { username: "Александр", answer: 9 },
          { username: "Александр", answer: 10 },
          { username: "Александр", answer: 2 },
        ],
      },
      {
        type: "SCI",
        count: 5,
        avg: 6,
        distribution: [0, 0, 0, 0, 0, 60, 0, 20, 20, 0, 0],
        answers: [
          { username: "Александр", answer: 5 },
          { username: "Александр", answer: 5 },
          { username: "Александр", answer: 5 },
          { username: "Александр", answer: 7 },
          { username: "Александр", answer: 8 },
        ],
      },
    ],
  },
};

export default function Static() {
  const [stats, setStats] = useState<SurveyMetrics>(mockData);
  const [isLoading, setLoading] = useState(true);

  if (isLoading) {
    getSurveyMetrics().then((data) => {
      if (data === undefined) {
        console.error("Ошибка при загрузке метрик");
        setLoading(false);
        return;
      }
      console.log(data);
      setStats(data); // <-- Правильно обновляем стейт метрик
      setLoading(false);
    });
    return <div>Загрузка...</div>;
  }

  return (
    <div class="content">
      {stats.survey_metrics.metrics.map((metric) => (
        <div class="metric" key={metric.type}>
          <h2>{metric.type}</h2>
          <p>Количество ответов: {metric.count.toString()}</p>
          <p>Среднее значение: {metric.avg.toFixed(2).toString()}</p>

          <h3>Распределение (%)</h3>
          <div class="distribution">
            {metric.distribution.map((value, index) => (
              <div key={index} class="distribution-item">
                <span>{index.toString()}:</span> {value.toString()}%
              </div>
            ))}
          </div>

          <h3>Ответы</h3>
          <div class="answers">
            {metric.answers.map((ans, index) => (
              <div key={index.toString()} class="answer-item">
                {ans.username.toString()}: {ans.answer.toString()}
              </div>
            ))}
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
}
