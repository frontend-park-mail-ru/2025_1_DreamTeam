import { useState } from "@/ourReact/jsx-runtime";
import { addCourseFavorites, checkAuth, deleteCourseFavorites } from "@/api";
import heartIcon from "Public/static/icons/heart.svg";
import heartHoverIcon from "Public/static/icons/heartHover.svg";
import heartFillIcon from "Public/static/icons/heartFill.svg";
import heartFillHoverIcon from "Public/static/icons/heartFillHover.svg";
import styles from "./FavoriteButton.module.scss";
import addToast from "../WindowALert/logic/add";

export default function FavoriteButton({ courseId }: { courseId: number }) {
  const [isFavorite, setIsFavorite] = useState(false);

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
        setIsFavorite(false);
      } else {
        console.error("Ошибка удаления из избранного");
      }
    } else {
      const result = await addCourseFavorites(courseId);
      if (result === true) {
        setIsFavorite(true);
      } else {
        console.error("Ошибка добавления в избранное");
      }
    }
  };

  return (
    <div class={styles.heart} ON_click={toggleFavorite}>
      <img
        src={isFavorite ? heartFillIcon : heartIcon}
        alt="Избранное"
        class={`${styles.heart__img} ${
          isFavorite ? styles.heart_fill : styles.heart_default
        }`}
      />
      <img
        src={isFavorite ? heartFillHoverIcon : heartHoverIcon}
        alt="Избранное (наведение)"
        class={`${styles.heart__img} ${
          isFavorite ? styles.heart_fillHover : styles.heart_hover
        }`}
      />
    </div>
  );
}
