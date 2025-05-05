import arrowDown from "Public/static/icons/arrow-down.svg";
import filter from "Public/static/icons/filter.svg";
import styles from "./MainMenuContent.module.scss";

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
    <div class={styles.filters}>
      <div class={styles.headlines}>Каталог</div>
      <div class={styles.filterSelect}>
        {arrayFilter.map((button) => (
          <div class={styles.filter__type__selector} ON_click={button.onClick}>
            <div class={styles.text}>{button.name}</div>
            <img src={button.image} alt="" class={styles.filter__icon}></img>
          </div>
        ))}
        <div class={styles.filter__type__button}>
          <img src={filter} alt="" class={styles.filter__icon}></img>
          <div class={styles.text}>Фильтры</div>
        </div>
      </div>
    </div>
  );
};

export default MainMenuHeader;
