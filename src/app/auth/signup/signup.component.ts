import { Component, Signal, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function arePasswordsEqual(control: AbstractControl) {
  if (control) {
    return null;
  } else return { passwordNotEqual: true };
}

type Roles = 'student' | 'teacher' | 'employee' | 'founder' | 'other';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  submitted: WritableSignal<boolean> = signal(false);
  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),

    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          arePasswordsEqual,
        ],
      }),
    }),

    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),

    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
      }),
      streetNumber: new FormControl('', {
        validators: [Validators.required],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),

    role: new FormControl<Roles>('student', {
      validators: [Validators.required],
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agreeToTermsAndConditions: new FormControl(false, {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    this.submitted.set(true);
    console.warn('Form Submitted!');

    if (this.signupForm.invalid) {
      console.error('Form is invalid!');
      return;
    }

  }
  onReset() {
    this.submitted.set(false);
    console.warn('Form Reset!');
    this.signupForm.reset();
  }

  get isPasswordEqual() {
    return this.signupForm.controls.passwords.controls.confirmPassword.valid;
  }
}
