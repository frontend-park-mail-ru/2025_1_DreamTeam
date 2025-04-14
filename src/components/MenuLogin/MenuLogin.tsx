import { setMenu, useUser } from "@/App";
import menu from "Public/static/icons/menu.svg";

export default function MenuLogin({
  username,
  avatar,
}: {
  username: string;
  avatar: string;
}) {
  return (
    <div
      class="block-menu"
      ON_click={() => {
        setMenu(true);
        console.log(useUser());
      }}
    >
      <div class="block-avatar">
        {username}
        <div class="avatar">
          <img src={menu} alt="Меню" class="avatar__icon"></img>
          <img src={avatar} alt="Аватарка" class="avatar__img"></img>
        </div>
      </div>
    </div>
  );
}
