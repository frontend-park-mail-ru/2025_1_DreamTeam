import { useState } from "@/ourReact/jsx-runtime";
import starIcon from "Public/static/icons/star.svg";
import starEmptyIcon from "Public/static/icons/starEmpty.svg";
import styles from "./Stars.module.scss";
import { postStar } from "@/api/Course/CourseOpen/postStar";

const Stars = ({
  courseID,
  onChange,
  initial = 0,
}: {
  courseID: number;
  onChange?: (n: number) => void;
  initial?: number;
}) => {
  const [rating, setRating] = useState(initial);

  const handleClick = (n: number) => {
    setRating(n);
    onChange?.(n);
  };

  return (
    <div class={styles.stars}>
      Оцените курс:
      <div class={styles.rating}>
        {[1, 2, 3, 4, 5].map((n) => (
          <img
            key={n}
            src={rating >= n ? starIcon : starEmptyIcon}
            alt={rating >= n ? "star" : "empty star"}
            class={styles.rating__star}
            style="cursor:pointer;"
            ON_click={() => handleClick(n)}
          />
        ))}
      </div>
      <div
        class={styles.rating__button}
        ON_click={() => {
          postStar(courseID, rating);
        }}
      >
        Оценить
      </div>
    </div>
  );
};

export default Stars;
