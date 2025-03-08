const data = [
  {
    'price': 100,
    "purchases_amount": 0,
    "creator_id": 1,
    "time_to_pass": 30,
    "title": "Intro to Programming",
    "description": "Learn the basics of programming.",
  },
  {
    "price": 150,
    "purchases_amount": 0,
    "creator_id": 2,
    "time_to_pass": 45,
    "title": "Data Science Fundamentals",
    "description": "A beginner-friendly introduction to data",
  }
]

const template_card = Handlebars.templates['card.hbs'];
const template_menu = Handlebars.templates['menu.hbs'];
const template_login = Handlebars.templates['login-account.hbs'];

const rerender = () => {

  const context = { course: data, count_courses: data.length };

  const htmlString = template_card(context);

  document.getElementById("app").innerHTML = htmlString;

  const avatar = document.getElementById("avatar");

  // Обработчик открытия меню
  if( avatar ) {
    avatar.addEventListener("click", () => {
      const htmlString = template_menu();
      document.getElementById("menu").innerHTML = htmlString;

      // Обработчик закрытия меню(накладывается сразу после открытия)
      document.getElementById("button-close-menu").addEventListener("click", () => {
        const htmlString = template_login();
        document.getElementById("menu").innerHTML = htmlString;
        rerender();
      });
    });
  }
};

rerender();