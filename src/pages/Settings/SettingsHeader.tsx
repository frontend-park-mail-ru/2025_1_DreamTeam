import styles from "./Settings.module.scss";

const SettingsHeader = () => {
  return (
    <header class={styles.header}>
      <div class={styles.headlines}>Настройки</div>
      <div class={styles.changes}>
        <div class={`${styles.change} ${styles.changeActive}`}>
          <img
            src="../static/icons/user_settings.svg"
            alt=""
            class={styles.changeImg}
          />
          Редактирование профиля
        </div>
        <div class={styles.change}>
          <img src="../static/icons/mail.svg" alt="" class={styles.changeImg} />
          Изменить почту
        </div>
        <div class={styles.change}>
          <img src="../static/icons/lock.svg" alt="" class={styles.changeImg} />
          Изменить пароль
        </div>
      </div>
    </header>
  );
};

export default SettingsHeader;
