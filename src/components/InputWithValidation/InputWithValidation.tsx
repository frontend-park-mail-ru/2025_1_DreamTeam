// TODO: Чтобы рендер не сбивал фокус и при наведении на иконку ошибки сделать tooltrip

import { FieldState } from "@/WindowLogin";
import error from "public/static/icons/error.svg";
import "./InputWithValidation.css";

// Решить проблемы с перерисовкой всех элементов, даже если меняется один
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
      class={`field-input ${hidden ? "hidden" : ""} ${
        data.isValid.includes(false) ? "field-input__error" : ""
      }`}
    >
      <input
        class="field-input__input"
        type={type}
        placeholder={placeholder}
        value={data.value}
        ON_input={(e: KeyboardEvent) => {
          const target = e.target as HTMLInputElement;
          const resultValidate = onChanged(target.value);
          console.log("resultValidate", resultValidate);

          setData(keys, {
            value: target.value,
            isValid: resultValidate.isValid,
            errorMessage: resultValidate.errorMessage,
          });
          if (resultValidate.isValid.includes(false)) {
            console.log("error", target.value);
          }
        }}
      />
      {data.isValid.includes(false) ? <img class="icon" src={error} /> : ""}
    </div>
  );
}
