import { useState } from "./ourReact/jsx-runtime";


export function SettingHeader() {
//   const [data, setData] = useState("");

  return (
    <header class="changes">
        <div class="headlines">Тигр Гордый</div>
        <div class="change-select">
            <button class="choose--type--button" style="width: 314px;">
                <img src="../static/icons/user_settings.svg" alt="" class="editing__icon" />
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
//   const [data, setData] = useState("");
    const information = {
        name: 'tiger',
        bio: 'О себе',
        private: false
    }

  return (
    <div class="profile">
        <div class="strings">
            Ваше имя
            <input type="text" class="text__input" style="height: 39px;" id="name_input" value={information.name} />
        </div>
        <div class="strings">
            О себе
            <textarea class="text__input" style="height: 70px;" id="textarea_input">{information.bio}</textarea>
        </div>
        <div class="strings">
            Приватность
            <div>
                <input type="checkbox" class="checkbox__input" id="private_input" checked={information.private} />
                Сделать профиль приватным
            </div>
        </div>
        <div class="strings">
            <div></div>
            <button class="button__input" id="button_input" onclick="{save_data()}">Сохранить</button>
        </div>
        <div class="strings__avatar">
            Аватарка
            <div class="picture__load__delete">
                <img src="../static/icons/avatar.png" alt="" class="avatar__image" id="avatar_input" />
                <div class="load__delete">
                    <form method="post" enctype="multipart/form-data">
                        <label class="text__decoration"><input type="file" accept=".jpg, .jpeg, .png" class="image__input" id="new_avatar_input" />Загрузить</label>
                    </form>
                    <a class="text__decoration" onclick="delete_photo()">Удалить</a>
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

// const updateProfile = async (bio, email, hide_email, name) => {
//     const data = {
//         bio: bio,
//         email: email,
//         hide_email: hide_email,
//         name: name
//     };

//     try {
//         const response = await fetch(update_url, {
//             credentials: "include",
//             method: 'POST', // Метод запроса
//             headers: {
//                 'Content-Type': 'application/json', // Указываем тип содержимого
//             },
//             body: JSON.stringify(data), // Преобразуем объект в JSON строку
//         });


//         const result = await response.json(); // Парсим ответ как JSON
//         if (response.ok) {
//             return true;
//         }
//         alert('Данные некорректные');
//         return false;
//     } catch (error) {
//         console.error('Error updating profile:', error); // Обработка ошибок
//     }
// }

// const uploadProfilePhoto = async (file) => {
//     const formData = new FormData();
//     console.log(file);

//     formData.append('avatar', file);

//     const jsonData = JSON.stringify({ avatar: file.name});
//     formData.append('data', jsonData);

//     try {
//     const response = await fetch(photo_url, {
//         method: 'POST',
//         body: formData,
//         credentials: "include"
//     });
//     const responseData = await response.json();
//     if (responseData){
//         getAuthorizedUser().then(result => {
//             set_avatar.src = result['user']['avatar_src'];
//         })
//     }
//     } catch (error) {
//     console.error('Ошибка при загрузке фото', error);
//     }
// }

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

// // обновляет данные по нажатию кнопки class button__input
// const save_data = () => {
//     getAuthorizedUser().then(result => {
//         console.log(private.checked);
//         updateProfile(bio.value, result['user']['email'], private.checked, name.value);
//     })
// }

// // Вставляет текст в поля + приват чек

// const info_profile = () => {
//     getAuthorizedUser().then(result => {
//         name.value = result['user']['name'];
//         bio.value = result['user']['bio'];
//         if (result['user']['hide_email']) {
//             private.checked = true;
//         } else {
//             private.checked = false;
//         }
//         set_avatar.src = result['user']['avatar_src'];
//     })
// }
