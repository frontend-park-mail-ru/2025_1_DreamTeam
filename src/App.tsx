import { configureRouter } from "@/routerConfig";
import CourseMenu from "@/pages/CourseMenu";
import Navbar from "@/modules/Navbar";
import LessonPage from "@/pages/Lesson";
import Settings from "@/pages/Settings";
import MainMenu from "@/pages/MainMenuContent";
import WindowLogin from "@/modules/WindowLogin";
import ToastContainer from "./modules/ToastContainer";

import { usePage, useLoginWindow } from "@/stores";

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
