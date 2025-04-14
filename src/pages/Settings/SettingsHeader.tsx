export default function SettingsHeader() {
  return (
    <header class="changes">
      <div class="headlines">Настройки</div>
      <div class="change-select">
        <button class="choose--type--button" style="width: 314px;">
          <img
            src="../static/icons/user_settings.svg"
            alt=""
            class="editing__icon"
          />
          Редактирование профиля
        </button>
        <button class="choose--type--button" style="width: 218px;">
          <img src="../static/icons/mail.svg" alt="" class="editing__icon" />
          Изменить почту
        </button>
        <button class="choose--type--button" style="width: 232px;">
          <img src="../static/icons/lock.svg" alt="" class="editing__icon" />
          Изменить пароль
        </button>
      </div>
    </header>
  );
}
