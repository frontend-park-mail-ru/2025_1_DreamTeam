import { Header } from "@/types/lesson";
import styles from "./ButtonCourse.module.scss";

const ButtonCourse = ({
  is_done,
  onClick,
  current_lesson_id,
  count_page,
  lesson_id,
  points,
}: {
  is_done: string;
  onClick: Function;
  current_lesson_id: number;
  count_page: number;
  lesson_id: number;
  points: Header;
}) => {
  const isCurrent = current_lesson_id === lesson_id;
  return (
    <div class={styles.page__lesson}>
      <button
        class={`${styles.page__lesson__choose} ${
          is_done === "true" ? "" : styles.none
        } ${isCurrent ? styles.currentLessons : ""}`}
        ON_click={onClick}
      >
        {count_page.toString()}
      </button>
      {count_page != points.Points.length && points.Points.length > 1 ? (
        <div
          class={`${styles.stripPage} ${
            is_done === "true" && points.Points[count_page].is_done === true
              ? styles.isDone
              : styles.noneDone
          }`}
        />
      ) : (
        <div />
      )}
    </div>
  );
};

export default ButtonCourse;
