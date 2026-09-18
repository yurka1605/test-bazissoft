import { AbstractControl, Validators } from "@angular/forms";

const passwordregExp: RegExp = /^[a-z0-9]+$/i;

export function passwordValidator(field: AbstractControl): Validators | null {
  return field.value && passwordregExp.test(field.value)
      ? null
      : { passwordInvalidSymbols: 'Пароль может содержать только латинские буквы и цифры' };
}