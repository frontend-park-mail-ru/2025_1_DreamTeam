import CourseMenuHeader from "./CourseMenuHeader";
import {
  CourseMenuContent,
  CourseMenuDescription,
  CourseMenuReview,
} from "./CourseMenuContent";
import { useState } from "@/ourReact/jsx-runtime";

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
      ) : useStatus === "review" ? (
        <CourseMenuReview key="CourseMenuReview" />
      ) : (
        <div>Ошибка: ID не найден</div>
      )}
    </div>
  );
};

export default CourseMenu;
