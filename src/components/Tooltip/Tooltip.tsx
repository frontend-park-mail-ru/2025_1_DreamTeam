import styles from "./Tooltip.module.scss";
import error from "Public/static/icons/error.svg";

export const Tooltip = ({
  texts,
  isValid,
}: {
  texts: string[];
  isValid: boolean[];
}) => {
  return (
    <div class={styles.tooltipContainer}>
      <img class={styles.icon} src={error} />
      <div class={styles.tooltipContent}>
        {texts.map((text, i) => (
          <div
            class={styles.text}
            style={`color: ${isValid[i] ? "#B7B5B7" : "#FF6969"}`}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};
