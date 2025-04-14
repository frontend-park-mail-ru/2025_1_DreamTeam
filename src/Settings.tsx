import { useState } from "./ourReact/jsx-runtime";
import {
  deletePhoto,
  getAuthorizedUser,
  updateProfile,
  uploadProfilePhoto,
} from "./api";
import { setUser, useUser } from "./App";
// TODO: Добавить валидатор у инпутов

type UpdateData = {
  name: string;
  email: string;
  bio: string;
  hide_email: boolean;
  avatar_src: string;
};

export function SettingHeader() {
  return (
    <header class="changes">
      <div class="headlines">Настройки</div>
      <div class="change-select">
        <button class="choose--type--button" style="width: 314px;">
          <img
            src="../static/icons/user_settings.svg"
            alt=""
            class="editing__icon"
          />
          Редактирование профиля
        </button>
        <button class="choose--type--button" style="width: 218px;">
          <img src="../static/icons/mail.svg" alt="" class="editing__icon" />
          Изменить почту
        </button>
        <button class="choose--type--button" style="width: 232px;">
          <img src="../static/icons/lock.svg" alt="" class="editing__icon" />
          Изменить пароль
        </button>
      </div>
    </header>
  );
}

export function SettingContent() {
  const [information, setInformation] = useState<UpdateData>({
    name: "",
    email: "",
    bio: "",
    hide_email: false,
    avatar_src: "",
  });

  const [isLoading, setLoading] = useState(true);
  console.log(information);
  if (isLoading) {
    const user = useUser();

    if (user === false) {
      console.error("Ошибка в setting");
      // ПРОВЕРИТЬ НА ПРОДЕ ЧТО РАБОТАЕТ КОРРЕКТНО
      // СНАЧАЛА ПОЛЬЗОВАТЕЛЬ НЕАВТОРИЗОВАН ПОТОМ ХЕДЕР МЕНЯЕТ СТАТУС И ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН
      return <div class="content dont-content">Не авторизован</div>;
    }

    setInformation(useUser() as UpdateData);
    setLoading(false);
  }

  console.log("rerenderSetting");
  if (isLoading) {
    return <div class="content">Загрузка</div>;
  }

  const save_data = () => {
    const user = useUser();
    if (user === false) {
      console.error("Ошибка в save_data");
      return;
    }
    updateProfile(
      "",
      information.bio,
      information.email,
      information.hide_email,
      information.name
    );
    setUser({
      name: information.name,
      email: information.email,
      bio: information.bio,
      avatar_src: user.avatar_src,
      hide_email: information.hide_email,
    });
  };

  function setInformationState(key: string, newFieldData: string | boolean) {
    setInformation({
      ...information,
      [key]: newFieldData,
    });
  }

  return (
    <div class="profile">
      <div class="strings">
        Ваше имя
        <input
          type="text"
          class="text__input"
          style="height: 39px;"
          id="name_input"
          value={information.name}
          ON_input={(event: { target: { value: string } }) => {
            setInformationState("name", event.target.value);
          }}
        />
      </div>
      <div class="strings">
        О себе
        <textarea
          class="text__input"
          style="height: 70px;"
          id="textarea_input"
          ON_input={(event: { target: { value: string } }) => {
            setInformationState("bio", event.target.value);
          }}
        >
          {information.bio}
        </textarea>
      </div>
      <div class="strings">
        Приватность
        <div>
          <input
            type="checkbox"
            class="checkbox__input"
            id="private_input"
            {...(information.hide_email ? { checked: true } : {})}
            ON_change={(event: { target: { checked: boolean } }) => {
              setInformationState("hide_email", event.target.checked);
            }}
          />
          Сделать профиль приватным
        </div>
      </div>
      <div class="strings">
        <div></div>
        <button class="button__input" id="button_input" ON_click={save_data}>
          Сохранить
        </button>
      </div>
      <div class="strings__avatar">
        Аватарка
        <div class="picture__load__delete">
          <img
            src={information.avatar_src}
            alt=""
            class="avatar__image"
            id="avatar_input"
          />
          <div class="load__delete">
            <form method="post" enctype="multipart/form-data">
              <label class="text__decoration">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  class="image__input"
                  id="new_avatar_input"
                  ON_change={async (event: { target: { files: File[] } }) => {
                    const result = await uploadProfilePhoto(
                      event.target.files[0]
                    );
                    const user = useUser();

                    if (user === false) {
                      console.error("Ошибка в setting");
                      return;
                    }

                    console.log("что скажешь", result);
                    if (typeof result !== "string") {
                      console.log("не повезло", result);
                      return;
                    }
                    // TODO: Когда у бека будет готово возвращение пути, добавить отрисовка.
                    setInformationState("avatar_src", result);
                    setUser({
                      name: user.name,
                      email: user.email,
                      bio: user.bio,
                      hide_email: user.hide_email,
                      avatar_src: result,
                    });
                  }}
                />
                Загрузить
              </label>
            </form>
            <a
              class="text__decoration"
              ON_click={() => {
                deletePhoto();
              }}
            >
              Удалить
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
