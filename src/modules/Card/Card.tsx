import "./Card.css";
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
      class="card"
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
      <div class="picture" style={`background-image: url(${image})`}>
        <div class="descriptions">
          <div class="description">
            <img src={timeIcon} alt="" class="description__icon"></img>
            {time_to_pass.toString()} ч
          </div>
          <div class="heart">
            <img src={heartIcon} alt="" class="heart__img heart_default"></img>
            <img
              src={heartHoverIcon}
              alt=""
              class="heart__img heart_hover"
            ></img>
            <img src={heartFillIcon} alt="" class="heart__img heart_fill"></img>
            <img
              src={heartFillHoverIcon}
              alt=""
              class="heart__img heart_fill-hover"
            ></img>
          </div>
        </div>
        <div class="descriptions">
          <div class="description">
            <img src={userIcon} alt="" class="description__icon"></img>
            {purchases_amount.toString()}
          </div>
        </div>
      </div>
      <div class="name">{title}</div>
      <div class="rating-and-price">
        <div class="rating">
          <img
            src={
              rating >= 1
                ? starIcon
                : rating >= 0.5
                ? starHalfIcon
                : starEmptyIcon
            }
            alt=""
            class="rating__star"
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
            class="rating__star"
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
            class="rating__star"
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
            class="rating__star"
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
            class="rating__star"
          ></img>
        </div>
        <div
          class={`rating-and-price__price ${price === 0 ? "color-free" : ""}`}
        >
          {price !== 0 ? `${price.toString()} ₽` : "Бесплатно"}
        </div>
      </div>
    </div>
  );
}
