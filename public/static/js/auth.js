import { close_window, view_error, view_error_clear, text_error_input } from "./view-window.js";
import { rerender_header } from "./header.js";
import { ip, port, fetch_logout } from "./api.js";
import { set_event_click } from "./handler.js";
import { switch_active, hidden_input, show_input } from "./view-window.js";
import { check_input } from "./validate.js";

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

export function confirm() {
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

export function handler_button_window() {
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

export function handler_button_window_login() {
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

export function handler_button_window_signup() {
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
