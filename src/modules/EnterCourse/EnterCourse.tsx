import pluralize from "./logic/pluralize";
import countMarkIcon from "Public/static/icons/courseCountMark.svg";
import countBestMarkIcon from "Public/static/icons/courseCountBestMark.svg";
import countTestIcon from "Public/static/icons/courseCountTest.svg";
import countTimeVideoIcon from "Public/static/icons/courseCountTimeVideo.svg";
import countLessonIcon from "Public/static/icons/courseCountLesson.svg";
import styles from "./EnterCourse.module.scss";

export function EnterCourse({
  mark,
  bestMark,
  countTest,
  countTimeToPassVideo,
  countLesson,
}: {
  mark: number;
  bestMark: number;
  countTest: number;
  countTimeToPassVideo: number;
  countLesson: number;
}) {
  return (
    <div class={styles.courseContentDescription}>
      <div class={styles.courseContentDescriptionSection}>
        Сертификат
        <div class={styles.courseContentDescriptionBlock}>
          <div class={styles.courseContentDescriptionBlock__desc}>
            <img src={countMarkIcon} alt="" />
            {mark.toString()} всего баллов
          </div>
          <div class={styles.courseContentDescriptionBlock__desc}>
            <img src={countBestMarkIcon} alt="" />
            {bestMark.toString()} баллов - с отличием
          </div>
        </div>
      </div>
      <div class={styles.courseContentDescriptionSection}>
        В курс входят
        <div class={styles.courseContentDescriptionBlock}>
          <div class={styles.courseContentDescriptionBlock__desc}>
            <img src={countTestIcon} alt="" />
            {countTest.toString()} тестов
          </div>
          <div class={styles.courseContentDescriptionBlock__desc}>
            <img src={countTimeVideoIcon} alt="" />
            {countTimeToPassVideo.toString()} видео
          </div>
          <div class={styles.courseContentDescriptionBlock__desc}>
            <img src={countLessonIcon} alt="" />
            {countLesson.toString()} уроков
          </div>
        </div>
      </div>
    </div>
  );
}
