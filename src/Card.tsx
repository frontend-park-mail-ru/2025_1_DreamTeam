import timeIcon from "./icons/time.svg";
import heartIcon from "./icons/heart.svg";
import userIcon from "./icons/user.svg";
import starIcon from "./icons/star.svg";
import testImage from "./icons/picture-test.png";

export function Card({
  title,
  price,
  purchases_amount,
  time_to_pass,
}: {
  title: string;
  price: string;
  purchases_amount: string;
  time_to_pass: string;
}) {
  return (
    <div class="card">
      <div class="picture" style={`background-image: url(${testImage})`}>
        <div class="descriptions">
          <div class="description">
            <img src={timeIcon} alt="" class="description__icon"></img>
            {time_to_pass} ч
          </div>
          <div class="heart">
            <img src={heartIcon} alt="" class="heart__img"></img>
          </div>
        </div>
        <div class="descriptions">
          <div class="description">
            <img src={userIcon} alt="" class="description__icon"></img>
            {purchases_amount}
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
        <div class="rating-and-price__price">{price} ₽</div>
      </div>
    </div>
  );
}
