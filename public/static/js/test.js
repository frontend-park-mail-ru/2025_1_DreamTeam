import { templates } from "./templates.js";
import { fetch_logout } from "./api.js";
import { register_user, login_user } from "./auth.js";

const ip = "http://217.16.21.64";
const port = "8080";

// Если есть параметр, то вызов на ручку бека не происходит(для отладки)
async function cards(data) {
    let courseData;

    if (data) {
        courseData = data;
    }
    else {
        courseData = await fetch_data();
    }

    const element = document.createElement("div");
    element.classList.add("cards");

    if (!courseData) {
        element.innerHTML = `
            <div class="dont-content">
                Нету курсов
            </div>
        `;

        return element;
    }

    courseData.forEach(course => {
        const course_card = card(course.time_to_pass, course.purchases_amount, course.title, course.price);
        element.appendChild(course_card);
    });
    return element;
};

async function check_auth() {
    try {
      const response = await fetch(`${ip}:${port}/api/isAuthorized`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && !data.error) {
        console.log("✅ Пользователь авторизован");
        return data.user.name;
      } else {
        console.log("❌ Пользователь НЕ авторизован");
        return false;
      }
    } catch (error) {
      console.error("Ошибка проверки авторизации:", error);
      return false;
    }
  }

  async function fetch_data() {
    try {
      const response = await fetch(`${ip}:${port}/api/getCourses`);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      const data = await response.json();
      console.log("Данные:", data);
      return data.bucket_courses || [];
    } catch (error) {
      console.error("Ошибка запроса:", error);
      return [];
    }
  }

  async function fetch_logout() {
    try {
        const response = await fetch(`${ip}:${port}/api/logout`, {
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error(`Ошибка выхода: ${response.status}`);
      }

      console.log("✅ Успешный выход");
      return true;
    } catch (error) {
      console.error("Ошибка запроса:", error);
      return [];
    }
  }

function card(time_to_pass, purchases_amount, title, price) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.innerHTML = `
        <div class="picture" style="background-image: url(./static/icons/picture-test.png);">
            <div class="descriptions">
                <div class="description">
                    <img src="./static/icons/time.svg" alt="" class="description__icon">
                    ${time_to_pass} ч
                </div>
                <div class="heart">
                    <img src="./static/icons/heart.svg" alt="" class="heart__img">
                </div>
            </div>
            <div class="descriptions">
                <div class="description">
                    <img src="./static/icons/user.svg" alt="" class="description__icon">
                    ${purchases_amount}
                </div>
            </div>
        </div>
        <div class="name">
            ${title}
        </div>
        <div class="rating-and-price">
            <div class="rating">
                <img src="./static/icons/star.svg" alt="" class="rating__star full">
                <img src="./static/icons/star.svg" alt="" class="rating__star full">
                <img src="./static/icons/star.svg" alt="" class="rating__star full">
                <img src="./static/icons/star.svg" alt="" class="rating__star full">
                <img src="./static/icons/star.svg" alt="" class="rating__star">
            </div>
            <div class="rating-and-price__price">
                ${price} ₽
            </div>
        </div>
    `;

    return element;
}

async function header(check = false) {
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
        element.appendChild(menu(false));

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

function line() {
    const element = document.createElement("div");
    element.classList.add("line");

    return element;
}

function filter_main() {
    const element = document.createElement("div");
    element.classList.add("filters");
    element.innerHTML = `
        <div class="headlines">Каталог</div>
        <div class="filter-select">
            <div class="filter--type--selector">
                Какое направление?
                <img src="./static/icons/arrow-down.svg" alt="" class="filter__icon">
            </div>
            <div class="filter--type--selector">
                Что изучать?
                <img src="./static/icons/arrow-down.svg" alt="" class="filter__icon">
            </div>
            <div class="filter--type--selector">
                Какая цель?
                <img src="./static/icons/arrow-down.svg" alt="" class="filter__icon">
            </div>
            <div class="filter--type--button">
                <img src="./static/icons/filter.svg" alt="" class="filter__icon">
                Фильтры
            </div>
        </div>
    `;

    return element;
}

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

function confirm() {
    const confirm = document.getElementById("log-in");
    const cancel = document.getElementById("sign-up");

    set_event_click(confirm, logout);
    set_event_click(cancel, close_window);
}

async function logout() {
    await fetch_logout();
    rerender_header();
    close_window();
}

function open_window_logout() {
    const zone = document.getElementById("blur");

    zone.appendChild(create_window_confirm());

    // Накладываем обработчик для закрытия окна при нажатии на фон
    set_event_click(zone, handler_close_window);

    // После того как создалось окно убираем обработку закрытия окна при клике на фон(всплытие)
    const window = document.getElementById("window");
    blocking_click(window);
}

function handler_button_window() {
    const login = document.getElementById("log-in");
    const signup = document.getElementById("sign-up");

    set_event_click(login, handler_button_window_login);
    set_event_click(signup, handler_button_window_signup);
    if (login.classList.contains("active")) {
        authorized();
    }
    else {
        login.classList.add("active");
        signup.classList.remove("active");
    }
}

function handler_button_window_login() {
    const login = document.getElementById("log-in");
    const signup = document.getElementById("sign-up");
    const email = document.getElementById("email").value;

    if (login.classList.contains("active")) {
        authorized();
    } else {
        switch_active(login, signup, "active");
        hidden_input();
        view_error_clear("error_color_red", "error__input", "error__input", "error__input", "error__input");
        text_error_input("", email, "", "", "");
    }
}

function handler_button_window_signup() {
    const login = document.getElementById("log-in");
    const signup = document.getElementById("sign-up");
    const email = document.getElementById("email").value;

    if (signup.classList.contains("active")) {
        registration();
    } else {
        switch_active(signup, login, "active");
        show_input();
        view_error_clear("error_color_red", "error__input", "error__input", "error__input", "error__input");
        text_error_input("", email, "", "", "");
    }
}

function hidden_input() {
    const name = document.getElementById("name");
    const password_admit = document.getElementById("password_admit");

    name.classList.add("hidden");
    password_admit.classList.add("hidden");
}

function show_input() {
    const name = document.getElementById("name");
    const password_admit = document.getElementById("password_admit");

    name.classList.remove("hidden");
    password_admit.classList.remove("hidden");
}

function switch_active(element1, element2, style) {
    element1.classList.add(style);
    element2.classList.remove(style);
}

async function authorized() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const result = await login_user(email, password);

    if (result === true) {
        rerender_header();
        close_window();
    } else {
        view_error("error_color_red", "error__input", "error__input", "error__input", "error__input");
        text_error_input(result, email, name, password, password_admit);
    }
}

async function registration() {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const password_admit = document.getElementById("password_admit").value;

    const result = check_input(email, name, password, password_admit);

    if (result === true) {
        if (await register_user(email, name, password)) {
            rerender_header();
            close_window();
        } else {
            view_error("error_color_red", "error__input", "error__input", "error__input", "error__input");
            text_error_input(result, email, name, password, password_admit);
        }
    }
}

export async function login_user(email, password) {
    try {
        const response = await fetch(`${ip}:${port}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            return true;
        } else {
            return data.error;
        }
    } catch (err) {
        console.error("Ошибка сети:", err);
        return "Ошибка сети:";
    }
}

export async function register_user(email, name, password) {
    try {
        const response = await fetch(`${ip}:${port}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, name, password }),
    });

        const data = await response.json();
        if (response.ok) {
            return true;
        } else {
            return data.error;
        }
    } catch (err) {
        console.error("Ошибка сети:", err);
        return "Ошибка сети:";
    }
}

function validate_email(email) {
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return email_pattern.test(email);
}

function validate_name(name) {
    const name_pattern = /[^a-zA-Z0-9_-]/;

    return name_pattern.test(name);
}

function check_input(email, name, password, password_admit) {
    view_error_clear("error_color_red", "error__input", "error__input", "error__input", "error__input");
    text_error_input("", email, name, password, password_admit)
    if (!validate_email(email)) {
        view_error("error_color_red", "error__input", null, null, null);
        text_error_input("Некорректный e-mail", email, name, password, password_admit);
        return false
    }

    if (name.length < 2 || name.length > 16) {
        view_error("error_color_red", null, "error__input", null, null);
        text_error_input("Псевдоним должен содержать от 2 до 16 символов", email, name, password, password_admit);
        return false
    }

    if (validate_name(name)) {
        view_error("error_color_red", null, "error__input", null, null);
        text_error_input("Псевдоним содержит недопустимые символы", email, name, password, password_admit);
        return false
    }

    if (password.length < 8 || password.length > 32) {
        view_error("error_color_red", null, null, "error__input", "error__input");
        text_error_input("Пароль должен содержать от 8 до 32 символов", email, name, password, password_admit);
        return false;
    }

    if (password !== password_admit) {
        view_error("error_color_red", null, null, "error__input", "error__input");
        text_error_input("Пароли не совпадают", email, name, password, password_admit);
        return false;
    }

    return true;
}

function view_error(error_input, email_input, name_input, password_input, password_admit_input) {
    document.getElementById("error").classList.add(error_input);
    document.getElementById("email").classList.add(email_input);
    document.getElementById("name").classList.add(name_input);
    document.getElementById("password").classList.add(password_input);
    document.getElementById("password_admit").classList.add(password_admit_input);
}

function view_error_clear(error_input, email_input, name_input, password_input, password_admit_input) {
    document.getElementById("error").classList.remove(error_input);
    document.getElementById("email").classList.remove(email_input);
    document.getElementById("name").classList.remove(name_input);
    document.getElementById("password").classList.remove(password_input);
    document.getElementById("password_admit").classList.remove(password_admit_input);
}

function text_error_input(error_input, email_input, name_input, password_input, password_admit_input) {
    document.getElementById("error").innerText = error_input;
    document.getElementById("email").value = email_input;
    document.getElementById("name").value = name_input;
    document.getElementById("password").value = password_input;
    document.getElementById("password_admit").value = password_admit_input;
}

function handler_button_menu() {
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

function handler_button_avatar() {
    open_menu();
}

function handler_button_logout() {
    console.log("logout");
    open_window_logout();
    confirm();
}

function handler_button_close_menu() {
    close_menu();
}

function handler_button_profile() {
    console.log("profile");
}

function handler_button_setting() {
    console.log("setting");
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
//
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
//
    return element;
}

function set_event_click(button, callback) {
    button.addEventListener("click", callback);
}

function handler_button_open_window() {
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

function close_window() {
    document.getElementById("blur").innerHTML = "";
}

function blocking_click(element) {
    set_event_click(element, stop_propagation);
}

// Вызывается в blocking_click
function stop_propagation(event) {
    event.stopPropagation();
}

function handler_close_window() {
    close_window();
}

async function rerender_header() {
    const headers = document.getElementById("header");
    headers.innerHTML = (await header()).innerHTML;
    handler_button_menu();
}

export async function rerender2() {
    const main_header = document.getElementById("head");
    const content = document.getElementById("app");

    // const header_element = await header("tiger"); // Для отладки
    const header_element = await header(false);
    const line_element = line();
    const filter_element = filter_main();
    const cards_element = await cards();

    app.innerHTML = '';

    main_header.appendChild(header_element);
    main_header.appendChild(line_element);
    main_header.appendChild(filter_element);
    content.appendChild(cards_element);

    // Функция для накладывания логики на кнопки с меню
    handler_button_menu();
}
