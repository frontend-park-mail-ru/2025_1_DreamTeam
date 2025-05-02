import search from "Public/static/icons/iconSearch.svg";
import "./Search.scss";

export default function Search() {
  return (
    <div class="search-form">
      <img class="search-form__icon" src={search}></img>
      <input type="text" placeholder="Поиск" class="search-form__input"></input>
    </div>
  );
}
