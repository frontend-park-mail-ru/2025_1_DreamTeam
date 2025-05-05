import { setCourseOpen, setLessonID } from "@/stores";
import { router } from "@/router";
import logo from "Public/static/icons/logo.svg";
import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <div class={styles.logoAndCreateCurs}>
      <div
        class={styles.logo}
        ON_click={() => {
          router.goByState("MainMenu");
          setCourseOpen({});
          setLessonID(false);
        }}
      >
        <img src={logo} alt="" class={styles.logoImg}></img>
        <div class={styles.logoText}>SkillForce</div>
      </div>
      <div class={styles.logoAndCreateCursCreateCurs}>Создать курс</div>
    </div>
  );
}
