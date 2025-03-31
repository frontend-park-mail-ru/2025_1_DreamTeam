import "./style.css";
import { createApp } from "./ourReact/jsx-runtime";
import { MainMenuContent, MainMenuHeader } from "./MainMenuContent.tsx";
import Header from "./Header.tsx";
import { CourseContent, CourseContentHeader } from "./CourseContentContent.tsx";
import { Setting } from "./Settings.tsx";
import WindowLogin from "./WindowLogin.tsx";

const mainHeader = document.getElementById("mainHeader") as Element;
const header = document.getElementById("header") as Element;
const content = document.getElementById("content") as Element;
const blur = document.getElementById("blur") as Element;

// Меню
createApp(mainHeader, Header);
createApp(header, MainMenuHeader);
createApp(content, MainMenuContent);

//createApp(blur, WindowLogin);

// Описание курса
//createApp(mainHeader, Header);
//createApp(header, CourseContentHeader);
// createApp(content, CourseContent)
