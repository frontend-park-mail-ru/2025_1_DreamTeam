const ip = "http://127.0.0.1";
const port = "9000";
const ip_port = `${ip}:${port}/api/getCourses`;

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
const template_window_login = Handlebars.templates[''];

const rerender = (data) => {
  const context = { course: data, count_courses: data.length };
  const htmlString = template_card(context);
  document.getElementById("app").innerHTML = htmlString;

  const avatar = document.getElementById("avatar");

  // Обработчик открытия меню
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
          rerender(data);
        });
      };

      // Обработчик закрытия меню
      const closeButton = document.getElementById("button-close-menu");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          const htmlString = template_login();
          document.getElementById("menu").innerHTML = htmlString;
          rerender(data);
        });
      }
    });
  }
};

async function initialize() {
  const data = await fetchData();
  rerender(data);
}

initialize();
