import login from "Public/static/icons/login.svg";
import style from "./MenuLogout.module.scss";

export default function MenuLogout({ click }: { click: Function }) {
  return (
    <div class={style.buttonTypeMenu} ON_click={click}>
      Войти
      <img src={login} alt="Войти" class="button__img"></img>
    </div>
  );
}
