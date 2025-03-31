import arrowDown from "./icons/arrow-down.svg";
import filter from "./icons/filter.svg";
import { Card } from "./Card";

const myObject = {
  title: "My Title",
  price: "100",
  purchases_amount: "100",
  time_to_pass: "50",
};

export function MainMenuContent() {
  const cards = [myObject, myObject, myObject, myObject, myObject];
  return (
    <div class="cards">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          price={card.price}
          purchases_amount={card.purchases_amount}
          time_to_pass={card.time_to_pass}
        />
      ))}
    </div>
  );
}

// export async function MainMenuContent() {
//   // const cards = [myObject, myObject, myObject];
//   const cards: Course[] = await getCourses();
//   return (
//     <div class="cards">
//       {cards.map((card) => (
//         <Card
//           key={`card-${card.id}`}
//           title={card.title}
//           price={card.price.toString()}
//           purchases_amount={card.purchases_amount.toString()}
//           time_to_pass={card.time_to_pass.toString()}
//         />
//       ))}
//     </div>
//   );
// }

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
