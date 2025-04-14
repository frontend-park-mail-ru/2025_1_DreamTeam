import { useState } from "@/ourReact/jsx-runtime";
import { checkAuth } from "@/api";
import { setUser, useUser } from "@/App";
import Logo from "@/components/Logo";
import Search from "@/components/Search";
import GetMenuComponent from "@/modules/GetMenuComponent";

export default function Navbar() {
  const [isLoading, setIsLoading] = useState(true);
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

  console.log(useUser());

  console.log("header");
  return (
    <div class="header">
      <Logo key="logo" />
      <Search key="search" />

      <GetMenuComponent user={useUser()} key="menu" />
    </div>
  );
}
