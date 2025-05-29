import { useState } from "@/ourReact/jsx-runtime";
import { addCourseFavorites, checkAuth, deleteCourseFavorites } from "@/api";
import heartIcon from "Public/static/icons/heart.svg";
import heartHoverIcon from "Public/static/icons/heartHover.svg";
import heartFillIcon from "Public/static/icons/heartFill.svg";
import heartFillHoverIcon from "Public/static/icons/heartFillHover.svg";
import styles from "./FavoriteButton.module.scss";
import addToast from "../WindowALert/logic/add";

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
    if (!isAuthorized) {
      console.error("Пользователь не авторизован");
      addToast(
        "error",
        "Пожалуйста, войдите в систему, чтобы добавить курс в избранное."
      );
      return;
    }

    if (isFavorite) {
      const result = await deleteCourseFavorites(courseId);
      if (result === true) {
        console.log("Удалено из избранного");
        setIsFavorite(false);
      } else {
        console.error("Ошибка удаления из избранного");
      }
    } else {
      const result = await addCourseFavorites(courseId);
      if (result === true) {
        console.log("Добавлено в избранное");
        setIsFavorite(true);
      } else {
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
        Хочу пройти
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
