import login from "Public/static/icons/login.svg";

export default function MenuLogout({ click }: { click: Function }) {
  return (
    <div class="button_type_menu" ON_click={click}>
      Войти
      <img src={login} alt="Войти" class="button__img"></img>
    </div>
  );
}
