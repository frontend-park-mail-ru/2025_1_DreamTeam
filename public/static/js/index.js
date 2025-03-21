import { header, line } from "./header.js";
import { cards, filter_main } from "./content-main-menu.js";
import { handler_button_menu } from "./header.js";

export async function rerender() {
  const main_header = document.getElementById("head");
  const content = document.getElementById("app");

  const header_element = await header(false);
  const line_element = line();
  const filter_element = filter_main();
  const cards_element = await cards();

  app.innerHTML = '';

  main_header.appendChild(header_element);
  main_header.appendChild(line_element);
  main_header.appendChild(filter_element);
  content.appendChild(cards_element);

  // Функция для накладывания логики на кнопки с меню
  handler_button_menu();
}

rerender();