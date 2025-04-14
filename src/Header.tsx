import logo from "Public/static/icons/logo.svg";
import search from "Public/static/icons/iconSearch.svg";
import login from "Public/static/icons/login.svg";
import menu from "Public/static/icons/menu.svg";
import closeMenu from "Public/static/icons/close-menu.svg";
import profile from "Public/static/icons/profile.svg";
import setting from "Public/static/icons/setting.svg";
import logout from "Public/static/icons/logout.svg";
import { useState } from "./ourReact/jsx-runtime";
import WindowLogin from "./WindowLogin";
import { createApp } from "./ourReact/jsx-runtime";
import { checkAuth, fetchLogout } from "./api";
import {
  setCourseOpen,
  setUser,
  useUser,
  setMenu,
  useMenu,
  setLessonID,
  usePage,
  setPage,
} from "./App";
import { router } from "./router";
import { UserProfile } from "./types/users";

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

function GetMenuComponent({ user }: { user: UserProfile }) {
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

function Logo() {
  return (
    <div class="logo-and-create-curs">
      <div
        class="logo"
        ON_click={() => {
          router.goByState("MainMenu");
          setCourseOpen({});
          setLessonID(false);
        }}
      >
        <img src={logo} alt="" class="logo__img"></img>
        <div class="logo__text">SkillForce</div>
      </div>
      <div class="logo-and-create-curs__create-curs">Создать курс</div>
    </div>
  );
}

function Search() {
  return (
    <div class="search-form">
      <img class="search-form__icon" src={search}></img>
      <input type="text" placeholder="Поиск" class="search-form__input"></input>
    </div>
  );
}

function MenuLogout({ click }: { click: Function }) {
  return (
    <div class="block-menu" ON_click={click}>
      <div class="button_type_menu" id="button-login">
        Войти
        <img src={login} alt="Войти" class="button__img"></img>
      </div>
    </div>
  );
}

function MenuLogin({ username, avatar }: { username: string; avatar: string }) {
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

function MenuOpen() {
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
        router.goByState("Setting");
      },
    },
    {
      name: "Настройки",
      image: setting,
      click: () => {
        setMenu(false);
        router.goByState("Setting");
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
    <div class="block-menu">
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

function ButtonMenu({
  name,
  image,
  click,
}: {
  name: string;
  image: string;
  click: Function;
}) {
  return (
    <div class="button_type_menu" ON_click={click}>
      <div class="button__text">{name}</div>
      <img src={image} alt="Войти" class="button__img"></img>
    </div>
  );
}

function openWindow() {
  const blur = document.getElementById("blur") as Element;
  createApp(blur, WindowLogin);
}
