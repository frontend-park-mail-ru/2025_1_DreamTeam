import closeCourse from "Public/static/icons/closeCourse.svg";
import error from "Public/static/icons/error.svg";
import "./WindowALert.css";
import { ToastType } from "@/types/notifications";
import { useState } from "@/ourReact/jsx-runtime";

const WindowALert = ({
  type,
  message,
  onClose,
  disappear,
}: {
  type: ToastType;
  message: string;
  onClose: () => void;
  disappear: boolean;
}) => {
  const [isAppend, setIsAppend] = useState(true);
  if (isAppend === true) {
    setTimeout(() => {
      setIsAppend(false);
    }, 300);
  }
  return (
    <div
      class={`alert-admit__window ${type}-window ${
        disappear ? "disappear-alert" : ""
      } ${isAppend ? "append-alert" : ""}`}
    >
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
