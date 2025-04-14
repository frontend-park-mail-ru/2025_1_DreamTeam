export default function ButtonMenu({
  name,
  image,
  click,
}: {
  name: string;
  image: string;
  click: Function;
}) {
  return (
    <div class="button_type_menu" ON_click={click}>
      <div class="button__text">{name}</div>
      <img src={image} alt="Войти" class="button__img"></img>
    </div>
  );
}
