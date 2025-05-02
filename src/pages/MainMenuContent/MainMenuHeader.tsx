import arrowDown from "Public/static/icons/arrow-down.svg";
import filter from "Public/static/icons/filter.svg";
import "./MainMenuContent.scss";

const MainMenuHeader = () => {
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
        {arrayFilter.map((button) => (
          <div class="filter--type--selector" ON_click={button.onClick}>
            <div class="text">{button.name}</div>
            <img src={button.image} alt="" class="filter__icon"></img>
          </div>
        ))}
        <div class="filter--type--button">
          <img src={filter} alt="" class="filter__icon"></img>
          <div class="text">Фильтры</div>
        </div>
      </div>
    </div>
  );
};

export default MainMenuHeader;
