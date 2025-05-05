import { registerUser } from "@/api";
import { FormData } from "@/types/WindowLogin";
import addToast from "@/components/WindowALert/logic/add";

// TODO: Вывод конкретной причины ошибки(Неправильный данные, занятая почта и тд)
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

  if (!email || !name || !password || !passwordAdmit) {
    addToast("error", "Заполните все поля");
    return;
  }

  const result = await registerUser(email, name, password);

  if (typeof result !== "string") {
    addToast("notification", "Подтвердите почту. Проверьте спам");
  } else {
    addToast("error", "Ошибка. Сервис недоступен, либо почта занята");
  }

  return;
}
