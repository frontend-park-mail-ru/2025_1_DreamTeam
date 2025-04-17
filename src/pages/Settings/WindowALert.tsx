
import cancelWindow from "./logic/p";
import closeCourse from "Public/static/icons/closeCourse.svg";
import error from "Public/static/icons/error.svg";


const WindowALert = (type: string) => {
    return (
    <div class="alert_admit" ON_mousedown={cancelWindow}>
    <div class="alert_admit--window">
        <div class="alert_admit--image">
            <img src={error} alt="закрыть" />
        </div>
        <div class="alert_admit--text">
            Ваш запрос успешно выполнен
        </div>
        <div class="alert_admit--button">
            <button class="alert_admit--button_admit"><img src={closeCourse} alt="закрыть" /></button>
        </div>
    </div>
    </div>
    )
  }

export default WindowALert;