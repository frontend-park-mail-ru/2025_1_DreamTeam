import { router } from "@/router";
import { checkAuth, getCourse, getLessons, validEmail } from "@/api";
import { setActiveTab, setCourseOpen, setLessonID, setUser } from "@/stores";
import NotFoundView from "@/nonFound";
import { ActiveTabType } from "./types/activeTab";

export const configureRouter = () => {
  router.register("/", "MainMenu", () => {
    console.log("Главная страница");
  });

  router.register("/courseCreate", "CourseCreate", () => {
    console.log("Создание курса");
  });

  router.register("/profile", "Profile", () => {
    console.log("Профиль");
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
        console.error("курс не найден");
        setCourseOpen({});
      }
    }
  });

  router.register("/profile/{tab}", "Profile", async () => {
    const match = router.matchPathToRoute(location.pathname);
    const tab = match?.params.tab;
    console.log("Профиль, вкладка:", tab);

    // Здесь можно добавить проверку на допустимые значения tab, если нужно
    setActiveTab(tab as ActiveTabType);
  });

  router.register("/course/{id}/{tab}", "CourseMenu", async () => {
    const match = router.matchPathToRoute(location.pathname);
    const id = Number(match?.params.id);
    console.log("Курс", match?.params.tab, id);

    if (!isNaN(id)) {
      const course = await getCourse(id);
      if (course) {
        setCourseOpen(course);
        setActiveTab((match?.params.tab as ActiveTabType) || "");
      } else {
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
        console.error("Ошибка: Авторизация не удалась");
        alert("Ошибка: Авторизация не удалась");
        router.goByState("MainMenu");
      }
    }
  });

  router.setNotFoundView(NotFoundView);
  router.start();
};
