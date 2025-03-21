import { view_error, view_error_clear, text_error_input } from "./view-window.js";

function validate_email(email) {
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return email_pattern.test(email);
}

function validate_name(name) {
    const name_pattern = /[^a-zA-Z0-9_-]/;

    return name_pattern.test(name);
}

export function check_input(email, name, password, password_admit) {
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