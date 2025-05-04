import { Header } from "@/types/lesson";
import videoIcon from "Public/static/icons/stepVideo.svg";
import "../pages/Lesson/Lesson.scss"

const ButtonCourse = ({
  is_done,
  onClick,
  current_lesson_id,
  count_page,
  lesson_id,
  points
}: {
  is_done: string;
  onClick: Function;
  current_lesson_id: number;
  count_page: number;
  lesson_id: number;
  points: Header
}) => {
  const isCurrent = current_lesson_id === lesson_id;
  return (
    <div class="page__lesson">
      <button
        class={`page__lesson__choose ${is_done === "true" ? "" : "none"} ${
          isCurrent ? "current-lessons" : ""
        }`}
        ON_click={onClick}
      >
        {count_page.toString()}
      </button>
      {(count_page != points.Points.length && points.Points.length > 1) ? (<div class={`strip-page ${(is_done === "true" && points.Points[count_page].is_done === true) ? "is-done" : "none-done"}`} />) : (<div />)}
    </div>
      );
}

export default ButtonCourse;
