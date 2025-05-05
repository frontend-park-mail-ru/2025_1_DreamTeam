import styles from "./ButtonMenu.module.scss";

const ButtonMenu = ({
  name,
  image,
  click,
}: {
  name: string;
  image: string;
  click: Function;
}) => {
  return (
    <div class={styles.buttonTypeMenu} ON_click={click}>
      <div class={styles.buttonText}>{name}</div>
      <img src={image} alt="Войти" class={styles.buttonImg} />
    </div>
  );
};

export default ButtonMenu;
