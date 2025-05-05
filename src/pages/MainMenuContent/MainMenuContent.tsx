import Card from "@/modules/Card";
import { Course, getCourses, searchForm } from "@/api";
import { useState } from "@/ourReact/jsx-runtime";
import styles from "./MainMenuContent.module.scss";
import { isSearch } from "@/stores";

const MainMenuContent = () => {
  const [cards, setCards] = useState<Course[]>([]);
  const [isLoading, setLoading] = useState(true);
  const searching = isSearch();
  setLoading(true);
  if (isLoading) {
    console.log(searching);
    searching != ""
      ? searchForm(searching).then((data) => {
          setCards(data);
          setLoading(false);
        })
      : getCourses().then((data) => {
          setCards(data);
          setLoading(false);
        });
  }
  console.log("render MainMenuContent");
  if (isLoading) {
    // TODO: Потом добавлю вывод более подробный
    return <div class={styles.content}>Загрузка</div>;
  }

  return (
    <div class={styles.content}>
      <div class={styles.cards}>
        {cards.map((card) => (
          <Card
            key={`card-${card.id}`}
            title={card.title}
            image={card.src_image}
            price={card.price}
            description={card.description}
            id={card.id}
            rating={card.rating}
            tags={card.tags}
            purchases_amount={card.purchases_amount}
            time_to_pass={card.time_to_pass}
          />
        ))}
      </div>
    </div>
  );
};

export default MainMenuContent;
