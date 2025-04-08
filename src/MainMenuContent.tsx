import arrowDown from "../public/static/icons/arrow-down.svg";
import filter from "../public/static/icons/filter.svg";
import { Card } from "./Card";
import { Course, getCourses } from "./api";
import { useState } from "./ourReact/jsx-runtime";

export function MainMenuContent() {
  const [cards, setCards] = useState<Course[]>([]);
  const [isLoading, setLoading] = useState(true);
  if (isLoading) {
    getCourses().then((data) => {
      setCards(data);
      setLoading(false);
    });
  }
  console.log("render MainMenuContent");
  if (isLoading) {
    // TODO: Потом добавлю вывод более подробный
    return <div class="content">
      Курсы отсутствуют, либо произошла ошибка запросов
    </div>
  }

  return (
    <div class="content">
      <div class="cards">
        {cards.map((card) => (
          <Card
            key={`card-${card.id}`}
            title={card.title}
            image={card.src_image}
            price={card.price}
            description={card.description}
            id={card.id}
            rating={card.rating}
            tags={card.tags}
            purchases_amount={card.purchases_amount}
            time_to_pass={card.time_to_pass}
          />
        ))}
      </div>
    </div>
  );
}

export function MainMenuHeader() {
  const arrayFilter = [
    {
      name: "Какое направление?",
      image: arrowDown,
      onClick: () => {
        console.log("filter1");
      },
    },
    {
      name: "Что изучать?",
      image: arrowDown,
      onClick: () => {
        console.log("filter2");
      },
    },
    {
      name: "Какая цель?",
      image: arrowDown,
      onClick: () => {
        console.log("filter3");
      },
    },
  ];

  return (
    <div class="filters">
      <div class="headlines">Каталог</div>
      <div class="filter-select">
        {arrayFilter.map((button, index) => (
          <ButtonFilter
            key={`button-${index}`}
            name={button.name}
            image={button.image}
            onClick={button.onClick}
          />
        ))}
        <div class="filter--type--button">
          <img src={filter} alt="" class="filter__icon"></img>
          Фильтры
        </div>
      </div>
    </div>
  );
}

function ButtonFilter({
  name,
  image,
  onClick,
}: {
  name: string;
  image: string;
  onClick: Function;
}) {
  return (
    <div class="filter--type--selector" ON_click={onClick}>
      {name}
      <img src={image} alt="" class="filter__icon"></img>
    </div>
  );
}
