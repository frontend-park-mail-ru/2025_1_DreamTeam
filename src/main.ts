import "./style.css";
import { createApp } from "./ourReact/jsx-runtime";
import { MainMenuContent, MainMenuHeader } from "./MainMenuContent.tsx";
import Header from "./Header.tsx";
import { CourseContent, CourseContentHeader } from "./CourseContentContent.tsx";
import { SettingContent, SettingHeader } from "./Settings.tsx";
import WindowLogin from "./WindowLogin.tsx";
import Render from "./Render.tsx";

const mainHeader = document.getElementById("mainHeader") as Element;
const header = document.getElementById("header") as Element;
const content = document.getElementById("content") as Element;
const blur = document.getElementById("blur") as Element;
const app = document.getElementById("app") as Element;

createApp(app, Render);

// Меню
//createApp(mainHeader, Header);
//createApp(header, SettingHeader);
//createApp(content, Setting);

//createApp(blur, WindowLogin);

// Описание курса
//createApp(mainHeader, Header);
//createApp(header, CourseContentHeader);
// createApp(content, CourseContent)
