
import cancelWindow from "./logic/p";


const WindowALert = () => {
    return (
    <div class="alert_admit" ON_mousedown={cancelWindow}>
    <div class="alert_admit--window">
        <div class="alert_admit--header">
            <h1 class="alert_admit--title">Подтвердите ваши действия</h1>
        </div>
        <div class="alert_admit--text">
            Ваш запрос успешно выполнен
        </div>
        <div class="alert_admit--button">
            <button class="alert_admit--button_admit">Закрыть</button>
            <button class="alert_admit--button_admit">Сохранить</button>
        </div>
    </div>
    </div>
    )
  }

export default WindowALert;