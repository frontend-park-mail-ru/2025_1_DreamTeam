import styles from "./InputAreaText.module.scss";

const InputAreaText = ({
  placeholder,
  value,
  onInput,
}: {
  placeholder?: string;
  value?: string;
  onInput: (e: any) => void;
}) => {
  return (
    <div class={styles.fieldInput}>
      <textarea
        class={styles.fieldInput__input}
        placeholder={placeholder}
        value={value}
        ON_input={onInput}
      />
    </div>
  );
};

export default InputAreaText;
