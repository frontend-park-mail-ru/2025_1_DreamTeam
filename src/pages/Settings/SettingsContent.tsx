import { useState } from "@/ourReact/jsx-runtime";
import { deletePhoto, updateProfile, uploadProfilePhoto } from "@/api";
import { setUser, useUser } from "@/App";
import { UpdateData } from "@/types/users";

const SettingContent = () => {
  const [information, setInformation] = useState<UpdateData>({
    name: "",
    email: "",
    bio: "",
    hide_email: false,
    avatar_src: "",
  });
  console.log(information);
  const user = useUser();

  if (user === false) {
    console.error("Ошибка в setting");
    return <div class="content dont-content">Не авторизован</div>;
  }

  setInformation(useUser() as UpdateData);

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

export default SettingContent;
