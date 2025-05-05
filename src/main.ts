import "./style.scss";
import { createApp } from "./ourReact/jsx-runtime";
import App from "./App.tsx";

const app = document.getElementById("app") as Element;

createApp(app, App);
