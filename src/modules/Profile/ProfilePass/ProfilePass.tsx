import { useState } from "@/ourReact/jsx-runtime";
import styles from "./ProfilePass.module.scss";
import Card from "@/modules/Card";
import { Course, getPurchasedCourses } from "@/api";
// import addToast from "@/components/WindowALert/logic/add";

const ProfileFavorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Course[]>([]);

  console.log("render ProfileFavorites");

  if (isLoading) {
    getPurchasedCourses().then((data) => {
      setData(data);
      setIsLoading(false);
    });
  }

  if (isLoading) {
    return <div class={styles.content}>Загрузка...</div>;
  }

  if (typeof data === "string") {
    // if (isLoading) {
    //   addToast(
    //     "error",
    //     "Ошибка получения избранных курсов. Пожалуйста, попробуйте позже."
    //   );
    // }
    return <div class={styles.content}>Ошибка: {data}</div>;
  }

  if (data.length === 0) {
    return <div class={styles.content}>У вас нет избранных курсов</div>;
  }

  return (
    <div class={styles.content}>
      <div class={styles.cards}>
        {data.map((course) => (
          <Card
            key={`favorite-${course.id}`}
            title={course.title}
            image={course.src_image}
            price={course.price}
            description={course.description}
            id={course.id}
            rating={course.rating}
            tags={course.tags}
            purchases_amount={course.purchases_amount}
            time_to_pass={course.time_to_pass}
            favorite={course.is_favorite}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileFavorites;
