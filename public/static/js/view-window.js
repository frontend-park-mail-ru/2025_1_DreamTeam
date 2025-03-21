import { set_event_click, blocking_click } from "./handler.js";
import { handler_button_window } from "./auth.js";


function create_window_login() {
    const element = document.createElement("div");
    element.classList.add("blur");
    element.innerHTML = `
        <div id="window" class="window">
            <div id="form-login" class="form">
                <div class="logo">SkillForce</div>
                <div class="error" id="error"></div>
                <input type="email" id="email" placeholder="Почта" class="form__input">
                <input type="text" id="name" placeholder="Псевдоним" class="form__input hidden">
                <input type="password" id="password" placeholder="Пароль" class="form__input">
                <input type="password" id="password_admit" placeholder="Подтвердить пароль" class="form__input hidden">
            </div>
            <div class="buttons">
                <button class="buttons__button active" id="sign-up">Регистрация</button>
                <button class="buttons__button" id="log-in">Вход</button>
            </div>
        </div>
    `;

    return element;
}

function create_window_confirm() {
    const element = document.createElement("div");
    element.classList.add("blur");
    element.innerHTML = `
        <div id="window" class="window">
            <div id="form-login" class="form">
                <div class="logo">SkillForce</div>
                <div class="confirm-text">Подтверждаете действие?</div>
            </div>
            <div class="buttons">
                <button class="buttons__button" id="sign-up">Отмена</button>
                <button class="buttons__button active" id="log-in">Подтвердить</button>
            </div>
        </div>
    `;

    return element;
}

export function open_window_logout() {
    const zone = document.getElementById("blur");

    zone.appendChild(create_window_confirm());

    // Накладываем обработчик для закрытия окна при нажатии на фон
    set_event_click(zone, handler_close_window);

    // После того как создалось окно убираем обработку закрытия окна при клике на фон(всплытие)
    const window = document.getElementById("window");
    blocking_click(window);
}

export function hidden_input() {
    const name = document.getElementById("name");
    const password_admit = document.getElementById("password_admit");

    name.classList.add("hidden");
    password_admit.classList.add("hidden");
}

export function show_input() {
    const name = document.getElementById("name");
    const password_admit = document.getElementById("password_admit");

    name.classList.remove("hidden");
    password_admit.classList.remove("hidden");
}

export function switch_active(element1, element2, style) {
    element1.classList.add(style);
    element2.classList.remove(style);
}

export function view_error(error_input, email_input, name_input, password_input, password_admit_input) {
    document.getElementById("error").classList.add(error_input);
    document.getElementById("email").classList.add(email_input);
    document.getElementById("name").classList.add(name_input);
    document.getElementById("password").classList.add(password_input);
    document.getElementById("password_admit").classList.add(password_admit_input);
}

export function view_error_clear(error_input, email_input, name_input, password_input, password_admit_input) {
    document.getElementById("error").classList.remove(error_input);
    document.getElementById("email").classList.remove(email_input);
    document.getElementById("name").classList.remove(name_input);
    document.getElementById("password").classList.remove(password_input);
    document.getElementById("password_admit").classList.remove(password_admit_input);
}

export function text_error_input(error_input, email_input, name_input, password_input, password_admit_input) {
    document.getElementById("error").innerText = error_input;
    document.getElementById("email").value = email_input;
    document.getElementById("name").value = name_input;
    document.getElementById("password").value = password_input;
    document.getElementById("password_admit").value = password_admit_input;
}

export function close_window() {
    document.getElementById("blur").innerHTML = "";
}

export function handler_button_open_window() {
    const zone = document.getElementById("blur");

    zone.appendChild(create_window_login());

    // Накладываем обработчик для закрытия окна при нажатии на фон
    set_event_click(zone, handler_close_window);

    // После того как создалось окно убираем обработку закрытия окна при клике на фон(всплытие)
    const window = document.getElementById("window");
    blocking_click(window);
    console.log("login");
    handler_button_window();
}

export function handler_close_window() {
    close_window();
}