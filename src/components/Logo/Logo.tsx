import { setCourseOpen, setLessonID } from "@/App";
import { router } from "@/router";
import logo from "Public/static/icons/logo.svg";
import "./Logo.scss";

export default function Logo() {
  return (
    <div class="logo-and-create-curs">
      <div
        class="logo"
        ON_click={() => {
          router.goByState("MainMenu");
          setCourseOpen({});
          setLessonID(false);
        }}
      >
        <img src={logo} alt="" class="logo__img"></img>
        <div class="logo__text">SkillForce</div>
      </div>
      <div class="logo-and-create-curs__create-curs">Создать курс</div>
    </div>
  );
}
