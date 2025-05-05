import styles from "./Card.module.scss";
import timeIcon from "Public/static/icons/time.svg";
import heartIcon from "Public/static/icons/heart.svg";
import heartHoverIcon from "Public/static/icons/heartHover.svg";
import heartFillIcon from "Public/static/icons/heartFill.svg";
import heartFillHoverIcon from "Public/static/icons/heartFillHover.svg";
import userIcon from "Public/static/icons/user.svg";
import starIcon from "Public/static/icons/star.svg";
import starHalfIcon from "Public/static/icons/starHalf.svg";
import starEmptyIcon from "Public/static/icons/starEmpty.svg";
import { setCourseOpen } from "@/App";
import { router } from "@/router";

export default function Card({
  title,
  price,
  image,
  description,
  id,
  rating,
  purchases_amount,
  time_to_pass,
  tags,
}: {
  title: string;
  price: number;
  image: string;
  description: string;
  id: number;
  rating: number;
  purchases_amount: number;
  time_to_pass: number;
  tags: string[];
}) {
  // TODO: Добавить новую логику открытия курса через запрос
  return (
    <div
      class={styles.card}
      ON_click={() => {
        setCourseOpen({
          description,
          id,
          price,
          purchases_amount,
          rating,
          src_image: image,
          tags,
          time_to_pass,
          title,
        });
        router.goToPath(`/course/${id}`);
      }}
    >
      <div class={styles.picture} style={`background-image: url(${image})`}>
        <div class={styles.descriptions}>
          <div class={styles.description}>
            <img src={timeIcon} alt="" class={styles.description__icon}></img>
            {time_to_pass.toString()} ч
          </div>
          <div class={styles.heart}>
            <img
              src={heartIcon}
              alt=""
              class={`${styles.heart__img} ${styles.heart_default}`}
            ></img>
            <img
              src={heartHoverIcon}
              alt=""
              class={`${styles.heart__img} ${styles.heart_hover}`}
            ></img>
            <img
              src={heartFillIcon}
              alt=""
              class={`${styles.heart__img} ${styles.heart_fill}`}
            ></img>
            <img
              src={heartFillHoverIcon}
              alt=""
              class={`${styles.heart__img} ${styles.heart_fillHover}`}
            ></img>
          </div>
        </div>
        <div class={styles.descriptions}>
          <div class={styles.description}>
            <img src={userIcon} alt="" class={styles.description__icon}></img>
            {purchases_amount.toString()}
          </div>
        </div>
      </div>
      <div class={styles.name}>{title}</div>
      <div class={styles.ratingAndPrice}>
        <div class={styles.rating}>
          <img
            src={
              rating >= 1
                ? starIcon
                : rating >= 0.5
                ? starHalfIcon
                : starEmptyIcon
            }
            alt=""
            class={styles.rating__star}
          ></img>
          <img
            src={
              rating >= 2
                ? starIcon
                : rating >= 1.5
                ? starHalfIcon
                : starEmptyIcon
            }
            alt=""
            class={styles.rating__star}
          ></img>
          <img
            src={
              rating >= 3
                ? starIcon
                : rating >= 2.5
                ? starHalfIcon
                : starEmptyIcon
            }
            alt=""
            class={styles.rating__star}
          ></img>
          <img
            src={
              rating >= 4
                ? starIcon
                : rating >= 3.5
                ? starHalfIcon
                : starEmptyIcon
            }
            alt=""
            class={styles.rating__star}
          ></img>
          <img
            src={
              rating >= 5
                ? starIcon
                : rating >= 4.5
                ? starHalfIcon
                : starEmptyIcon
            }
            alt=""
            class={styles.rating__star}
          ></img>
        </div>
        <div
          class={`${styles.ratingAndPrice__price} ${
            price === 0 ? styles.colorFree : ""
          }`}
        >
          {price !== 0 ? `${price.toString()} ₽` : "Бесплатно"}
        </div>
      </div>
    </div>
  );
}
