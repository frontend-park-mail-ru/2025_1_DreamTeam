import arrowDown from "../public/static/icons/arrow-down.svg";
import filter from "../public/static/icons/filter.svg";
import closeCourse from "../public/static/icons/closeCourse.svg"

export function CourseContent({ idCourse }: { idCourse: string }) {
  return (
    <div>
      <div>{idCourse}</div>
    </div>
  );
}

export function CourseContentHeader() {
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
    <div class="course-header">
      <div class="close-course"></div>
      <div>
        <div class=""> // Блок верхний
            <div class=""> // Блок с фотографией
                <img src=""></img>
            </div>
            <div class=""> // Блок с информацией
                <div></div> // Название
                <div class="de"></div>// Статистика(скорость прохождения, количество прошедших, рейтинг)
                <div class="course-tag"></div>// Теги
                <div></div>// Цена и кнопка записи
            </div>
        </div>
        <div class="section"> // Блок нижний
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
      <div class="close-course">
        <img src={closeCourse}></img>
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
