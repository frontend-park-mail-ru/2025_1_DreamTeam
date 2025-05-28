//import { setLessonID } from "@/stores";
//import { router } from "@/router";


const PageButton = ({
  page_id,
  type,
  onClick,
}: {
  page_id: string;
  type: string;
  onClick: Function;
}) => {
  console.log(page_id)
  return Number(page_id) === -1 ? (type === "Следующая" ?
    (<button
      class="page--choose"
      ON_click={onClick}
    >
      Завершить курс
    </button>) : <div></div>
  ) : (
    <button class="page--choose" ON_click={onClick}>
      {type}
    </button>
  );
};

export default PageButton;
