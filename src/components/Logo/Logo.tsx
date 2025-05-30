import { setCourseOpen, setLessonID, setSearch } from "@/stores";
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
          setTimeout(() => {
            setSearch("");
          }, 400);
        }}
      >
        <img src={logo} alt="" class={styles.logoImg}></img>
        <div class={styles.logoText}>SkillForce</div>
      </div>
      <div class={styles.logoAndCreateCursCreateCurs}>Создать курс</div>
    </div>
  );
}
