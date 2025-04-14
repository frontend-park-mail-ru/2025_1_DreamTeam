import { UserProfile } from "@/types/users";
import openWindow from "../WindowLogin/logic/openWindow";
import { useMenu } from "@/App";
import MenuOpen from "@/components/MenuOpen";
import MenuLogout from "@/components/MenuLogout";
import MenuLogin from "@/components/MenuLogin";

export default function GetMenuComponent({ user }: { user: UserProfile }) {
  if (user === false) {
    return (
      <div>
        <MenuLogout key="buttonLogin" click={() => openWindow()} />
      </div>
    );
  }
  if (useMenu() === false) {
    console.log("If menuStatus false", user);
    return (
      <div>
        <MenuLogin
          username={`${user.name}`}
          avatar={user.avatar_src}
          key="buttonAvatar"
        />
      </div>
    );
  }
  return (
    <div>
      <MenuOpen key="menuOpen" />
    </div>
  );
}
