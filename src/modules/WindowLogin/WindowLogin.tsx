import InputWithValidation from "@/components/InputWithValidation";
import { useState } from "@/ourReact/jsx-runtime";
import { FieldState, FormData } from "@/types/WindowLogin";
import Validate from "@/validate";
import closeWindow from "./logic/closeWindow";
import signup from "./logic/signup";
import login from "./logic/login";
import closeIcon from "Public/static/icons/closeCourse.svg";
import styles from "./WindowLogin.module.scss";

export default function WindowLogin() {
  console.log("I am rerendering");
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
          "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
          `должно быть в формате example@domain.com и содержать только латинские буквы, цифры, ".", "-", "_"`
        );
        return validator.execute(value, "Почта");
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
          .regex(
            "^[a-zA-Zа-яА-Я0-9 ()_-]+$",
            "содержит только буквы, цифры, дефисы и нижние подчеркивания"
          );
        return validator.execute(value, "Псевдоним");
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
          .regex(
            "^[a-zA-Z0-9!@#$%^&*_+-=;:|?]+$",
            "содержит только буквы, цифры и специальные символы !@#$%^&*_+-=;:|?"
          );
        return validator.execute(value, "Пароль");
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
          .regex(
            "^[a-zA-Z0-9!@#$%^&*_+-=;:|?]+$",
            "содержит только буквы, цифры и специальные символы !@#$%^&*_+-=;:|?"
          );
        return validator.execute(value, "Пароль");
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
    <div
      class="blur"
      ON_mousedown={closeWindow}
      ON_keydown={(e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeWindow();
        }
      }}
    >
      <div class={styles.closeWindow}>
        <img style={"cursor: pointer;"} src={closeIcon} />
      </div>
      <div
        class={styles.window}
        ON_mousedown={(event: PointerEvent) => event.stopPropagation()}
      >
        <div class={styles.form}>
          <div class={styles.window__logo}>SkillForce</div>
          {inputField.map((field) => {
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
        <div class={styles.buttons}>
          <button
            class={`${styles.buttons__button} ${
              state === "signup" ? styles.active : ""
            }`}
            ON_click={() => {
              state === "login" ? setState("signup") : signup(formData);
            }}
          >
            Регистрация
          </button>
          <button
            class={`${styles.buttons__button} ${
              state === "login" ? styles.active : ""
            }`}
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
