import CourseMenuHeader from "./CourseMenuHeader";
import {
  CourseMenuContent,
  CourseMenuDescription,
  CourseMenuEnd,
  CourseMenuRating,
} from "./CourseMenuContent";
import { useState } from "@/ourReact/jsx-runtime";
import styles from "./CourseMenu.module.scss";

const CourseMenu = () => {
  // TODO: Добавить новую логику отрисовки информации через запрос
  const [useStatus, setStatus] = useState("description");

  return (
    <div>
      <CourseMenuHeader
        key="CourseHeader"
        useFunc={useStatus}
        setFunc={setStatus}
      />
      {useStatus === "description" ? (
        <CourseMenuDescription key="CourseDescription" />
      ) : useStatus === "content" ? (
        <CourseMenuContent key="CourseContent" />
      ) : useStatus === "rating" ? (
        <CourseMenuRating key="CourseMenuReview" />
      ) : useStatus === "review" ? (
        ""
      ) : useStatus === "end" ? (
        <CourseMenuEnd key="CourseMenuEnd" />
      ) : (
        <div class={styles.content}>Ошибка: ID не найден</div>
      )}
    </div>
  );
};

export default CourseMenu;
