import GoogleIcon from "./components/GoogleIcon";
import {
  CourseMenuContent,
  CourseMenuContent2,
  CourseMenuContent3,
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
export const [useUser, setUser] = defineStore("auth", false as UserProfile);

export type UserProfile =
  | {
      name: string;
      email: string;
      bio: string;
      avatar_src: string;
      hide_email: boolean;
    }
  | false;

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

router.register("/", "MainMenu", () => {
  console.log("Главная страница");
});

router.register("/settings", "Setting", () => {
  console.log("Настройки");
});

router.register("/course", "CourseMenu", () => {
  console.log("Курс");
});

router.register("/course/{id}", "CourseMenu", async () => {
  const match = router.matchPathToRoute(location.pathname);
  const id = Number(match?.params.id);

  if (!isNaN(id)) {
    const course = await getCourse(id);
    if (course) {
      setCourseOpen(course);
    } else {
      // TODO: Выводить 404 если не существует курса
      console.error("курс не найден");
      setCourseOpen({});
    }
  }
});

router.setNotFoundView(NotFoundView);
router.start();

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
      header = <div></div>;
      content = <CourseMenuContent3 key="CourseMenuContent" />;
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
