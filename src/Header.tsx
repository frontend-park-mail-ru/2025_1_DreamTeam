import logo from "./icons/logo.svg";
import search from "./icons/iconSearch.svg";
import login from "./icons/login.svg";
import menu from "./icons/menu.svg";
import testAvatar from "./icons/avatar.png";
import closeMenu from "./icons/close-menu.svg";
import profile from "./icons/profile.svg";
import setting from "./icons/setting.svg";
import logout from "./icons/logout.svg";
import { useState } from "./ourReact/jsx-runtime";

export default function Header() {
  const [isLogin, setIsLogin] = useState({ username: "", menuStatus: false });
  return (
    <div class="header">
      <Logo key="logo" />
      <Search key="search" />

      <GetMenuComponent key="menu" isLogin={isLogin} setIsLogin={setIsLogin} />
    </div>
  );
}

function GetMenuComponent({
  isLogin,
  setIsLogin,
}: {
  isLogin: { username: string; menuStatus: boolean };
  setIsLogin: (value: { username: string; menuStatus: boolean }) => void;
}) {
  if (isLogin.username === "") {
    return (
      <div>
        <MenuLogout
          key="buttonLogin"
          onClick={() => setIsLogin({ username: "name123", menuStatus: false })}
        />
      </div>
    );
  }
  if (!isLogin.menuStatus) {
    return (
      <div>
        <MenuLogin
          key="buttonAvatar"
          username={isLogin.username}
          onClick={() =>
            setIsLogin({ username: isLogin.username, menuStatus: true })
          }
        />
      </div>
    );
  }
  return (
    <div>
      <MenuOpen key="menuOpen" setIsLogin={setIsLogin} isLogin={isLogin} />
    </div>
  );
}

function Logo() {
  return (
    <div class="logo-and-create-curs">
      <div class="logo">
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
      <input
        id="text"
        type="text"
        placeholder="Поиск"
        class="search-form__input"
      ></input>
    </div>
  );
}

function MenuLogout({ onClick }: { onClick: Function }) {
  return (
    <div class="block-menu" ON_click={onClick}>
      <div class="button_type_menu" id="button-login">
        Войти
        <img src={login} alt="Войти" class="button__img"></img>
      </div>
    </div>
  );
}

function MenuLogin({
  username,
  onClick,
}: {
  username: string;
  onClick: Function;
}) {
  return (
    <div class="block-menu" ON_click={onClick}>
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

function MenuOpen({
  setIsLogin,
  isLogin,
}: {
  setIsLogin: (value: { username: string; menuStatus: boolean }) => void;
  isLogin: { username: string; menuStatus: boolean };
}) {
  const arrayButtons = [
    {
      name: "Свернуть",
      image: closeMenu,
      onClick: () => {
        setIsLogin({ username: isLogin.username, menuStatus: false });
      },
    },
    {
      name: "Профиль",
      image: profile,
      onClick: () => {
        setIsLogin({ username: isLogin.username, menuStatus: false });
      },
    },
    {
      name: "Настройки",
      image: setting,
      onClick: () => {
        setIsLogin({ username: isLogin.username, menuStatus: false });
      },
    },
    {
      name: "Выйти",
      image: logout,
      onClick: () => {
        setIsLogin({ username: "", menuStatus: false });
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
          onClick={button.onClick}
        />
      ))}
    </div>
  );
}

function ButtonMenu({
  name,
  image,
  onClick,
}: {
  name: string;
  image: string;
  onClick: Function;
}) {
  return (
    <div class="button_type_menu" ON_click={onClick}>
      <div class="button__text">{name}</div>
      <img src={image} alt="Войти" class="button__img"></img>
    </div>
  );
}
