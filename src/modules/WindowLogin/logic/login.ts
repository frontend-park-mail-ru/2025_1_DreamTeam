import { setUser } from "@/stores";
import { FormData } from "@/types/WindowLogin";
import closeWindow from "./closeWindow";
import addToast from "@/components/WindowALert/logic/add";
import { loginUser } from "@/api/Profile/authorization/login";
import { checkAuth } from "@/api/Profile/authorization/check";

export default async function login(formData: FormData) {
  const emailError = formData.emailField.isValid.includes(false);
  const passwordError = formData.passwordField.isValid.includes(false);

  if (emailError || passwordError) {
    console.error("Ошибка входа");
    addToast("error", "Поля заполнены не корректно");
    return;
  }

  const email = formData.emailField.value;
  const password = formData.passwordField.value;

  if (!email || !password) {
    addToast("error", "Заполните все поля");
    return;
  }

  const result = await loginUser(email, password);

  if (result && typeof result === "object" && result.ok === false) {
    console.error("Ошибка входа:", result);
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
      case "email or password incorrect":
        addToast("error", "Неверный email или пароль");
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
  addToast("success", "Успешный вход");
  const isAuth = await checkAuth();
  if (isAuth.ok === false) {
    console.error("Ошибка проверки авторизации:", isAuth.error);
    addToast("error", "Ошибка проверки авторизации");
    return;
  }
  const data = isAuth.data?.user;
  if (!data) {
    console.error("Нет данных пользователя после входа");
    addToast("error", "Нет данных пользователя после входа");
    return;
  }
  setUser({
    name: data.name,
    email: data.email,
    bio: data.bio,
    avatar_src: data.avatar_src,
    hide_email: data.hide_email,
  });
  closeWindow();
}
