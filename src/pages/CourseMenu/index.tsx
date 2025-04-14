import CourseMenuHeader from "./CourseMenuHeader";
import { CourseMenuContent, CourseMenuDescription } from "./CourseMenuContent";
import { useState } from "@/ourReact/jsx-runtime";

export default function CourseMenu() {
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
      ) : (
        ""
      )}
    </div>
  );
}
