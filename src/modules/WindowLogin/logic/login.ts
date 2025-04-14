import { checkAuth, loginUser } from "@/api";
import { setUser } from "@/App";
import { FormData } from "@/types/WindowLogin";
import closeWindow from "./closeWindow";

// TODO: Вывод конкретной причины ошибки(Неправильный данные, занятая почта и тд)
// TODO: Закрыть окно и рендер header, чтобы увидеть автар и имя пользователя
export default async function login(
  formData: FormData,
  setErrorAuth: Function
) {
  const emailError = formData.emailField.isValid.includes(false);
  const passwordError = formData.passwordField.isValid.includes(false);

  if (emailError || passwordError) {
    console.error("Ошибка входа");
    setErrorAuth("Поля заполнены не корректно");
    return;
  }

  const email = formData.emailField.value;
  const password = formData.passwordField.value;

  if (!email || !password) {
    setErrorAuth("Заполните все поля");
    return;
  }

  const result = await loginUser(email, password);

  if (result === true) {
    setErrorAuth("Успешный вход");
    checkAuth().then((data) => {
      if (data === false) {
        return;
      }
      console.log(data);
      setUser({
        name: data.name,
        email: data.email,
        bio: data.bio,
        avatar_src: data.avatar_src,
        hide_email: data.hide_email,
      });
    });
    closeWindow();
  } else {
    setErrorAuth("Неправильные данные");
  }
}
