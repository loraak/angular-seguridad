import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MessageService } from 'primeng/api';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputMaskModule } from 'primeng/inputmask';
import {FloatLabelModule} from 'primeng/floatlabel';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasMinLength = value.length >= 10;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    return hasMinLength && hasSpecialChar ? null : { passwordStrength: true };
  };
}

export function passwordMatchValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) return null;

    if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}

export function adultAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = control.value;
    if (!birthDate || birthDate.includes('_')) return null;

    const [day, month, year] = birthDate.split('/').map(Number);
    const birth = new Date(year, month - 1, day);

    if (isNaN(birth.getTime())) return { notAdult: true };

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 18 ? null : { notAdult: true };
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule, 
    ButtonModule,
    ToastModule,
    KeyFilterModule,
    InputMaskModule,
  ],
  providers: [MessageService]
})
export class Register implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        usuario:         ['', Validators.required],
        nombreCompleto:  ['', Validators.required],
        email:           ['', [Validators.required, Validators.email]],
        password:        ['', [Validators.required, passwordStrengthValidator()]],
        confirmPassword: ['', Validators.required],
        direccion:       ['', Validators.required],
        fechaNacimiento: ['', [Validators.required, adultAgeValidator()]],
        telefono:        ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword')
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Registro completado con éxito.'
      });
      console.log('Datos del formulario:', this.registerForm.value);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, corrija los errores en el formulario.'
      });
      this.registerForm.markAllAsTouched();
    }
  }
}