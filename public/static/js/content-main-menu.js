import { fetch_data } from "./api.js";

// Если есть параметр, то вызов на ручку бека не происходит(для отладки)
export async function cards(data) {
    let courseData;

    if (data) {
        courseData = data;
    }
    else {
        courseData = await fetch_data();
    }

    const element = document.createElement("div");
    element.classList.add("cards");

    if (!courseData) {
        element.innerHTML = `
            <div class="dont-content">
                Нету курсов
            </div>
        `;

        return element;
    }

    courseData.forEach(course => {
        const course_card = card(course.time_to_pass, course.purchases_amount, course.title, course.price);
        element.appendChild(course_card);
    });
    return element;
};

function card(time_to_pass, purchases_amount, title, price) {
    const element = document.createElement("div");
    element.classList.add("card");
    element.innerHTML = `
        <div class="picture" style="background-image: url(./static/icons/picture-test.png);">
            <div class="descriptions">
                <div class="description">
                    <img src="./static/icons/time.svg" alt="" class="description__icon">
                    ${time_to_pass} ч
                </div>
                <div class="heart">
                    <img src="./static/icons/heart.svg" alt="" class="heart__img">
                </div>
            </div>
            <div class="descriptions">
                <div class="description">
                    <img src="./static/icons/user.svg" alt="" class="description__icon">
                    ${purchases_amount}
                </div>
            </div>
        </div>
        <div class="name">
            ${title}
        </div>
        <div class="rating-and-price">
            <div class="rating">
                <img src="./static/icons/star.svg" alt="" class="rating__star full">
                <img src="./static/icons/star.svg" alt="" class="rating__star full">
                <img src="./static/icons/star.svg" alt="" class="rating__star full">
                <img src="./static/icons/star.svg" alt="" class="rating__star full">
                <img src="./static/icons/star.svg" alt="" class="rating__star">
            </div>
            <div class="rating-and-price__price">
                ${price} ₽
            </div>
        </div>
    `;

    return element;
}

export function filter_main() {
    const element = document.createElement("div");
    element.classList.add("filters");
    element.innerHTML = `
        <div class="headlines">Каталог</div>
        <div class="filter-select">
            <div class="filter--type--selector">
                Какое направление?
                <img src="./static/icons/arrow-down.svg" alt="" class="filter__icon">
            </div>
            <div class="filter--type--selector">
                Что изучать?
                <img src="./static/icons/arrow-down.svg" alt="" class="filter__icon">
            </div>
            <div class="filter--type--selector">
                Какая цель?
                <img src="./static/icons/arrow-down.svg" alt="" class="filter__icon">
            </div>
            <div class="filter--type--button">
                <img src="./static/icons/filter.svg" alt="" class="filter__icon">
                Фильтры
            </div>
        </div>
    `;

    return element;
}