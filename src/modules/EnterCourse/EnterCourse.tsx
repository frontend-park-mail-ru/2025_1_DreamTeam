import pluralize from "./logic/pluralize";
import countMarkIcon from "Public/static/icons/courseCountMark.svg";
import countBestMarkIcon from "Public/static/icons/courseCountBestMark.svg";
import countTestIcon from "Public/static/icons/courseCountTest.svg";
import countTimeVideoIcon from "Public/static/icons/courseCountTimeVideo.svg";
import countLessonIcon from "Public/static/icons/courseCountLesson.svg";

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
  const hours = Math.floor(countTimeToPassVideo / 3600);
  const minutes = Math.floor((countTimeToPassVideo % 3600) / 60);

  const hourLabel = pluralize(hours, ["час", "часа", "часов"]);
  const minuteLabel = pluralize(minutes, ["минута", "минуты", "минут"]);

  return (
    <div class="course-content-description">
      <div class="course-content-description-section">
        Сертификат
        <div class="course-content-description-block">
          <div class="course-content-description-block__desc">
            <img src={countMarkIcon} alt="" />
            {mark.toString()} баллов - об окончании
          </div>
          <div class="course-content-description-block__desc">
            <img src={countBestMarkIcon} alt="" />
            {bestMark.toString()} баллов - с отличием
          </div>
        </div>
      </div>
      <div class="course-content-description-section">
        В курс входят
        <div>
          <div class="course-content-description-block__desc">
            <img src={countTestIcon} alt="" />
            {countTest.toString()} тестов
          </div>
          <div class="course-content-description-block__desc">
            <img src={countTimeVideoIcon} alt="" />
            {hours > 0 ? `${hours.toString()} ${hourLabel}` : ""}{" "}
            {minutes.toString()} {minuteLabel} видео
          </div>
          <div class="course-content-description-block__desc">
            <img src={countLessonIcon} alt="" />
            {countLesson.toString()} уроков
          </div>
        </div>
      </div>
    </div>
  );
}
