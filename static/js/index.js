const ip = "http://217.16.21.64";
const port = "8080";
const ip_port = `${ip}:${port}/api/getCourses`;
const is_authorized = `${ip}:${port}/api/isAuthorized`

async function checkAuth() {
  try {
    const response = await fetch(is_authorized, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok && !data.error) {
      console.log("✅ Пользователь авторизован");
      return true;
    } else {
      console.log("❌ Пользователь НЕ авторизован");
      return false;
    }
  } catch (error) {
    console.error("Ошибка проверки авторизации:", error);
    document.getElementById("menu").innerHTML = template_login();
    return false;
  }
}

async function fetchData() {
  try {
    const response = await fetch(ip_port);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    console.log("Данные:", data);
    return data.bucket_courses || [];
  } catch (error) {
    console.error("Ошибка запроса:", error);
    return [];
  }
}

const template_card = Handlebars.templates['card.hbs'];
const template_menu = Handlebars.templates['menu.hbs'];
const template_login = Handlebars.templates['login-account.hbs'];
const template_logout = Handlebars.templates['logout.hbs'];
const template_window_login = Handlebars.templates['window-login.hbs'];

const rerender = (data, is_authorized) => {
  const context = { course: data, count_courses: data.length };
  const htmlString = template_card(context);
  document.getElementById("app").innerHTML = htmlString;

  // Проверка авторизации и рендеринг
  if (is_authorized) {
    const htmlString = template_login();
    document.getElementById("menu").innerHTML = htmlString;
  } else {
    const htmlString = template_logout();
    document.getElementById("menu").innerHTML = htmlString;
  }

  // Обработчик входа в аккаунт
  const login = document.getElementById("button-login");
  if (login) {
    login.addEventListener("click", () => {
      const htmlString = template_window_login();
      document.getElementById("blur").innerHTML = htmlString;

      document.getElementById("blur").addEventListener("click", () => {
        document.getElementById("blur").innerHTML = "";
      });

      const window_element = document.getElementById("window");
      if (window_element) {
        window_element.addEventListener("click", (event) => {
          event.stopPropagation();
        });
      }

      const signup = document.getElementById("sign-up");
      const login = document.getElementById("log-in");

      if (login && signup) {
        login.addEventListener("click", () => {
          if (!login.classList.contains("active")) {
            login.classList.add("active");
            signup.classList.remove("active");
          }
        })

        signup.addEventListener("click", () => {
          if (!signup.classList.contains("active")) {
            signup.classList.add("active");
            login.classList.remove("active");
          }
        })
      }
    });
  }

  // Обработчик открытия меню
  const avatar = document.getElementById("avatar");
  if (avatar) {
    avatar.addEventListener("click", () => {
      const htmlString = template_menu();
      document.getElementById("menu").innerHTML = htmlString;

      // Обработчик выхода из аккаунта
      const logout = document.getElementById("button-logout");
      if (logout) {
        logout.addEventListener("click", () => {
          const htmlString = template_logout();
          document.getElementById("menu").innerHTML = htmlString;
          rerender(data, false);
        });
      };

      // Обработчик закрытия меню
      const close_button = document.getElementById("button-close-menu");
      if (close_button) {
        close_button.addEventListener("click", () => {
          const htmlString = template_login();
          document.getElementById("menu").innerHTML = htmlString;
          rerender(data, true);
        });
      }
    });
  }
};

async function initialize() {
  const [is_authenticated, data] = await Promise.all([checkAuth(), fetchData()]);
  rerender(data, is_authenticated);
}

initialize();