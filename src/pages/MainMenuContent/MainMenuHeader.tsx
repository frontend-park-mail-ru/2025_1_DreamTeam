import arrowDown from "Public/static/icons/arrow-down.svg";
import filter from "Public/static/icons/filter.svg";
import ButtonFilter from "@/ui/ButtonFilter";

export default function MainMenuHeader() {
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
