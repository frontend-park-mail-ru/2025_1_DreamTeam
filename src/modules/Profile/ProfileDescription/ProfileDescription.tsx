import { setMenu, useUser } from "@/stores";
import styles from "./ProfileDescription.module.scss";
import setting from "Public/static/icons/setting.svg";
import { router } from "@/router";
import ButtonMenu from "@/ui/ButtonMenu";

const ProfileDescription = () => {
  const user = useUser();
  if (!user) {
    console.log(user);
    return <div class="content dont-content">Не авторизован</div>;
  }
  const settingButton = {
    name: "Настройки",
    image: setting,
    click: () => {
      setMenu(false);
      router.goByState("Setting");
    },
  };
  return (
    <div class={styles.content}>
      <div class={styles.profileInfo}>
        <div class={styles.picture}>
          <img src={user.avatar_src} alt="" />
        </div>
        <div class={styles.textInfo}>
          <div class={styles.textBlock}>
            <div class={styles.textBlock__desc}>Имя</div>
            <div class={styles.textBlock__data}>{user.name}</div>
          </div>
          <div class={styles.textBlock}>
            <div class={styles.textBlock__desc}>О себе</div>
            <div class={styles.textBlock__data}>{user.bio}</div>
          </div>
        </div>
      </div>
      <ButtonMenu
        key={`buttonSetting`}
        name={settingButton.name}
        image={settingButton.image}
        click={settingButton.click}
      />
    </div>
  );
};

export default ProfileDescription;
