import { viewError, viewErrorClear, textErrorInput } from './view-window.js';

export class Validate {
    constructor() {
        this.rules = [];
    }

    max(length) {
        this.rules.push({
            check: (value) => value.length <= length,
            message: (fieldName) => `${fieldName} должен содержать не более ${length} символов`,
        });
        return this;
    }

    min(length) {
        this.rules.push({
            check: (value) => value.length >= length,
            message: (fieldName) => `${fieldName} должен содержать не менее ${length} символов`,
        });
        return this;
    }

    regex(pattern) {
        const regular = new RegExp(pattern);
        this.rules.push({
            check: (value) => regular.test(value),
            message: (fieldName) => `${fieldName} содержит недопустимые символы`,
        });
        return this;
    }

    execute(value, fieldName = 'Значение') {
        let result = this.rules.map(rule => ({
                isValid: rule.check(value),
                error: rule.message(fieldName),
            }));

        return {
            isValid: result.map(r => r.isValid),
            errorMessage: result.map(r => r.error),
        };
    }
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
}

function validateName(name) {
    const namePattern = /[^a-zA-Z0-9_-]/;

    return namePattern.test(name);
}

export function checkInput(email, name, password, password_admit) {
    viewErrorClear('error_color_red', 'error__input', 'error__input', 'error__input', 'error__input');
    textErrorInput('', email, name, password, password_admit)
    if (!validateEmail(email)) {
        viewError('error_color_red', 'error__input', null, null, null);
        textErrorInput('Некорректный e-mail', email, name, password, password_admit);
        return false
    }

    if (name.length < 2 || name.length > 16) {
        viewError('error_color_red', null, 'error__input', null, null);
        textErrorInput('Псевдоним должен содержать от 2 до 16 символов', email, name, password, password_admit);
        return false
    }

    if (validateName(name)) {
        viewError('error_color_red', null, 'error__input', null, null);
        textErrorInput('Псевдоним содержит недопустимые символы', email, name, password, password_admit);
        return false
    }

    if (password.length < 8 || password.length > 32) {
        viewError('error_color_red', null, null, 'error__input', 'error__input');
        textErrorInput('Пароль должен содержать от 8 до 32 символов', email, name, password, password_admit);
        return false;
    }

    if (password !== password_admit) {
        viewError('error_color_red', null, null, 'error__input', 'error__input');
        textErrorInput('Пароли не совпадают', email, name, password, password_admit);
        return false;
    }

    return true;
}