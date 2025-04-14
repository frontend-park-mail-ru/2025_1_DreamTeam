import { setCourseOpen, setLessonID, useCourseOpen } from "@/App";
import starIcon from "Public/static/icons/star.svg";
import timeIcon from "Public/static/icons/time.svg";
import userIcon from "Public/static/icons/user.svg";
import addCourseIcon from "Public/static/icons/addCourse.svg";
import descIcon from "Public/static/icons/descriptionCourse.svg";
import contentIcon from "Public/static/icons/contentCourse.svg";
import reviewIcon from "Public/static/icons/reviewsCourse.svg";
import closeIcon from "Public/static/icons/closeCourse.svg";
import { router } from "@/router";

export default function CourseMenuHeader({
  useFunc,
  setFunc,
}: {
  useFunc: string;
  setFunc: (argv0: string) => void;
}) {
  const data = useCourseOpen();
  const sections = [
    {
      type: "description",
      name: "Описание",
      image: descIcon,
      click: () => {
        setFunc("description");
      },
    },
    {
      type: "content",
      name: "Содержание",
      image: contentIcon,
      click: () => {
        setFunc("content");
      },
    },
    {
      type: "review",
      name: "Отзывы",
      image: reviewIcon,
      click: () => {
        setFunc("review");
      },
    },
  ];
  return (
    <header class="course-header1">
      <div class="close-page"></div>
      <div class="header-content">
        <div class="header-info">
          <img class="course-image" src={`${data.src_image}`} alt="" />
          <div class="course-text">
            <div class="course-name">{data.title}</div>
            <div class="course-descriptions">
              <div class="course-description">
                <img class="course-description__img" src={starIcon} />
                <div class="course-description__text">
                  <div class="course-description__text-number">
                    {(data.rating ?? 0).toFixed(1)}
                  </div>{" "}
                  <div class="course-description__text-text">рейтинг</div>
                </div>
              </div>
              <div class="course-description">
                <img class="course-description__img" src={timeIcon} />
                <div class="course-description__text">
                  <div class="course-description__text-number">
                    {data.time_to_pass?.toString()}
                  </div>{" "}
                  <div class="course-description__text-text">часов</div>
                </div>
              </div>
              <div class="course-description">
                <img class="course-description__img" src={userIcon} />
                <div class="course-description__text">
                  <div class="course-description__text-number">
                    {data.purchases_amount?.toString()}
                  </div>{" "}
                  <div class="course-description__text-text">записались</div>
                </div>
              </div>
            </div>
            <div class="course-tags">
              {data.tags?.map((tag, index) => (
                <div key={index} class="course-tag">
                  {tag}
                </div>
              ))}
            </div>
            <div class="course-price-and-button">
              <div
                class={`course-price-and-button__price ${
                  data.price === 0 ? "color-free" : ""
                }`}
              >
                {data.price === 0 ? "Бесплатно" : `${data.price?.toString()} ₽`}
              </div>
              {!data.is_purchased ? (
                <div
                  class="course-price-and-button__button"
                  ON_click={() => {
                    console.log("Записаться");
                    const id = data.id;
                    if (id === undefined) {
                      console.error("Ошибка");
                      return;
                    }
                    setLessonID(false);
                    router.goToPath(`/course/${useCourseOpen().id}/lessons`);
                  }}
                >
                  <img class="button__icon" src={addCourseIcon} />
                  Записаться на курс
                </div>
              ) : (
                <div
                  class="course-price-and-button__button"
                  ON_click={() => {
                    console.log("Записаться");
                    const id = data.id;
                    if (id === undefined) {
                      console.error("Ошибка");
                      return;
                    }
                    setLessonID(false);
                    router.goToPath(`/course/${useCourseOpen().id}/lessons`);
                  }}
                >
                  Продолжить
                </div>
              )}
            </div>
          </div>
        </div>
        <div class="changes1">
          {sections.map((section) => (
            <div
              ON_click={section.click}
              class={
                "change" + (useFunc === section.type ? " change-active" : "")
              }
            >
              <img class="changes1__img" src={section.image} />
              {section.name}
            </div>
          ))}
        </div>
      </div>
      <div
        class="close-page"
        ON_click={() => {
          setCourseOpen({});
          router.goByState("MainMenu");
        }}
      >
        <img style={"cursor: pointer;"} src={closeIcon} />
      </div>
    </header>
  );
}
