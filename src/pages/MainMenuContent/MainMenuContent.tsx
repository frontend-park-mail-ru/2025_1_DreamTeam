import Card from "@/modules/Card";
import { Course, getCourses, searchForm } from "@/api";
import { useState } from "@/ourReact/jsx-runtime";
import styles from "./MainMenuContent.module.scss";
import { isSearch } from "@/stores";

const MainMenuContent = () => {
  const [cards, setCards] = useState<Course[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [prevSearch, setPrevSearch] = useState("");
  const searching = isSearch();

  if (searching !== prevSearch) {
    setPrevSearch(searching);
    if (searching !== "") {
      searchForm(searching).then((data) => {
        setCards(data);
      });
    } else {
      getCourses().then((data) => {
        setCards(data);
      });
    }
  }

  if (isLoading) {
    getCourses().then((data) => {
      setCards(data);
      setLoading(false);
    });
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
            favorite={card.is_favorite}
          />
        ))}
      </div>
    </div>
  );
};

export default MainMenuContent;
