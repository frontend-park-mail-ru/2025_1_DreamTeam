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
    <div></div>
  ) : (
    <button class="page--choose" ON_click={onClick}>
      {type}
    </button>
  );
};

export default PageButton;
