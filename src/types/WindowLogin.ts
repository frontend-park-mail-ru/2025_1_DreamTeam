export interface FieldState {
  value: string;
  isValid: boolean[];
  errorMessage: string[];
}

export type FormData = {
  emailField: FieldState;
  nameField: FieldState;
  passwordField: FieldState;
  passwordAdmitField: FieldState;
  [key: string]: FieldState;
};
