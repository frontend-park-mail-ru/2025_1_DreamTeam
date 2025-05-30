import { useState } from "@/ourReact/jsx-runtime";
import CourseCreateLesson from "../Lesson";
import { Part } from "../type";

const CourseCreateChapter = () => {
  const [countLessons, setCountLessons] = useState<number>(1);
  const [partTitle, setPartTitle] = useState("");

  const increment = () => {
    setCountLessons(countLessons < 20 ? countLessons + 1 : countLessons);
  };

  const decrement = () => {
    setCountLessons(countLessons > 1 ? countLessons - 1 : countLessons);
  };

  return (
    <div style="border: 1px solid #ccc; padding: 12px; margin-bottom: 24px;">
      <input
        type="text"
        placeholder="Название главы"
        value={partTitle}
        ON_input={(e: any) => setPartTitle(e.target.value)}
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
        <CourseCreateLesson key={`Subchapter${idx + 1}`} />
      ))}
    </div>
  );
};

export default CourseCreateChapter;
