import { Component } from '@angular/core';
import {
  AbstractControl,
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
  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
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
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
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
    role: new FormControl<Roles>('student', {
      validators: [Validators.required],
    }),
    agreeToTermsAndConditions: new FormControl(false, {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    console.warn('Form Submitted!');
    console.log(this.signupForm.controls['agreeToTermsAndConditions'].value);
    console.log(this.signupForm.controls['role'].value);
  }
  onReset() {
    console.warn('Form Reset!');
    this.signupForm.reset();
  }
}
