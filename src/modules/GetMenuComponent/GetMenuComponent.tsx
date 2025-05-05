import { UserProfile } from "@/types/users";
import openWindow from "../WindowLogin/logic/openWindow";
import { useMenu } from "@/stores";
import MenuOpen from "@/components/MenuOpen";
import MenuLogout from "@/components/MenuLogout";
import MenuLogin from "@/components/MenuLogin";
import styles from "./GetMenuComponent.module.scss";

export default function GetMenuComponent({ user }: { user: UserProfile }) {
  if (user === false) {
    return (
      <div class={styles.blockMenu}>
        <MenuLogout key="buttonLogin" click={() => openWindow()} />
      </div>
    );
  }
  if (useMenu() === false) {
    return (
      <div class={styles.blockMenu}>
        <MenuLogin
          username={`${user.name}`}
          avatar={user.avatar_src}
          key="buttonAvatar"
        />
      </div>
    );
  }
  return (
    <div class={styles.blockMenu2}>
      <MenuOpen key="menuOpen" />
    </div>
  );
}
