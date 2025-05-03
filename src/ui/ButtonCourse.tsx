import videoIcon from "Public/static/icons/stepVideo.svg";

const ButtonCourse = ({
  is_done,
  onClick,
  current_lesson_id,
  count_page,
  lesson_id,
}: {
  is_done: string;
  onClick: Function;
  current_lesson_id: number;
  count_page: number;
  lesson_id: number;
}) => {
  const isCurrent = current_lesson_id === lesson_id;
  return (
      <button
        class={`page__lesson__choose ${is_done === "true" ? "" : "none"} ${
          isCurrent ? "current-lessons" : ""
        }`}
        ON_click={onClick}
      >
        {count_page.toString()}
      </button>
  );
}

export default ButtonCourse;
