import { setMenu, useUser } from "@/stores";
import menu from "Public/static/icons/menu.svg";
import styles from "./MenuLogin.module.scss";

export default function MenuLogin({
  username,
  avatar,
}: {
  username: string;
  avatar: string;
}) {
  return (
    <div class={styles.blockAvatar}>
      <div class={styles.text}>{username}</div>
      <div
        class={styles.avatar}
        ON_click={() => {
          setMenu(true);
          console.log(useUser());
        }}
      >
        <img src={menu} alt="Меню" class={styles.avatarIcon} />
        <img src={avatar} alt="Аватарка" class={styles.avatarImg} />
      </div>
    </div>
  );
}
