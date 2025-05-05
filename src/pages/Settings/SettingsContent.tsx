import { useState } from "@/ourReact/jsx-runtime";
import { deletePhoto, updateProfile, uploadProfilePhoto } from "@/api";
import { setUser, useUser } from "@/stores";
import { UpdateData } from "@/types/users";
import addToast from "@/components/WindowALert/logic/add";
import styles from "./Settings.module.scss";

const SettingContent = () => {
  const user = useUser();
  if (!user) {
    console.log(user);
    return <div class="content dont-content">Не авторизован</div>;
  }
  const [information, setInformation] = useState<UpdateData>({
    name: user.name,
    email: user.email,
    bio: user.bio,
    hide_email: user.hide_email,
    avatar_src: user.avatar_src,
  });

  console.log(information);
  console.log(user);

  const save_data = () => {
    console.log(information);
    if (!user) {
      console.log(user);
      addToast("error", "Отсутствует авторизация");
      return <div class="content dont-content">Не авторизован</div>;
    }
    updateProfile(
      user.avatar_src,
      information.bio,
      user.email,
      information.hide_email,
      information.name
    );
    addToast("success", "Успешное сохранение");
    return true;
  };
  setUser({
    name: information.name,
    email: information.email,
    bio: information.bio,
    hide_email: information.hide_email,
    avatar_src: information.avatar_src,
  });

  function setInformationState(key: string, newFieldData: string | boolean) {
    setInformation({
      ...information,
      [key]: newFieldData,
    });
  }

  return (
    <div class={styles.content}>
      <div class={styles.profile}>
        <div class={styles.strings}>
          Ваше имя
          <input
            type="text"
            class={styles.text__input}
            style="height: 39px;"
            id="name_input"
            value={user.name}
            ON_input={(event: { target: { value: string } }) => {
              setInformationState("name", event.target.value);
            }}
          />
        </div>
        <div class={styles.strings}>
          О себе
          <textarea
            class={styles.text__input}
            style="height: 70px;"
            id="textarea_input"
            ON_input={(event: { target: { value: string } }) => {
              setInformationState("bio", event.target.value);
            }}
          >
            {user.bio}
          </textarea>
        </div>
        <div class={styles.strings}>
          Приватность
          <div>
            <input
              type="checkbox"
              class={styles.checkbox__input}
              id="private_input"
              {...(user.hide_email ? { checked: true } : {})}
              ON_change={(event: { target: { checked: boolean } }) => {
                setInformationState("hide_email", event.target.checked);
              }}
            />
            Не отправлять письма на почту
          </div>
        </div>
        <div class={styles.strings}>
          <div></div>
          <button
            class={styles.button__input}
            id="button_input"
            ON_click={() => {
              save_data();
            }}
          >
            Сохранить
          </button>
        </div>
        <div class={styles.strings__avatar}>
          Аватарка
          <div class={styles.picture__load__delete}>
            <img
              src={information.avatar_src}
              alt=""
              class={styles.avatar__image}
            />
            <div class={styles.load__delete}>
              <form method="post" enctype="multipart/form-data">
                <label class="text__decoration">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    class={styles.image__input}
                    id="new_avatar_input"
                    ON_change={async (event: { target: { files: File[] } }) => {
                      if (
                        !event.target.files ||
                        event.target.files.length === 0
                      ) {
                        addToast("error", "Файл не выбран");
                        return;
                      }

                      const validTypes = [
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                      ];

                      if (!validTypes.includes(event.target.files[0].type)) {
                        addToast(
                          "error",
                          "Неверный формат файла. Разрешены: JPG, JPEG, PNG, WEBP"
                        );
                        return;
                      }
                      const result = await uploadProfilePhoto(
                        event.target.files[0]
                      );
                      const user = useUser();

                      if (user === false) {
                        addToast("error", "Ошибка авторизации");
                        return;
                      }

                      if (typeof result !== "string") {
                        addToast("error", "Ошибка загрузки фото");
                        return;
                      }

                      setUser({
                        name: user.name,
                        email: user.email,
                        bio: user.bio,
                        hide_email: user.hide_email,
                        avatar_src: result,
                      });
                      setInformationState("avatar_src", result);
                      addToast("success", "Фотография успешно сохранена");
                    }}
                  />
                  Загрузить
                </label>
              </form>
              <a
                class={styles.text__decoration}
                ON_click={() => {
                  deletePhoto();
                  setUser({
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                    hide_email: user.hide_email,
                    avatar_src:
                      "http://217.16.21.64:8006/avatars/default_avatar.png",
                  });
                  setInformationState(
                    "avatar_src",
                    "http://217.16.21.64:8006/avatars/default_avatar.png"
                  );
                  addToast("success", "Фотография успешно удалена");
                }}
              >
                Удалить
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingContent;
