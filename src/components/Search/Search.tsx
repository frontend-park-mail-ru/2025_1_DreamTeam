import search from "Public/static/icons/iconSearch.svg";
import styles from "./Search.module.scss";
import { searchForm } from "@/api";
import { setSearch } from "@/App";

export default function Search() {
  return (
    <div class={styles.searchForm}>
      <img class={styles.searchSearchForm__icon} src={search}></img>
      <input
        type="text"
        placeholder="Поиск"
        class={styles.searchForm__input}
        ON_input={(event: { target: { value: string } }) => {
          setSearch(event.target.value)
        }}
      ></input>
    </div>
  );
}
