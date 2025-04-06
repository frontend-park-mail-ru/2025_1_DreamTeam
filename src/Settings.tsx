import { useState } from "./ourReact/jsx-runtime";
import { getAuthorizedUser, updateProfile, uploadProfilePhoto } from "./api";
import Validate from "./validate";

type UpdateData = {
  name: string;
  email: string;
  bio: string;
  private: boolean;
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
    private: false,
    avatar_src: "",
  });
  const [isLoading, setLoading] = useState(true);

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
      information.private,
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
            checked={information.private}
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
                    uploadProfilePhoto(event.target.files[0]);
                    setInformationState("avatar_src", event.target.files[0]);
                    }}
                />
                Загрузить
              </label>
            </form>
            <a class="text__decoration" onclick={delete_photo}>
              Удалить
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO:Перенесу в API
// const ip = 'http://217.16.21.64';
// const port = '8080';
// const username = `${ip}:${port}/api/isAuthorized`;
// const update_url = `${ip}:${port}/api/updateProfile`;
// const photo_url = `${ip}:${port}/api/updateProfilePhoto`;

// // Событие для загрузки фотки
// avatar.addEventListener('change', (event) => {
//     event.preventDefault();
//     const file = event.target.files[0];
//     if (file) {
//         uploadProfilePhoto(file);
//     }
// });

// //Дима и Ваня скоро напишут на delete photo ручку
// const delete_photo = () => {
//     uploadProfilePhoto("");
// }
