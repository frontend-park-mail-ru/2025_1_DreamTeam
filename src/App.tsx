import { checkAuth, getCourse, getLessons, validEmail } from "@/api";
import CourseMenu from "@/pages/CourseMenu";
import Navbar from "@/modules/Navbar/Navbar";
import LessonPage from "@/pages/Lesson";
import NotFoundView from "@/nonFound";
import Settings from "@/pages/Settings";
import MainMenu from "@/pages/MainMenuContent";
import { defineStore } from "@/ourReact/jsx-runtime";
import { router } from "@/router";
import { UserProfile } from "@/types/users";
import { CourseOpen } from "@/types/courseMenu";
import WindowLogin from "@/modules/WindowLogin";
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
export const [useLoginWindow, setLoginWindow] = defineStore(
  "loginWindow",
  false
);
export const [useToast, setToast] = defineStore(
  "toast",
  null as
    | null
    | {
        type: "error" | "success" | "warning" | "warning";
        message: string;
      }[]
);

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/sw.js", { scope: "/" })
//     .then((registration) => {
//       console.log("SW registration OK:", registration);
//     })
//     .catch((err) => {
//       console.log("SW registration FAIL:", err);
//     });
// }

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

const App = () => {
  let content;
  switch (usePage()) {
    case "MainMenu":
      content = <MainMenu key="MainMenu" />;
      break;
    case "Setting":
      content = <Settings key="Settings" />;
      break;
    case "CourseMenu":
      content = <CourseMenu key="CourseMenu" />;
      break;
    case "Lessons":
      content = <LessonPage key="LessonsPage" />;
      break;
    // case "Profile":
    // header = <ProfileHeader key="ProfileHeader" />;
    // content = <ProfileContent key="ProfileContent" />;
    //    break;
    default:
      content = <MainMenu key="MainMenu" />;
      break;
  }
  // return (
  //   <div>
  //     <GoogleIcon key="234" i="search" />
  //     <GoogleIcon key="2324" i="home" />
  //     <GoogleIcon key="232e4" i="menu" />
  //   </div>
  // );

  // TODO: здесь будет перебор всех notification
  return (
    <div>
      <Navbar key="MainHeader" />
      {content}
      {useLoginWindow() ? <WindowLogin /> : ""}
    </div>
  );
};

export default App;
