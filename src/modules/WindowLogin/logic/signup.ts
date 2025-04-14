import { checkAuth, registerUser } from "@/api";
import { setUser } from "@/App";
import { FormData } from "@/types/WindowLogin";
import closeWindow from "./closeWindow";

// TODO: Вывод конкретной причины ошибки(Неправильный данные, занятая почта и тд)
// TODO: Закрыть окно и рендер header, чтобы увидеть автар и имя пользователя
export default async function signup(
  formData: FormData,
  setErrorAuth: Function
) {
  const emailError = formData.emailField.isValid.includes(false);
  const nameError = formData.nameField.isValid.includes(false);
  const passwordError = formData.passwordField.isValid.includes(false);
  const passwordAdmitError =
    formData.passwordAdmitField.isValid.includes(false);

  if (emailError || nameError || passwordError || passwordAdmitError) {
    console.error("Ошибка регистрации");
    setErrorAuth("Поля заполнены не корректно");
    return;
  }

  const email = formData.emailField.value;
  const name = formData.nameField.value;
  const password = formData.passwordField.value;
  const passwordAdmit = formData.passwordAdmitField.value;

  if (password !== passwordAdmit) {
    setErrorAuth("Пароли не совпадают");
    return;
  }

  if (!email || !name || !password || !passwordAdmit) {
    setErrorAuth("Заполните все поля");
    return;
  }

  const result = await registerUser(email, name, password);

  if (typeof result !== "string") {
    setErrorAuth("Подтвердите почту, проверьте спам");
  } else {
    setErrorAuth("Ошибка. Сервис недоступен, либо почта занята");
  }

  return;
}
