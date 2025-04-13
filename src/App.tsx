import { getCourse } from "./api";
import { CourseMenu } from "./CourseMenu";
import Navbar from "./Header";
import { MainMenuContent, MainMenuHeader } from "./MainMenuContent";
import NotFoundView from "./nonFound";
import { defineStore } from "./ourReact/jsx-runtime";
import { router } from "./router";
import { SettingContent, SettingHeader } from "./Settings";
export const [useCourseOpen, setCourseOpen] = defineStore(
  "CourseOpen",
  {} as CourseOpen
);
export const [useLessonID, setLessonID] = defineStore<number | false>(
  "LessonData",
  false
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

router.register("/course/{id}/lessons", "Lessons", async () => {
  const matched = router.matchPathToRoute(location.pathname);
  const id = Number(matched?.params.id);

  console.log("Урок");

  if (!isNaN(id)) {
    const course = await getCourse(id);
    const courseId = course.id;
    if (courseId === undefined) {
      console.error("Ошибка");
      return;
    }
    const lessonId = await getLessons(courseId);
    if (lessonId === undefined) {
      console.error("Ошибка");
      return;
    }
    if (course) {
      setCourseOpen(course);
      setLessonID(lessonId.lesson.header.Points[0].lesson_id);
    } else {
      // TODO: Выводить 404 если не существует курса
      console.error("курс не найден");
      setCourseOpen({});
    }
  }
});

router.register("/validate/{token}", "validDate", async () => {
  const matched = router.matchPathToRoute(location.pathname);
  const token = matched?.params.token;

  console.log("Валидация с почты");

  if (token !== undefined) {
    const valid = await validEmail(token);
    if (valid) {
      router.goByState("MainMenu");
      checkAuth().then((data) => {
        if (data === false) {
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
      });
    } else {
      // TODO: Выводить 404 если не существует курса
      console.error("Ошибка: Авторизация не удалась");
      alert("Ошибка: Авторизация не удалась");
      router.goByState("MainMenu");
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
      content = <CourseMenu key="CourseMenuContent" />;
      break;
    case "Lessons":
      header = <div></div>;
      content = <LessonPage key="LessonsContent" />;
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
