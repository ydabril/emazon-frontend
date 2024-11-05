import { Validators } from "@angular/forms";

export const loginForm = {
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
};