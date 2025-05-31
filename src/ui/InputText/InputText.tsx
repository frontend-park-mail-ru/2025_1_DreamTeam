import styles from "./InputText.module.scss";

const InputText = ({
  placeholder,
  type = "text",
  value,
  onInput,
}: {
  placeholder?: string;
  value?: string;
  type?: "text" | "number";
  onInput: (e: any) => void;
}) => {
  return (
    <div class={styles.fieldInput}>
      <input
        type={type}
        class={styles.fieldInput__input}
        placeholder={placeholder}
        value={value}
        ON_input={onInput}
      />
    </div>
  );
};

export default InputText;
