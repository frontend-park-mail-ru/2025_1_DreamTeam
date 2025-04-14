import login from "Public/static/icons/login.svg";

export default function MenuLogout({ click }: { click: Function }) {
  return (
    <div class="block-menu" ON_click={click}>
      <div class="button_type_menu" id="button-login">
        Войти
        <img src={login} alt="Войти" class="button__img"></img>
      </div>
    </div>
  );
}
