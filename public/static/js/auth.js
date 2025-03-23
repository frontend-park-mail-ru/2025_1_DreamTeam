import { closeWindow, viewError, viewErrorClear, textErrorInput } from './view-window.js';
import { rerenderHeader } from './header.js';
import { IP, PORT, fetchLogout } from './api.js';
import { setEventClick } from './handler.js';
import { switchActive, hiddenInput, showInput } from './view-window.js';
import { checkInput } from './validate.js';

async function authorized() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await loginUser(email, password);

    if (result === true) {
        rerenderHeader();
        closeWindow();
    } else {
        viewError('error_color_red', 'error__input', 'error__input', 'error__input', 'error__input');
        textErrorInput(result, email, name, password, password_admit);
    }
}

async function registration() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const password_admit = document.getElementById('password_admit').value;

    const result = checkInput(email, name, password, password_admit);

    if (result === true) {
        if (await registerUser(email, name, password)) {
            rerenderHeader();
            closeWindow();
        } else {
            viewError('error_color_red', 'error__input', 'error__input', 'error__input', 'error__input');
            textErrorInput(result, email, name, password, password_admit);
        }
    }
}

export async function loginUser(email, password) {
    try {
        const response = await fetch(`${IP}:${PORT}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            return true;
        } else {
            return data.error;
        }
    } catch (err) {
        console.error('Ошибка сети:', err);
        return 'Ошибка сети:';
    }
}

export async function registerUser(email, name, password) {
    try {
        const response = await fetch(`${IP}:${PORT}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email, name, password }),
    });

        const data = await response.json();
        if (response.ok) {
            return true;
        } else {
            return data.error;
        }
    } catch (err) {
        console.error('Ошибка сети:', err);
        return 'Ошибка сети:';
    }
}

export function confirm() {
  const confirm = document.getElementById('log-in');
  const cancel = document.getElementById('sign-up');

  setEventClick(confirm, logout);
  setEventClick(cancel, closeWindow);
}

async function logout() {
  await fetchLogout();
  rerenderHeader();
  closeWindow();
}

export function handlerButtonWindow() {
  const login = document.getElementById('log-in');
  const signup = document.getElementById('sign-up');

  setEventClick(login, handlerButtonWindowLogin);
  setEventClick(signup, handlerButtonWindowSignup);
  if (login.classList.contains('active')) {
      authorized();
  }
  else {
      login.classList.add('active');
      signup.classList.remove('active');
  }
}

export function handlerButtonWindowLogin() {
  const login = document.getElementById('log-in');
  const signup = document.getElementById('sign-up');
  const email = document.getElementById('email').value;

  if (login.classList.contains('active')) {
      authorized();
  } else {
      switchActive(login, signup, 'active');
      hiddenInput();
      viewErrorClear('error_color_red', 'error__input', 'error__input', 'error__input', 'error__input');
      textErrorInput('', email, '', '', '');
  }
}

export function handlerButtonWindowSignup() {
  const login = document.getElementById('log-in');
  const signup = document.getElementById('sign-up');
  const email = document.getElementById('email').value;

  if (signup.classList.contains('active')) {
      registration();
  } else {
      switchActive(signup, login, 'active');
      showInput();
      viewErrorClear('error_color_red', 'error__input', 'error__input', 'error__input', 'error__input');
      textErrorInput('', email, '', '', '');
  }
}
