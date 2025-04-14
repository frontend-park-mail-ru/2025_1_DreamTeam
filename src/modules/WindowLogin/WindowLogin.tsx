import InputWithValidation from "@/components/InputWithValidation";
import { useState } from "@/ourReact/jsx-runtime";
import { FieldState, FormData } from "@/types/WindowLogin";
import Validate from "@/validate";
import closeWindow from "./logic/closeWindow";
import signup from "./logic/signup";
import login from "./logic/login";

export default function WindowLogin() {
  console.log("I am rerendering");
  const [state, setState] = useState("login");
  const [errorAuth, setErrorAuth] = useState("");
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

  console.log("Form data", JSON.stringify(formData), inputField);

  return (
    <div class="blur" ON_mousedown={closeWindow}>
      <div
        class="window"
        ON_mousedown={(event: PointerEvent) => event.stopPropagation()}
      >
        <div class="form">
          <div class="logo">SkillForce</div>
          <div class="error error_color_red">{errorAuth}</div>
          {inputField.map((field) => {
            console.log(field.key, formData[field.key]);
            return (
              <InputWithValidation
                key={field.key}
                keys={field.key}
                type={field.type}
                placeholder={field.placeholder}
                hidden={field.hidden}
                onChanged={field.onChanged}
                data={formData[field.key]}
                setData={setFormDataState}
              />
            );
          })}
        </div>
        <div class="buttons">
          <button
            class={`buttons__button ${state === "signup" ? "active" : ""}`}
            ON_click={() => {
              state === "login"
                ? setState("signup")
                : signup(formData, setErrorAuth);
            }}
          >
            Регистрация
          </button>
          <button
            class={`buttons__button ${state === "login" ? "active" : ""}`}
            ON_click={() => {
              state === "signup"
                ? setState("login")
                : login(formData, setErrorAuth);
            }}
          >
            Вход
          </button>
        </div>
      </div>
    </div>
  );
}
