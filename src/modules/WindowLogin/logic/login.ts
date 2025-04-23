import { checkAuth, loginUser } from "@/api";
import { setUser } from "@/App";
import { FormData } from "@/types/WindowLogin";
import closeWindow from "./closeWindow";
import addToast from "@/components/WindowALert/logic/add";

// TODO: Вывод конкретной причины ошибки(Неправильный данные, занятая почта и тд)
// TODO: Закрыть окно и рендер header, чтобы увидеть автар и имя пользователя
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

  if (result === true) {
    addToast("success", "Успешный вход");
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
    addToast("error", "Неправильные данные");
  }
}
