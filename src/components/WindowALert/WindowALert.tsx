
import { closeModal } from "@/types/message";
import closeCourse from "Public/static/icons/closeCourse.svg";
import error from "Public/static/icons/error.svg";
import "./WindowALert.css";



const WindowALert = ({ type, message, isOpen }: { type: "green" | "red" | "blue", message: string, isOpen: boolean }) => {
    console.log(type)
    if (isOpen) {
        return (
            <div class="alert-admit">
                <div class={`alert-admit__window active ${type}-window`}>
                    <div class="alert-admit__image">
                        <img src={error} alt="закрыть" />
                    </div>
                    <div class="alert-admit__text">
                        {message}
                    </div>
                    <div class="alert-admit__button">
                        <button class="alert-admit__button-admit" ON_mousedown={closeModal}><img src={closeCourse} alt="закрыть" /></button>
                    </div>
                </div>
            </div>
        )
    }
    return <div></div>;
}

export default WindowALert;