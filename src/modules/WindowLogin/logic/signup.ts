import { registerUser } from "@/api/Profile/authorization/register";
import { FormData } from "@/types/WindowLogin";
import addToast from "@/components/WindowALert/logic/add";

const emailServices: Record<string, string> = {
  "gmail.com": "https://mail.google.com/",
  "mail.ru": "https://e.mail.ru/inbox/",
  "bk.ru": "https://e.mail.ru/inbox/",
  "list.ru": "https://e.mail.ru/inbox/",
  "inbox.ru": "https://e.mail.ru/inbox/",
  "yandex.ru": "https://mail.yandex.ru/",
  "ya.ru": "https://mail.yandex.ru/",
  "mail-tm.ru": "https://mail-tm.ru/",
  "rambler.ru": "https://mail.rambler.ru/",
  "outlook.com": "https://outlook.live.com/",
  "icloud.com": "https://www.icloud.com/mail",
};

export default async function signup(formData: FormData) {
  const emailError = formData.emailField.isValid.includes(false);
  const nameError = formData.nameField.isValid.includes(false);
  const passwordError = formData.passwordField.isValid.includes(false);
  const passwordAdmitError =
    formData.passwordAdmitField.isValid.includes(false);

  if (emailError || nameError || passwordError || passwordAdmitError) {
    console.error("Ошибка регистрации");
    addToast("error", "Поля заполнены не корректно");
    return;
  }

  const email = formData.emailField.value;
  const name = formData.nameField.value;
  const password = formData.passwordField.value;
  const passwordAdmit = formData.passwordAdmitField.value;

  if (password !== passwordAdmit) {
    addToast("error", "Пароли не совпадают");
    return;
  }

  const result = await registerUser(email, name, password);

  if (result && typeof result === "object" && result.ok === false) {
    console.error("Ошибка регистрации:", result);
    switch (result.error) {
      case "invalid request":
        addToast("error", "Некорректный запрос");
        break;
      case "password too short":
        addToast("error", "Пароль слишком короткий");
        break;
      case "invalid email":
        addToast("error", "Некорректный email");
        break;
      case "email already exists":
        addToast("error", "Почта уже занята");
        break;
      case "method not allowed":
        addToast("error", "Метод не разрешён");
        break;
      case "server error":
        addToast("error", "Ошибка сервера");
        break;
      default:
        addToast("error", result.error || "Неизвестная ошибка");
        break;
    }
    return;
  }

  const domain = email.split("@")[1]?.toLowerCase();
  const link = domain && emailServices[domain];

  if (link) {
    addToast(
      "notification",
      `Подтвердите почту. <a href="${link}" target="_blank" rel="noopener noreferrer">Перейти к почте</a>`
    );
  } else {
    addToast("notification", "Подтвердите почту. Проверьте спам");
  }
}
