import { useState } from "./ourReact/jsx-runtime";
import Validate from "./Validate";

interface FieldState {
  value: string;
  isValid: boolean[];
  errorMessage: string[];
}

type FormData = {
  emailField: FieldState;
  nameField: FieldState;
  passwordField: FieldState;
  passwordAdmitField: FieldState;
  [key: string]: FieldState;
};

export default function WindowLogin() {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState<FormData>({
    emailField: { value: "", isValid: [], errorMessage: [] },
    nameField: { value: "", isValid: [], errorMessage: [] },
    passwordField: { value: "", isValid: [], errorMessage: [] },
    passwordAdmitField: { value: "", isValid: [], errorMessage: [] },
  });

  const inputField = [
    {
      type: "email",
      placeholder: "Почта",
      hidden: false,
      key: "emailField",
      onChanged: (value: string) => {
        const validator = new Validate().regex(
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
        );
        console.log(validator.execute(value));
        return validator.execute(value);
      },
    },
    {
      type: "text",
      placeholder: "Псевдоним",
      hidden: state === "login" ? true : false,
      key: "nameField",
      onChanged: (value: string) => {
        const validator = new Validate()
          .min(2)
          .max(16)
          .regex("^[a-zA-Z0-9_-]*$");
        console.log(validator.execute(value));
        return validator.execute(value);
      },
    },
    {
      type: "password",
      placeholder: "Пароль",
      hidden: false,
      key: "passwordField",
      onChanged: (
        value: string
      ): { isValid: boolean[]; errorMessage: string[] } => {
        const validator = new Validate()
          .min(8)
          .max(32)
          .regex("^[a-zA-Z0-9!@#$%^&*_+-=;:|?]*$");
        console.log(validator.execute(value));
        return validator.execute(value);
      },
    },
    {
      type: "password",
      placeholder: "Подтвердить пароль",
      hidden: state === "login" ? true : false,
      key: "passwordAdmitField",
      onChanged: (value: string) => {
        const validator = new Validate()
          .min(8)
          .max(32)
          .regex("^[a-zA-Z0-9!@#$%^&*_+-=;:|?]*$");
        console.log(validator.execute(value));
        return validator.execute(value);
      },
    },
  ];

  // Обновляем одну строчку состояния
  function setFormDataState(key: string, newFieldData: FieldState) {
    setFormData({
      ...formData,
      [key]: newFieldData,
    });
  }

  return (
    <div class="blur" ON_mousedown={closeWindow}>
      <div
        class="window"
        ON_mousedown={(event: PointerEvent) => event.stopPropagation()}
      >
        <div class="form">
          <div class="logo">SkillForce</div>
          <div class="error" id="error"></div>
          {inputField.map((field) => (
            <InputField
              key={field.key}
              keys={field.key}
              type={field.type}
              placeholder={field.placeholder}
              hidden={field.hidden}
              onChanged={field.onChanged}
              data={formData[field.key]}
              setData={setFormDataState}
            />
          ))}
        </div>
        <div class="buttons">
          <button
            class={`buttons__button ${state === "signup" ? "active"  : ""}`}
            ON_click={() => {
              state === "login" ? setState("signup") : signup(formData);
            }}
          >
            Регистрация
          </button>
          <button
            class={`buttons__button ${state === "login" ? "active" : ""}`}
            ON_click={() => {
              state === "signup" ? setState("login") : login(formData);
            }}
          >
            Вход
          </button>
        </div>
      </div>
    </div>
  );
}

// TODO: Чтобы рендер не сбивал фокус и при наведении на иконку ошибки сделать tooltrip
// Решить проблемы с перерисовкой всех элементов, даже если меняется один
function InputField({
  type,
  keys,
  placeholder,
  hidden,
  onChanged = () => {
    return { isValid: [], errorMessage: [] };
  },
  data,
  setData,
}: {
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
  return (
    <div
      class={`field-input ${hidden ? "hidden" : ""} ${
        data.isValid.includes(false) ? "error__input" : ""
      }`}
    >
    <input
        class="field-input__input"
      type={type}
      placeholder={placeholder}
        value={data.value}
      ON_input={(e: { target: HTMLInputElement }) => {
        const resultValidate = onChanged(e.target.value);
          console.log("resultValidate", resultValidate);
          setData(keys, {
            value: e.target.value,
            isValid: resultValidate.isValid,
            errorMessage: resultValidate.errorMessage,
          });
          if (resultValidate.isValid.includes(false)) {
            console.log("error", e.target.value);
        }
      }}
    />
      {data.isValid.includes(false) ? <img class="icon" src={error} /> : ""}
    </div>
  );
}

function closeWindow() {
  const blur = document.getElementById("blur") as Element;
  blur.innerHTML = "";
}

function signup() {}

function login() {}
