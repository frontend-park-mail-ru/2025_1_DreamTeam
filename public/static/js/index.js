import { header, line } from './header.js';
import { cards, filterMain } from './content-main-menu.js';
import { handlerButtonMenu } from './header.js';

export async function rerender() {
  const mainHeader = document.getElementById('head');
  const content = document.getElementById('app');

  const headerElement = await header(false);
  const lineElement = line();
  const filterElement = filterMain();
  const cardsElement = await cards();

  app.innerHTML = '';

  mainHeader.appendChild(headerElement);
  mainHeader.appendChild(lineElement);
  mainHeader.appendChild(filterElement);
  content.appendChild(cardsElement);

  // Функция для накладывания логики на кнопки с меню
  handlerButtonMenu();
}

rerender();