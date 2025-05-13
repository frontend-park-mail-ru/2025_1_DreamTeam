import ButtonMenu from "@/ui/ButtonMenu/ButtonMenu";
import closeMenu from "Public/static/icons/close-menu.svg";
import profile from "Public/static/icons/profile.svg";
import setting from "Public/static/icons/setting.svg";
import logout from "Public/static/icons/logout.svg";
import { fetchLogout } from "@/api";
import { setMenu, setPage, setUser, usePage } from "@/stores";
import { router } from "@/router";
import styles from "./MenuOpen.module.scss";

export default function MenuOpen() {
  const arrayButtons = [
    {
      name: "Свернуть",
      image: closeMenu,
      click: () => {
        setMenu(false);
      },
    },
    {
      name: "Профиль",
      image: profile,
      click: () => {
        setMenu(false);
        router.goByState("Profile");
      },
    },
    {
      name: "Выйти",
      image: logout,
      click: async () => {
        const result = await fetchLogout();
        if (result) {
          setMenu(false);
          setUser(false);
          if (usePage() === "Setting") {
            setPage("MainMenu");
          }
          console.log("успешный выход");
        } else {
          console.error("Ошибка выхода");
        }
      },
    },
  ];
  return (
    <div class={styles.blockMenu}>
      {arrayButtons.map((button, index) => (
        <ButtonMenu
          key={`button-menu-${index}`}
          name={button.name}
          image={button.image}
          click={button.click}
        />
      ))}
    </div>
  );
}
