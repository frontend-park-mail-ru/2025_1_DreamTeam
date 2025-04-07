import { useState } from "./ourReact/jsx-runtime";
import { getAuthorizedUser, updateProfile, uploadProfilePhoto } from "./api";
// TODO: Добавить валидатор у инпутов
import Validate from "./validate";

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
    getAuthorizedUser().then((result) => {
      setInformation(result);
      setLoading(false);
    });
  }

  if (isLoading) {
    console.log("loading");
    return <div>Загрузка</div>;
  }

  const save_data = () => {
    updateProfile(
      "",
      information.bio,
      information.email,
      information.hide_email,
      information.name
    );
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
                  ON_change={(event: { target: { files: File[] } }) => {
                    console.log(event.target.files[0]);
                    const result = uploadProfilePhoto(event.target.files[0]);
                    // TODO: Когда у бека будет готово возвращение пути, добавить отрисовка.
                    // setInformationState("avatar_src", result);
                    result;
                  }}
                />
                Загрузить
              </label>
            </form>
            <a class="text__decoration" ON_click={deletePhoto}>
              Удалить
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function deletePhoto() {}
