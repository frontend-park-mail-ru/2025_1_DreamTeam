import "./style.css";
import { createApp } from "./ourReact/jsx-runtime";
import Render from "./Render.tsx";

const app = document.getElementById("app") as Element;

createApp(app, Render);
