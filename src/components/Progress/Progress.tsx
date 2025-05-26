import { StatisticType } from "@/types/staticsCourse";
import styles from "./Progress.module.scss";

const isCompleted = (completed: number, total: number) => completed === total;
const getClass = (completed: number, total: number) =>
  isCompleted(completed, total) ? styles.goodProgress : styles.processProgress;

const Progress = ({ data }: { data: StatisticType }) => {
  const classColorLesson = getClass(
    data.completed_lessons,
    data.amount_lessons
  );
  const classColorVideo = getClass(data.completed_videos, data.amount_videos);
  const classColorTest = getClass(data.completed_tests, data.amount_tests);
  const classColorQuestion = getClass(
    data.completed_questions,
    data.amount_questions
  );
  const classColorPoints = getClass(data.received_points, data.amount_points);
  const classColorPercentage =
    data.percentage === 100 ? styles.goodProgress : styles.processProgress;

  return (
    <div class={styles.progressContainer}>
      <div class={styles.progress}>
        <div class={styles.progressTitle}>
          Изучили{" "}
          <label class={classColorPercentage}>
            {data.percentage.toString()}%
          </label>{" "}
          материала
        </div>
        <div class={styles.progressBars}>
          <div class={styles.progressBar}>
            <div>Прошли</div>
            <div>Просмотрели</div>
          </div>
          <div class={styles.progressBar}>
            <div>
              <label class={classColorLesson}>
                {data.completed_lessons.toString()} из{" "}
                {data.amount_lessons.toString()}{" "}
              </label>{" "}
              уроков
            </div>
            <div>
              <label class={classColorVideo}>
                {data.completed_videos.toString()} из{" "}
                {data.amount_videos.toString()}
              </label>{" "}
              видео
            </div>
          </div>
        </div>
      </div>
      <div class={styles.progress}>
        <div class={styles.progressTitle}>
          Вы на курсе набрали{" "}
          <label class={classColorPoints}>
            {data.received_points.toString()} из {data.amount_points.toString()}
          </label>{" "}
          баллов
        </div>
        <div class={styles.progressBarsPoint}>
          <div class={styles.progressBar}>
            <div>Правильно ответили на:</div>
          </div>
          <div class={styles.progressBar}>
            <div>
              <label class={classColorTest}>
                {data.completed_tests.toString()} из{" "}
                {data.amount_tests.toString()}
              </label>{" "}
              квизов
            </div>
            <div>
              <label class={classColorQuestion}>
                {data.completed_questions.toString()} из{" "}
                {data.amount_questions.toString()}
              </label>{" "}
              вопросов
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
