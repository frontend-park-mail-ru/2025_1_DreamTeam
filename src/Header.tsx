import logo from "public/static/icons/logo.svg";
import search from "public/static/icons/iconSearch.svg";
import login from "public/static/icons/login.svg";
import menu from "public/static/icons/menu.svg";
import testAvatar from "public/static/icons/avatar.png";
import closeMenu from "public/static/icons/close-menu.svg";
import profile from "public/static/icons/profile.svg";
import setting from "public/static/icons/setting.svg";
import logout from "public/static/icons/logout.svg";
import { useState } from "./ourReact/jsx-runtime";
import WindowLogin from "./WindowLogin";
import { createApp } from "./ourReact/jsx-runtime";
import { checkAuth, fetchLogout } from "./api";
import { setPage, setCourseOpen, setUser, useUser } from "./App";

export default function Navbar() {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    checkAuth().then((data) => {
      // setIsLogin({username: "fef", menuStatus: false});
      setUser({ username: data, menuStatus: false });
    });
    setIsLoading(false);
  }

  return (
    <div class="header">
      <Logo key="logo" />
      <Search key="search" />

      <GetMenuComponent key="menu" />
    </div>
  );
}

function GetMenuComponent() {
  const isLogin = useUser();
  if (isLogin.username === "") {
    return (
      <div>
        <MenuLogout key="buttonLogin" click={() => openWindow()} />
      </div>
    );
  }
  if (!isLogin.menuStatus) {
    return (
      <div>
        <MenuLogin
          key="buttonAvatar"
          username={isLogin.username}
          click={() =>
            setUser({ username: isLogin.username, menuStatus: true })
          }
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
          setCourseOpen({});
          setPage("MainMenu");
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

function MenuLogin({ username, click }: { username: string; click: Function }) {
  return (
    <div class="block-menu" ON_click={click}>
      <div class="block-avatar" id="block-avatar">
        {username}
        <div class="avatar" id="avatar">
          <img src={menu} alt="Меню" class="avatar__icon"></img>
          <img src={testAvatar} alt="Аватарка" class="avatar__img"></img>
        </div>
      </div>
    </div>
  );
}

function MenuOpen() {
  const isLogin = useUser();
  const arrayButtons = [
    {
      name: "Свернуть",
      image: closeMenu,
      click: () => {
        setUser({ username: isLogin.username, menuStatus: false });
      },
    },
    {
      name: "Профиль",
      image: profile,
      click: () => {
        setUser({ username: isLogin.username, menuStatus: false });
        setPage("Setting");
      },
    },
    {
      name: "Настройки",
      image: setting,
      click: () => {
        setPage("Setting");
        setUser({ username: isLogin.username, menuStatus: false });
      },
    },
    {
      name: "Выйти",
      image: logout,
      click: async () => {
        const result = await fetchLogout();
        if (result) {
          setUser({ username: "", menuStatus: false });
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
          key={`button-${index}`}
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
