import { useState } from "@/ourReact/jsx-runtime";
import heartIcon from "Public/static/icons/heart.svg";
import heartHoverIcon from "Public/static/icons/heartHover.svg";
import heartFillIcon from "Public/static/icons/heartFill.svg";
import heartFillHoverIcon from "Public/static/icons/heartFillHover.svg";
import styles from "./FavoriteButton.module.scss";
import addToast from "../WindowALert/logic/add";
import { checkAuth } from "@/api/Profile/authorization/check";
import { addCourseFavorites } from "@/api/Course/CourseOpen/operationFavorites/add";
import { deleteCourseFavorites } from "@/api/Course/CourseOpen/operationFavorites/delete";

export default function FavoriteButton({
  favorite,
  courseId,
  buttonCourse = false,
}: {
  favorite: boolean;
  courseId: number;
  buttonCourse?: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isHovered, setIsHovered] = useState(false);

  const canHover = window.matchMedia("(hover: hover)").matches;

  const toggleFavorite = async (e: Event) => {
    e.stopPropagation();

    const isAuthorized = await checkAuth();
    if (isAuthorized.ok === false) {
      if (isAuthorized.error !== "not authorized") {
        console.error("Ошибка проверки авторизации:", isAuthorized.error);
        addToast("error", "Ошибка проверки авторизации");
        return;
      }
      console.error("Пользователь не авторизован");
      addToast(
        "error",
        "Пожалуйста, войдите в систему, чтобы добавить курс в избранное."
      );
      return;
    }

    if (isFavorite) {
      const result = await deleteCourseFavorites(courseId);
      if (result.ok === true) {
        console.log("Удалено из избранного");
        setIsFavorite(false);
      } else {
        addToast("error", "Ошибка удаления из избранного");
        console.error("Ошибка удаления из избранного");
      }
    } else {
      const result = await addCourseFavorites(courseId);
      if (result.ok === true) {
        console.log("Добавлено в избранное");
        setIsFavorite(true);
      } else {
        addToast("error", "Ошибка добавления в избранное");
        console.error("Ошибка добавления в избранное");
      }
    }
  };

  const getIcon = () => {
    if (isFavorite) {
      return isHovered ? heartFillHoverIcon : heartFillIcon;
    } else {
      return isHovered ? heartHoverIcon : heartIcon;
    }
  };

  if (buttonCourse) {
    return (
      <div
        class={styles.coursePriceAndButton__buttonText}
        ON_click={toggleFavorite}
        ON_mouseenter={() => canHover && setIsHovered(true)}
        ON_mouseleave={() => canHover && setIsHovered(false)}
      >
        <div class={styles.heart}>
          <img src={getIcon()} alt="Избранное" class={styles.heart__img} />
        </div>
        Избранное
      </div>
    );
  }

  return (
    <div
      class={styles.heart}
      ON_click={toggleFavorite}
      ON_mouseenter={() => canHover && setIsHovered(true)}
      ON_mouseleave={() => canHover && setIsHovered(false)}
    >
      <img src={getIcon()} alt="Избранное" class={styles.heart__img} />
    </div>
  );
}
