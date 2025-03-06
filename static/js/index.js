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
  const templateSource = `
{{#if countCourses}}
  <div class="cards">
  {{#each course}}
    <div class="card">
      <div class="picture" style="background-image: url(../static/icons/pictureTest.png);">
        <div class="descriptions">
          <div class="description">
            <img src="../static/icons/time.svg" alt="" class="description__icon">
            {{ time_to_pass }} ч
          </div>
          <div class="heart">
            <img src="../static/icons/heart.svg" alt="" class="heart__img">
          </div>
        </div>
        <div class="descriptions">
          <div class="description">
            <img src="../static/icons/user.svg" alt="" class="description__icon">
            {{ purchases_amount }}
          </div>
        </div>
      </div>
      <div class="name">
        {{ title }}
      </div>
      <div class="raiting-and-price">
        <div class="raiting">
          <img src="../static/icons/star.svg" alt="" class="raiting__star full">
          <img src="../static/icons/star.svg" alt="" class="raiting__star full">
          <img src="../static/icons/star.svg" alt="" class="raiting__star full">
          <img src="../static/icons/star.svg" alt="" class="raiting__star full">
          <img src="../static/icons/star.svg" alt="" class="raiting__star">
        </div>
        <div class="raiting-and-price__price">{{ price }} ₽</div>
      </div>
    </div>
  {{/each}}
  </div>
{{else}}
  <div class="dont-content">
  Нету курсов
  </div>
  {{/if}}
`;

const template = Handlebars.compile(templateSource);

const rerender = () => {
  
  const context = { course: data, countCourses: data.length };

  const htmlString = template(context);

  document.getElementById("app").insertAdjacentHTML("beforeend", htmlString);
};

rerender();