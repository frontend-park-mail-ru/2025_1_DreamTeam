import { setEventClick, blockingClick } from './handler.js';
import { handlerButtonWindow } from './auth.js';


function createWindowLogin() {
    const element = document.createElement('div');
    element.classList.add('blur');
    element.innerHTML = `
        <div id='window' class='window'>
            <div id='form-login' class='form'>
                <div class='logo'>SkillForce</div>
                <div class='error' id='error'></div>
                <input type='email' id='email' placeholder='Почта' class='form__input'>
                <input type='text' id='name' placeholder='Псевдоним' class='form__input hidden'>
                <input type='password' id='password' placeholder='Пароль' class='form__input'>
                <input type='password' id='password_admit' placeholder='Подтвердить пароль' class='form__input hidden'>
            </div>
            <div class='buttons'>
                <button class='buttons__button active' id='sign-up'>Регистрация</button>
                <button class='buttons__button' id='log-in'>Вход</button>
            </div>
        </div>
    `;

    return element;
}

function createWindowConfirm() {
    const element = document.createElement('div');
    element.classList.add('blur');
    element.innerHTML = `
        <div id='window' class='window'>
            <div id='form-login' class='form'>
                <div class='logo'>SkillForce</div>
                <div class='confirm-text'>Подтверждаете действие?</div>
            </div>
            <div class='buttons'>
                <button class='buttons__button' id='sign-up'>Отмена</button>
                <button class='buttons__button active' id='log-in'>Подтвердить</button>
            </div>
        </div>
    `;

    return element;
}

export function openWindowLogout() {
    const zone = document.getElementById('blur');

    zone.appendChild(createWindowConfirm());

    // Накладываем обработчик для закрытия окна при нажатии на фон
    setEventClick(zone, handlerCloseWindow);

    // После того как создалось окно убираем обработку закрытия окна при клике на фон(всплытие)
    const window = document.getElementById('window');
    blockingClick(window);
}

export function hiddenInput() {
    const name = document.getElementById('name');
    const passwordAdmit = document.getElementById('password_admit');

    name.classList.add('hidden');
    passwordAdmit.classList.add('hidden');
}

export function showInput() {
    const name = document.getElementById('name');
    const password_admit = document.getElementById('password_admit');

    name.classList.remove('hidden');
    password_admit.classList.remove('hidden');
}

export function switchActive(element1, element2, style) {
    element1.classList.add(style);
    element2.classList.remove(style);
}

export function viewError(error_input, email_input, name_input, password_input, password_admit_input) {
    document.getElementById('error').classList.add(error_input);
    document.getElementById('email').classList.add(email_input);
    document.getElementById('name').classList.add(name_input);
    document.getElementById('password').classList.add(password_input);
    document.getElementById('password_admit').classList.add(password_admit_input);
}

export function viewErrorClear(error_input, email_input, name_input, password_input, password_admit_input) {
    document.getElementById('error').classList.remove(error_input);
    document.getElementById('email').classList.remove(email_input);
    document.getElementById('name').classList.remove(name_input);
    document.getElementById('password').classList.remove(password_input);
    document.getElementById('password_admit').classList.remove(password_admit_input);
}

export function textErrorInput(error_input, email_input, name_input, password_input, password_admit_input) {
    document.getElementById('error').innerText = error_input;
    document.getElementById('email').value = email_input;
    document.getElementById('name').value = name_input;
    document.getElementById('password').value = password_input;
    document.getElementById('password_admit').value = password_admit_input;
}

export function closeWindow() {
    document.getElementById('blur').innerHTML = '';
}

export function handlerButtonOpenWindow() {
    const zone = document.getElementById('blur');

    zone.appendChild(createWindowLogin());

    // Накладываем обработчик для закрытия окна при нажатии на фон
    setEventClick(zone, handlerCloseWindow);

    // После того как создалось окно убираем обработку закрытия окна при клике на фон(всплытие)
    const window = document.getElementById('window');
    blockingClick(window);
    console.log('login');
    handlerButtonWindow();
}

export function handlerCloseWindow() {
    closeWindow();
}