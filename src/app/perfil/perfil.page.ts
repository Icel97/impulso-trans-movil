import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageKeys } from '../utils/storage-keys';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ApisService } from '../services/apis/apis.service';
import { CommonFunctions } from '../utils/commonFuctions';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfilForm: FormGroup = new FormGroup({});
  date: any;
  isLoading: boolean = false;

  constructor(
    private storage: Storage,
    private api: ApisService,
    private common: CommonFunctions
  ) { }

  async ngOnInit() {
    this.isLoading = false;
    const { USER_DATA } = StorageKeys;
    const userData = await this.storage.get(USER_DATA);
    console.log('userData', userData);
    this.perfilForm = new FormGroup({
      name: new FormControl(userData.name, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      lastName: new FormControl(userData.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      identidad_genero: new FormControl(userData.identidad_genero, [Validators.required]),
      pronombre: new FormControl(userData.pronombre, [Validators.required]),
      email: new FormControl(userData.email, [Validators.required, Validators.email]),
    });

    this.date = userData.bithday;
    this.isLoading = true;
  }

  async updateUser() {
    if (!this.perfilForm.valid) {
      Object.values(this.perfilForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    const data = this.perfilForm.value;
    try {
      const response: any = await this.api.put('user', data);
      console.log(response);
      if (!response.success) {
        this.common.showAlert('Error', response.message);
      } else {
        this.common.showAlert('Success', 'User updated successfully');
      }
    } catch (error) {
      console.error("Error login: ",error);
    }
  }

}
