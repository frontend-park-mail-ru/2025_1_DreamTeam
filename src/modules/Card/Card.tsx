import timeIcon from "Public/static/icons/time.svg";
import heartIcon from "Public/static/icons/heart.svg";
import userIcon from "Public/static/icons/user.svg";
import starIcon from "Public/static/icons/star.svg";
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
            <img src={heartIcon} alt="" class="heart__img"></img>
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
          <img src={starIcon} alt="" class="rating__star full"></img>
          <img src={starIcon} alt="" class="rating__star full"></img>
          <img src={starIcon} alt="" class="rating__star full"></img>
          <img src={starIcon} alt="" class="rating__star full"></img>
          <img src={starIcon} alt="" class="rating__star"></img>
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
