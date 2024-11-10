import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

// Función para verificar si el usuario es mayor de edad
const ageValidator = (control: AbstractControl): ValidationErrors | null => {
  const birthdate = new Date(control.value);
  const age = new Date().getFullYear() - birthdate.getFullYear();
  return age >= 18 ? null : { underage: true };
};

export const userForm = {
  firstName: ['', [Validators.required, Validators.maxLength(50)]],
  lastName: ['', [Validators.required, Validators.maxLength(50)]],
  documentNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  phoneNumber: ['', [Validators.maxLength(13), Validators.pattern('^\\+?[0-9]*$')]],
  birthdate: ['', [Validators.required, ageValidator]],
  email: [
    '',
    [
      Validators.required,
      Validators.pattern(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      )
    ]
  ],
  password: ['', [Validators.required, Validators.minLength(8)]],
};
