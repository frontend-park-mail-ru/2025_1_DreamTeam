export default function ButtonFilter({
  name,
  image,
  onClick,
}: {
  name: string;
  image: string;
  onClick: Function;
}) {
  return (
    <div class="filter--type--selector" ON_click={onClick}>
      {name}
      <img src={image} alt="" class="filter__icon"></img>
    </div>
  );
}
