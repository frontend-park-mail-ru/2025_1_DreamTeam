import { RatingList } from "@/types/rating";
import styles from "./Rating.module.scss";

const Rating = ({ rating }: { rating: RatingList }) => {
  if (!rating || rating.length === 0) {
    return <div class={styles.ratingEmpty}>Рейтинг пока отсутствует</div>;
  }
  const numberRatings: number[] = [];
  let currentPlace = 1;
  let prevRating = rating[0].rating;
  for (let i = 0; i < rating.length; i++) {
    if (i === 0) {
      numberRatings.push(currentPlace);
    } else if (rating[i].rating !== prevRating) {
      currentPlace += 1;
      numberRatings.push(currentPlace);
      prevRating = rating[i].rating;
    } else {
      numberRatings.push(currentPlace);
    }
  }
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
