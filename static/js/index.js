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

const template = Handlebars.templates['card.hbs']; 

const rerender = () => {
  
  const context = { course: data, countCourses: data.length };

  const htmlString = template(context);

  document.getElementById("app").insertAdjacentHTML("beforeend", htmlString);
};

rerender();