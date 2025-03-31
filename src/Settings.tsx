import { useState } from "./ourReact/jsx-runtime";

export function Setting() {
  const [data, setData] = useState("");

  return (
    <div class="profile">
      <div class="strings">
        Ваше имя
        <input
          id = "input"
          type="text"
          class="text__input"
          style="height: 39px;"
          value={data}
        />
        {data}
      </div>
      <div class="strings">
        О себе
        <textarea class="text__input" style="height: 70px;"></textarea>
      </div>
      <div class="strings">
        Приватность
        <div>
          <input type="checkbox" class="checkbox__input activate" />
          Сделать профиль приватным
        </div>
      </div>
      <div class="strings">
        <div></div>
        <button
          class="button__input"
        >
          Сохранить
        </button>
      </div>
      <div class="strings__avatar">
        Аватарка
        <div class="picture__load__delete">
          <img src="../static/icons/avatar.png" alt="" class="avatar__image" />
          <div class="load__delete">
            <label class="text__decoration">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                class="image__input"
              />
              Загрузить
            </label>
            <a href="#" class="text__decoration">
              Удалить
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
