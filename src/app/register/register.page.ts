import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ApisService } from '../services/apis/apis.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  validaPassFn: any;
  date: any;

  constructor(
    private api: ApisService,
  ) { }

  ngOnInit() {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&].{7,}$/;
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      identidad_genero: new FormControl('', [Validators.required]),
      pronombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(regexPassword), Validators.minLength(8)]),
      password_confirmation: new FormControl('',[Validators.required, Validators.pattern(regexPassword), Validators.minLength(8)])
    }, { validators: this.passwordMatchValidator() });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null =>  {
      const formGroup = control as FormGroup;
      if (formGroup.get('comfirmPassword')?.value && formGroup.get('password')?.value) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;
        return password && confirmPassword && password !== confirmPassword ? { notSame: true } : null;
      } else return null;
    };
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  async register() {
    if (!this.registerForm.valid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }
    
    const data = this.registerForm.value;
    data.bithday = this.date;

    try {
      const res = await this.api.post('register', data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
}
