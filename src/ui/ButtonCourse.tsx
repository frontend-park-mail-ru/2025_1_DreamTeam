import videoIcon from "Public/static/icons/stepVideo.svg";

const ButtonCourse = ({
  is_done,
  type,
  onClick,
  current_lesson_id,
  lesson_id,
}: {
  is_done: string;
  type: string;
  onClick: Function;
  current_lesson_id: number;
  lesson_id: number;
}) => {
  const isCurrent = current_lesson_id === lesson_id;
  return (
    <button
      class={`page--lesson--choose ${is_done === "true" ? "" : "none"} ${
        isCurrent ? "current-lessons" : ""
      }`}
      ON_click={onClick}
    >
      {type === "video" ? (
        <img src={videoIcon} alt="" class="video__icon" />
      ) : (
        ""
      )}
    </button>
  );
}

export default ButtonCourse;
