import search from "Public/static/icons/iconSearch.svg";
import styles from "./Search.module.scss";
import { isSearch, setSearch } from "@/stores";
import { router } from "@/router";

export default function Search() {
  function debounce(
    func: (arg0: any) => void | PromiseLike<void>,
    ms: number | undefined
  ) {
    let timeout: string | number | NodeJS.Timeout | undefined;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(args), ms);
    };
  }
  const debouncedSetSearch = debounce((value: string) => {
    setSearch(value);
  }, 300);

  const searchValue = isSearch();

  return (
    <div class={styles.searchForm}>
      <img class={styles.searchSearchForm__icon} src={search}></img>
      <input
        type="text"
        placeholder="Поиск"
        class={styles.searchForm__input}
        value={searchValue}
        ON_input={(event: { target: { value: string } }) => {
          if (event.target.value === "") {
            setSearch("");
          } else {
            debouncedSetSearch(event.target.value);
          }
        }}
        ON_keydown={(event: KeyboardEvent) => {
          if (event.key === "Enter") {
            router.goByState("MainMenu");
          }
        }}
      />
    </div>
  );
}
