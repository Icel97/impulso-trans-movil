import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ApisService } from '../services/apis/apis.service';
import { CommonFunctions } from '../utils/commonFuctions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  validaPassFn: any;
  date: any;
  showOtherPronounInput = false;
  showOtherGenderInput = false;
  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;

  constructor(
    private api: ApisService,
    private commonUtils: CommonFunctions,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      identidad_genero: new FormControl('', [Validators.required]),
      pronombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.required, Validators.pattern(regexPassword), Validators.minLength(8)]),
      password_confirmation: new FormControl('',[Validators.required, Validators.pattern(regexPassword), Validators.minLength(8)]),
      termsAccepted: new FormControl(false, [Validators.requiredTrue])
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

  onPronounChange(event: any) {
    const selectedValue = event.detail.value;
    this.showOtherPronounInput = selectedValue === 'Otro';
  }

  onPronounChangeGender(event: any) {
    const selectedValue = event.detail.value;
    this.showOtherGenderInput = selectedValue === 'Otro';
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  async showTerms() {
    this.commonUtils.showAlert('Términos y Condiciones', 'Aquí van los términos y condiciones de tu aplicación.', 'Aceptar');
  }

  async register() {
    if (!this.registerForm.valid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    if (!this.date) {
      this.commonUtils.showAlert('Error', 'Debe seleccionar una fecha de nacimiento');
      return
    }

    if (!this.isAdult(this.date)) {
      this.commonUtils.showAlert('Error', 'Debe tener al menos 18 años para registrarse');
      return;
    }
    
    const data = this.registerForm.value;
    data.bithday = this.date;

    try {
      const loading = await this.loadingCtrl.create({ message: 'Registrando...' });
      loading.present();
      const res:any = await this.api.post('register', data);
      loading.dismiss();
      console.log('API Response:', res);
      if (!res.success) {
        this.commonUtils.showAlert('Error', res.message);
      } else {
        this.commonUtils.showAlert('Éxito', res.message);
        this.navCtrl.navigateRoot('login');
      }
    } catch (error) {
      console.error(error);
      this.loadingCtrl.dismiss();
    }
  }

  isAdult(dateOfBirth: string): boolean {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Ajusta la edad si la persona aún no ha cumplido años este año
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1 >= 18;
    }

    return age >= 18;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmationVisibility() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }
}
