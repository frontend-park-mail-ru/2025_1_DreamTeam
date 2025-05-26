import { router } from "@/router";
import styles from "./Settings.module.scss";
import closeIcon from "Public/static/icons/closeCourse.svg";
import arrowDownIcon from "Public/static/icons/arrowDown40x40.svg";

const SettingsHeader = () => {
  return (
    <header class={styles.header}>
      <div
        class={styles.closeMenu}
        ON_click={() => {
          router.goToPath(`/profile`);
        }}
      >
        <img style={"cursor: pointer;"} src={arrowDownIcon} />
      </div>
      <div class={styles.headerInfo}>
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
            <img
              src="../static/icons/mail.svg"
              alt=""
              class={styles.changeImg}
            />
            Изменить почту
          </div>
          <div class={styles.change}>
            <img
              src="../static/icons/lock.svg"
              alt=""
              class={styles.changeImg}
            />
            Изменить пароль
          </div>
        </div>
      </div>
      <div
        class={styles.closeMenu}
        ON_click={() => {
          router.goByState("MainMenu");
        }}
      >
        <img style={"cursor: pointer;"} src={closeIcon} />
      </div>
    </header>
  );
};

export default SettingsHeader;
