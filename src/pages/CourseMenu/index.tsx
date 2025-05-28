import CourseMenuHeader from "./CourseMenuHeader";
import {
  CourseMenuContent,
  CourseMenuDescription,
  CourseMenuEnd,
  CourseMenuRating,
} from "./CourseMenuContent";
import styles from "./CourseMenu.module.scss";
import { activeTab, setActiveTab } from "@/stores";

const CourseMenu = () => {
  // TODO: Добавить новую логику отрисовки информации через запрос
  const tab = activeTab();

  return (
    <div>
      <CourseMenuHeader key="CourseHeader" useFunc={tab} />
      {tab === "description" ? (
        <CourseMenuDescription key="CourseDescription" />
      ) : tab === "content" ? (
        <CourseMenuContent key="CourseContent" />
      ) : tab === "rating" ? (
        <CourseMenuRating key="CourseMenuReview" />
      ) : tab === "review" ? (
        ""
      ) : tab === "end" ? (
        <CourseMenuEnd key="CourseMenuEnd" />
      ) : (
        <div class={styles.content}>Ошибка: ID не найден</div>
      )}
    </div>
  );
};

export default CourseMenu;
