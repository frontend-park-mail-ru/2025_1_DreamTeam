import { useState } from "@/ourReact/jsx-runtime";
import CourseCreateStep from "../Step";

const CourseCreateLesson = () => {
  const [bucketTitle, setBucketTitle] = useState("");
  const [countLessons, setCountLessons] = useState<number>(1);
  const increment = () => {
    setCountLessons(countLessons < 20 ? countLessons + 1 : countLessons);
  };

  const decrement = () => {
    setCountLessons(countLessons > 1 ? countLessons - 1 : countLessons);
  };
  return (
    <div style="margin-left: 16px; border-left: 1px solid #eee; padding-left: 8px; margin-bottom: 16px;">
      <input
        type="text"
        placeholder="Название букета"
        value={bucketTitle}
        ON_input={(e: any) => setBucketTitle(e.target.value)}
        style="margin-bottom: 8px;"
      />
      <div>
        <button type="button" ON_click={decrement}>
          -
        </button>
        <span style="margin: 0 8px;">{countLessons.toString()}</span>
        <button type="button" ON_click={increment}>
          +
        </button>
      </div>
      {Array.from({ length: countLessons }).map((_, idx) => (
        <CourseCreateStep key={`Lesson${idx + 1}`} />
      ))}
    </div>
  );
};

export default CourseCreateLesson;
