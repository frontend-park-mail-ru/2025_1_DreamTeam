const ip = 'http://217.16.21.64';
const port = '8080';
const ip_port = `${ip}:${port}/api/getCourses`;
const username = `${ip}:${port}/api/isAuthorized`;
const register_url = `${ip}:${port}/api/register`;
const login_url = `${ip}:${port}/api/login`;
const logout = `${ip}:${port}/api/logout`;

/**
 * Проверяет авторизацию пользователя
 * @returns {Promise<string|boolean>} Возвращает им я пользователя или false, если пользователь не авторизован
 */
async function check_auth() {
  try {
    const response = await fetch(username, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok && !data.error) {
      console.log('✅ Пользователь авторизован');
      return data.user.name;
    } else {
      console.log('❌ Пользователь НЕ авторизован');
      return false;
    }
  } catch (error) {
    console.error('Ошибка проверки авторизации:', error);
    document.getElementById('menu').innerHTML = template_login();
    return false;
  }
}

/**
 * Запрашивает данные курсов
 * @returns {Promise<Array>} Возвращает массив курсов или пустой массив в случае ошибки
 */
async function fetch_data() {
  try {
    const response = await fetch(ip_port);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    console.log('Данные:', data);
    return data.bucket_courses || [];
  } catch (error) {
    console.error('Ошибка запроса:', error);
    return [];
  }
}

/**
 * Выполняет выход пользователя
 * @returns {Promise<boolean>} Возвращает true в случае успеха, иначе false
 */
async function fetch_logout() {
  try {
    const response = await fetch(logout, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Ошибка выхода: ${response.status}`);
    }

    console.log('✅ Успешный выход');
    return true;
  } catch (error) {
    console.error('Ошибка запроса:', error);
    return [];
  }
}

/**
 * Очищает поля формы и устанавливает сообщение об ошибке.
 * @param {string} errorInput - Текст ошибки.
 * @param {string} emailInput - Значение поля email.
 * @param {string} nameInput - Значение поля имени.
 * @param {string} passwordInput - Значение поля пароля.
 * @param {string} password_admitInput - Значение поля подтверждения пароля.
 */
let emptyInput = (errorInput, emailInput, nameInput, passwordInput, password_admitInput) => {
  document.getElementById('error').innerText = errorInput;
  console.log('clear error');
  document.getElementById('email').value = emailInput;
  document.getElementById('name').value = nameInput;
  document.getElementById('password').value = passwordInput;
  document.getElementById('password_admit').value = password_admitInput;
};

/**
 * Изменяет цвет ошибок для полей формы.
 * @param {string} errorInput - Цвет ошибки.
 * @param {string} emailInput - Стиль границы email.
 * @param {string} passwordInput - Стиль границы пароля.
 * @param {string} password_admitInput - Стиль границы подтверждения пароля.
 */
let errorColor = (errorInput, emailInput, passwordInput, password_admitInput) => {
  document.getElementById('error').style.color = errorInput;
  document.getElementById('email').style.border = emailInput;
  document.getElementById('password').style.border = passwordInput;
  document.getElementById('password_admit').style.border = password_admitInput;
};

/**
 * Проверяет соответствие паролей и их длину.
 * @returns {boolean} Возвращает true, если пароли соответствуют требованиям, иначе false.
 */
let check_password = () => {
  if (document.getElementById('password').value !== document.getElementById('password_admit').value) {
    document.getElementById('error').style.color = '#CC0202';
    emptyInput('Пароли не совпадают', document.getElementById('email').value, document.getElementById('name').value, '', '');
    errorColor('none', 'none', 'none', '2px solid #CC0202');
    return false;
  }

  if (document.getElementById('password').value.length < 8 || document.getElementById('password').value.length > 32) {
    //        if (falseSymbols.test(document.getElementById("password").value)){
    //            document.getElementById("error").innerText = 'Пароль не должен содержать символы !@#$%^&*+`;<>!';
    //            emptyInput('Пароль должен содержать символы !@#$%^&*+`;<>!', document.getElementById("email").value, name.value, '', '');
    //            return false;
    //        }
    emptyInput('Пароль должен содержать от 8 до 32 символов!', document.getElementById('email').value, document.getElementById('name').value, '', '');
    errorColor('none', 'none', '2px solid #CC0202', '2px solid #CC0202');
    return false;
  }
  document.getElementById('error').innerText = '';
  return true;
};

/**
 * Логика отправки запроса при нажатии кнопки регистрации.
 */
let btn_registration = () => {
  //    infoIcon(password);
  if (check_password()) {
    console.log('check');
    document.getElementById('error').innerText = '';
    register_user(document.getElementById('email').value, document.getElementById('name').value, document.getElementById('password').value);
  }
};

/**
 * Логика отправки запроса при нажатии кнопки авторизации.
 */
let btn_authorization = () => {
  login_user(document.getElementById('email').value, document.getElementById('password').value);
};

/**
 * Отправляет данные пользователя для регистрации.
 * @param {string} mail - Email пользователя.
 * @param {string} name - Имя пользователя.
 * @param {string} password - Пароль пользователя.
 */
async function register_user(mail, name, password) {
  const user_data = {
    email: mail,
    name: name,
    password: password
  };

  try {
    const response = await fetch(register_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user_data),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('error').innerText = 'Пользователь успешно зарегистрирован';
      errorColor('white', 'none', 'none', 'none');
      const is_authenticated = await check_auth();
      const courses = await fetch_data();
      rerender(courses, is_authenticated);
    } else {
      if (response.status == 404) {
        document.getElementById('error').innerText = 'Пользователь уже существует';
      } else if (response.status == 400) {
        document.getElementById('error').innerText = 'Неправильный формат почта';
      } else if (response.status == 405) {
        document.getElementById('error').innerText = 'Метод недоступен';
      } else {
        document.getElementById('error').innerText = data.error;
      }
      errorColor('#CC0202', '2px solid #CC0202', 'none', 'none');
    }
  } catch (err) {
    console.error('Ошибка проверки авторизации:', err);
    document.getElementById('error').style.color = '#CC0202';
  }
}

/**
 * Отправляет данные пользователя для авторизации.
 * @param {string} mail - Email пользователя.
 * @param {string} passwordInput - Пароль пользователя.
 */
async function login_user (mail, passwordInput) {
const login_data = {
  email: mail,
  password: passwordInput
};

  try {
    const response = await fetch(login_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(login_data),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('error').innerText = 'Успешный вход';
      errorColor('white', 'none', 'none', 'none');
      const username = await check_auth();
      const courses = await fetch_data();
      rerender(courses, username);
    } else {
      if (response.status == 404) {
        document.getElementById('error').innerText = 'Неверные почта или пароль';
      } else if (response.status == 400) {
        document.getElementById('error').innerText = 'Некорректные почта или пароль';
      } else {
        document.getElementById('error').innerText = data.error;
      }
      errorColor('#CC0202', '2px solid #CC0202', '2px solid #CC0202', 'none');

    }
  } catch (err) {
    document.getElementById('error').innerText = 'Ошибка сети', err;
    document.getElementById('error').style.color = '#CC0202';
  }
};

/**
 * Шаблоны Handlebars для рендеринга интерфейса
 */
const template_card = Handlebars.templates['card.hbs'];
const template_menu = Handlebars.templates['menu.hbs'];
const template_login = Handlebars.templates['login-account.hbs'];
const template_logout = Handlebars.templates['logout.hbs'];
const template_window_login = Handlebars.templates['window-login.hbs'];

/**
 * Перерисовывает интерфейс на основе данных и статуса пользователя
 * @param {Array} data - Список курсов
 * @param {string | boolean} username - Имя пользователя или false, если не авторизован
 */
const rerender = (data, username) => {
  const context = { course: data, count_courses: data.length };
  const htmlString = template_card(context);
  document.getElementById('app').innerHTML = htmlString;
  console.log(username);
  // Проверка авторизации и рендеринг
  if (username) {
    const htmlString = template_login();
    document.getElementById('menu').innerHTML = htmlString;
    if (document.getElementById('window')) {
      document.getElementById('blur').innerHTML = '';
    }
  } else {
    const htmlString = template_logout();
    document.getElementById('menu').innerHTML = htmlString;
  }

  const search = document.getElementById('search');
  if (search) {
    document.getElementById('search').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        // searchFunction();
      }
    });
  }

  // Обработчик входа в аккаунт
  const login = document.getElementById('button-login');
  if (login) {
    login.addEventListener('click', () => {
      const htmlString = template_window_login();

      document.getElementById('blur').innerHTML = htmlString;

      document.getElementById('blur').addEventListener('click', () => {
        document.getElementById('blur').innerHTML = '';
      });

      const window_element = document.getElementById('window');
      if (window_element) {
        window_element.addEventListener('click', (event) => {
          event.stopPropagation();
        });
      }

      const signup = document.getElementById('sign-up');
      const login = document.getElementById('log-in');

      if (login && signup) {
        login.addEventListener('click', () => {
          if (!login.classList.contains('active')) {
            console.log('debug: mode login');
            emptyInput('', '', '', '', '');
            errorColor('white', 'none', 'none', 'none');
            login.classList.add('active');
            signup.classList.remove('active');
            document.getElementById('name').classList.add('hidden');
            document.getElementById('password_admit').classList.add('hidden');
          } else {
            btn_authorization();
          }
        });

        signup.addEventListener('click', () => {
          if (!signup.classList.contains('active')) {
            console.log('debug: mode signup');
            emptyInput('', '', '', '', '');
            errorColor('white', 'none', 'none', 'none');
            signup.classList.add('active');
            login.classList.remove('active');
            document.getElementById('name').classList.remove('hidden');
            document.getElementById('password_admit').classList.remove('hidden');
          } else {
            btn_registration();
          }
        });
        document.getElementById('password').addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();

            const loginTab = document.getElementById('log-in');

            if (loginTab && loginTab.classList.contains('active')) {
              btn_authorization();
            }
          }
        });

        document.getElementById('password_admit')?.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            btn_registration();
          }
        });
      }
    });
  }

  // Обработчик открытия меню
  const avatar = document.getElementById('avatar');
  if (avatar) {
    avatar.addEventListener('click', () => {
      const htmlString = template_menu();
      document.getElementById('menu').innerHTML = htmlString;

      // Обработчик выхода из аккаунта
      const logout = document.getElementById('button-logout');
      if (logout) {
        logout.addEventListener('click', async () => {
          await fetch_logout();
          const htmlString = template_logout();
          document.getElementById('menu').innerHTML = htmlString;
          rerender(data, false);
        });
      };

      // Обработчик закрытия меню
      const close_button = document.getElementById('button-close-menu');
      if (close_button) {
        close_button.addEventListener('click', () => {
          const htmlString = template_login();
          document.getElementById('menu').innerHTML = htmlString;
          rerender(data, username);
        });
      }
    });
  }
};

/**
 * Инициализация приложения: загрузка данных и рендеринг
 */
async function initialize() {
  const [username, data] = await Promise.all([check_auth(), fetch_data()]);
  rerender(data, username);
}

initialize();
