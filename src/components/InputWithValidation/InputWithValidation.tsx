import { FieldState } from "@/types/WindowLogin";
import Tooltip from "@/components/Tooltip";
import styles from "./InputWithValidation.module.scss";

export default function InputWithValidation(props: {
  type: string;
  keys: string;
  placeholder: string;
  hidden: boolean;
  onChanged?: (newValue: string) => {
    isValid: boolean[];
    errorMessage: string[];
  };
  data: FieldState;
  setData: (key: string, newFieldData: FieldState) => void;
}) {
  const {
    type,
    keys,
    placeholder,
    hidden,
    onChanged = () => {
      return { isValid: [], errorMessage: [] };
    },
    data,
    setData,
  } = props;
  return (
    <div
      class={`${styles.fieldInput} ${hidden ? styles.hidden : ""} ${
        data.isValid.includes(false) ? styles.fieldInput__error : ""
      }`}
    >
      <input
        class={styles.fieldInput__input}
        type={type}
        placeholder={placeholder}
        value={data.value}
        ON_input={(e: KeyboardEvent) => {
          const target = e.target as HTMLInputElement;
          const resultValidate = onChanged(target.value);

          setData(keys, {
            value: target.value,
            isValid: resultValidate.isValid,
            errorMessage: resultValidate.errorMessage,
          });
          if (resultValidate.isValid.includes(false)) {
          }
        }}
      />
      {data.isValid.includes(false) ? (
        <Tooltip
          key={`tooltip-${type}`}
          texts={data.errorMessage}
          isValid={data.isValid}
        />
      ) : (
        ""
      )}
    </div>
  );
}
