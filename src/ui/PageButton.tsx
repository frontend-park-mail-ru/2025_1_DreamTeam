const PageButton = ({
  page_id,
  type,
  onClick,
}: {
  page_id: number;
  type: string;
  onClick: Function;
}) => {
  return page_id.toString() === "-1" ? (
    <button class="page--choose" ON_click={onClick} disabled>
      <label>{type}</label>
    </button>
  ) : (
    <button class="page--choose" ON_click={onClick}>
      <label>{type}</label>
    </button>
  );
}

export default PageButton;