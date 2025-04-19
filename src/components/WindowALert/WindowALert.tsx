import closeCourse from "Public/static/icons/closeCourse.svg";
import error from "Public/static/icons/error.svg";
import "./WindowALert.css";
import { ToastType } from "@/types/notifications";

const WindowALert = ({
  type,
  message,
  onClose,
}: {
  type: ToastType;
  message: string;
  onClose: () => void;
}) => {
  console.log(type);
  return (
    <div class={`alert-admit__window active ${type}-window`}>
      <div style={"display: flex; align-items: center; gap: 8px; "}>
        <div class="alert-admit__image">
          <img src={error} alt="закрыть" />
        </div>
        <div class="alert-admit__text">{message}</div>
      </div>
      <div class="alert-admit__button">
        <button class="alert-admit__button-admit" ON_click={onClose}>
          <img src={closeCourse} alt="закрыть" />
        </button>
      </div>
    </div>
  );
};

export default WindowALert;
