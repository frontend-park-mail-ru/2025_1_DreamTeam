import { configureRouter } from "@/routerConfig";
import CourseMenu from "@/pages/CourseMenu";
import Navbar from "@/modules/Navbar";
import LessonPage from "@/pages/Lesson";
import Settings from "@/pages/Settings";
import MainMenu from "@/pages/MainMenuContent";
import WindowLogin from "@/modules/WindowLogin";
import ToastContainer from "./modules/ToastContainer";

import { usePage, useLoginWindow } from "@/stores";
import Profile from "./pages/Profile";
import CourseCreate from "@/pages/CourseCreate";

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

configureRouter();

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
    case "Profile":
      content = <Profile key="ProfilePage" />;
      break;
    case "CourseCreate":
      content = <CourseCreate key="CreateCourses" />;
      break;
    default:
      content = <MainMenu key="MainMenu" />;
      break;
  }

  return (
    <div>
      <Navbar key="MainHeader" />
      {content}
      {useLoginWindow() ? <WindowLogin key="WindowLogin" /> : ""}
      <ToastContainer key="ToastContainer" />
    </div>
  );
};

export default App;
