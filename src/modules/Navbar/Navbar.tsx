import { useState } from "@/ourReact/jsx-runtime";
import { checkAuth } from "@/api";
import { setUser, useUser } from "@/stores";
import Logo from "@/components/Logo";
import Search from "@/components/Search";
import GetMenuComponent from "@/modules/GetMenuComponent";
import styles from "./Navbar.module.scss";
import { useDevice } from "@/devise";

export default function Navbar() {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useDevice().isMobile;
  if (isLoading) {
    checkAuth().then((data) => {
      if (data === false) {
        setIsLoading(false);
        return;
      }
      console.log(data);
      setUser({
        name: data.name,
        email: data.email,
        bio: data.bio,
        avatar_src: data.avatar_src,
        hide_email: data.hide_email,
      });
      setIsLoading(false);
    });
  }

  if (isLoading) {
    return <div>"загрузка";</div>;
  }

  return (
    <div class={styles.navbar}>
      <Logo key="logo" />
      <Search key="search" />

      {isMobile ? (
        <GetMenuComponent user={useUser()} key="menu" />
      ) : (
        <GetMenuComponent user={useUser()} key="menu" />
      )}
    </div>
  );
}
