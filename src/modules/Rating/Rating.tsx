import { RatingList } from "@/types/rating";
import styles from "./Rating.module.scss";

const Rating = ({ rating }: { rating: RatingList }) => {
  const numberRatings = Array.from({ length: rating.length }, (_, i) => i + 1);
  const countRatings = rating.map((item) => item.rating);
  const nameRatings = rating.map((item) => item.user);

  return (
    <div class={styles.rating}>
      <div class={styles.numberRatings}>
        {numberRatings.map((number) => (
          <div class={styles.numberRating}>{number.toString()}</div>
        ))}
      </div>
      <div class={styles.countRatings}>
        {countRatings.map((count) => (
          <div class={styles.countRating}>{count.toString()}</div>
        ))}
      </div>
      <div class={styles.nameRatings}>
        {nameRatings.map((user) => (
          <div class={styles.nameRating}>
            <img class={styles.ratingImg} src={user.avatar_src} alt="" />
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
