import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators,  } from '@angular/forms';
import { ApisService } from '../services/apis/apis.service';
import { CommonFunctions } from '../utils/commonFuctions';
import { StorageKeys } from '../utils/storage-keys';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  showPassword: boolean = false;

  constructor(
    private navCtrl: NavController,
    private api: ApisService,
    private common: CommonFunctions,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  async login() {
    if (!this.loginForm.valid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    const data = this.loginForm.value;
    const loading = await this.loadingCtrl.create({ message: 'Iniciando sesión...' });
    try {
      loading.present();
      const response: any = await this.api.post('login', data);
      loading.dismiss();
      console.log(response);
      if (!response.success) {
        this.common.showAlert('Error', response.message);
      } else {
        const { USER_TOKEN, USER_DATA} = StorageKeys;
        await Promise.all([
          this.storage.set(USER_TOKEN, response.token),
          this.storage.set(USER_DATA, response.user)
        ]);

        this.navCtrl.navigateForward('/tabs');
      }
    } catch (error) {
      console.error("Error login: ",error);
      loading.dismiss();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
