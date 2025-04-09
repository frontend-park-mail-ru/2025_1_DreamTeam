import GoogleIcon from "./components/GoogleIcon";
import {
  CourseMenuContent,
  CourseMenuContent2,
  CourseMenuHeader,
  CourseStructure,
} from "./CourseMenu";
import Navbar from "./Header";
import { MainMenuContent, MainMenuHeader } from "./MainMenuContent";
import { defineStore, useState } from "./ourReact/jsx-runtime";
import { SettingContent, SettingHeader } from "./Settings";
import WindowLogin from "./WindowLogin";
export const [useCourseOpen, setCourseOpen] = defineStore(
  "CourseOpen",
  {} as CourseOpen
);
export const [usePage, setPage] = defineStore("Page", "MainMenu");
export const [useMenu, setMenu] = defineStore("menu", false);
export const [useUser, setUser] = defineStore("auth", {
  username: "",
  avatar: "default_to_path",
});

export interface CourseOpen {
  title?: string;
  description?: string;
  id?: number;
  price?: number;
  rating?: number;
  src_image?: string;
  tags?: string[];
  purchases_amount?: number;
  time_to_pass?: number;
}

export default function App() {
  let header;
  let content;
  switch (usePage()) {
    case "MainMenu":
      header = <MainMenuHeader key="MainMenuHeader" />;
      content = <MainMenuContent key="MainMenuContent" />;
      break;
    case "Setting":
      header = <SettingHeader key="SettingHeader" />;
      content = <SettingContent key="SettingContent" />;
      break;
    case "CourseMenu":
      header = <CourseMenuHeader key="CourseMenuHeader" />;
      content = <CourseMenuContent key="CourseMenuContent" />;
      break;
    // case "Profile":
    // header = <ProfileHeader key="ProfileHeader" />;
    // content = <ProfileContent key="ProfileContent" />;
    //    break;
    default:
      header = <MainMenuHeader key="MainMenuHeader" />;
      content = <MainMenuContent key="MainMenuContent" />;
      break;
  }
  // return (
  //   <div>
  //     <GoogleIcon key="234" i="search" />
  //     <GoogleIcon key="2324" i="home" />
  //     <GoogleIcon key="232e4" i="menu" />
  //   </div>
  // );
  return (
    <div>
      <Navbar key="MainHeader" />
      {header}
      {content}
    </div>
  );
}
