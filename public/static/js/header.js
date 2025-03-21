import { check_auth } from "./api.js";
import { set_event_click } from "./handler.js";
import { handler_button_open_window, open_window_logout } from "./view-window.js";
import { confirm } from "./auth.js";

export async function header(check = false) {
    const element = document.createElement("header");
    element.classList.add("header");
    element.id = "header";

    element.appendChild(logo());
    element.appendChild(search());

    // пока ждём проверку на вход, отображаем состояние без входа
    // Если есть параметр, то для отладки render пользователя
    let username;

    if (check !== false) {
        username = check;
    }
    else {;
        // element.appendChild(menu(false));

        username = await check_auth();
    }

    element.appendChild(menu(username));

    // Функция для накладывания логики на кнопки с меню
    handler_button_menu();

    return element
}

function logo() {
    const element = document.createElement("div");
    element.classList.add("logo-and-create-curs");
    element.innerHTML = `
        <div class="logo">
            <img src="./static/icons/logo.svg" alt="" class="logo__img">
            <div class="logo__text">SkillForce</div>
        </div>
        <div class="logo-and-create-curs__create-curs">Создать курс</div>
    `;

    return element
}

function search() {
    const element = document.createElement("div");
    element.classList.add("search-form");
    element.innerHTML =`
        <img class="search-form__icon" src="./static/icons/iconSearch.svg">
        <input id="text" type="text" placeholder="Поиск" class="search-form__input">
    `;

    return element;
}

function menu(username = false) {
    const element = document.createElement("div");
    element.classList.add("block-menu");
    element.id = "block-menu";

    if (username) {
        element.innerHTML = `
            <div class="block-avatar" id="block-avatar">
                ${username}
                <div class="avatar" id="avatar">
                    <img src="./static/icons/menu.svg" alt="Меню" class="avatar__icon">
                    <img src="./static/icons/avatar.png" alt="Аватарка" class="avatar__img">
                </div>
            </div>
        `;

        element.appendChild(create_menu());
    }
    else {
        element.innerHTML = `
        <div class="button_type_menu" id="button-login">
            Войти
            <img src="./static/icons/login.svg" alt="Войти" class="button__img">
        </div>
    `;
    }

    return element;
}

export async function rerender_header() {
    const headers = document.getElementById("header");
    headers.innerHTML = (await header()).innerHTML;
    handler_button_menu();
}

function open_menu() {
    const avatar = document.getElementById("block-avatar");
    const menu = document.getElementById("menu")
    avatar.classList.add("hidden");
    menu.classList.remove("hidden");
}

function close_menu() {
    const avatar = document.getElementById("block-avatar");
    const menu = document.getElementById("menu")
    avatar.classList.remove("hidden");
    menu.classList.add("hidden");
}

function create_menu() {
    const element = document.createElement("div");
    element.classList.add("button-menu");
    element.classList.add("hidden");
    element.id = "menu";
    element.innerHTML = `
        <div class="button_type_menu" id="button-close-menu">
            <div class="button__text">Свернуть</div>
            <img src="./static/icons/close-menu.svg" alt="Войти" class="button__img">
        </div>
        <div class="button_type_menu" id="button-profile">
            <div class="button__text">Профиль</div>
            <img src="./static/icons/profile.svg" alt="Войти" class="button__img">
        </div>
        <div class="button_type_menu" id="button-setting">
            <div class="button__text">Настройки</div>
            <img src="./static/icons/setting.svg" alt="Войти" class="button__img">
        </div>
        <div class="button_type_menu" id="button-logout">
            <div class="button__text">Выход</div>
            <img src="./static/icons/logout.svg" alt="Войти" class="button__img">
        </div>
    `;

    return element;
}

export function line() {
    const element = document.createElement("div");
    element.classList.add("line");

    return element;
}

export function handler_button_menu() {
    const login = document.getElementById("button-login");
    const avatar = document.getElementById("avatar");
    const close_menu = document.getElementById("button-close-menu");
    const profile = document.getElementById("button-profile");
    const setting = document.getElementById("button-setting");
    const logout = document.getElementById("button-logout");

    if(login) {
        set_event_click(login, handler_button_open_window);
    }

    if (avatar) {
        set_event_click(avatar, handler_button_avatar);
    }

    if (close_menu) {
        set_event_click(close_menu, handler_button_close_menu);
    }

    if (profile) {
        set_event_click(profile, handler_button_profile);
    }

    if (setting) {
        set_event_click(setting, handler_button_setting);
    }

    if (logout) {
        set_event_click(logout, handler_button_logout);
    }
}

export function handler_button_avatar() {
    open_menu();
}

export function handler_button_logout() {
    console.log("logout");
    open_window_logout();
    confirm();
}

export function handler_button_close_menu() {
    close_menu();
}

export function handler_button_profile() {
    console.log("profile");
}

export function handler_button_setting() {
    console.log("setting");
}