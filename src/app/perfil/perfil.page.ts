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
  idUser: any;
  listEstados: any = [];
  listMunicipios: any = [];

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
    this.idUser = userData.id;
    this.perfilForm = new FormGroup({
      name: new FormControl(userData.name, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      lastName: new FormControl(userData.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      identidad_genero: new FormControl(userData.identidad_genero, [Validators.required]),
      pronombre: new FormControl(userData.pronombres, [Validators.required]),
      email: new FormControl(userData.email, [Validators.required, Validators.email]),
      telefono: new FormControl(userData.telefono, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      estado: new FormControl(userData.estado),
      municipio: new FormControl(userData.municipio),
    });

    this.date = userData.bithday;
    await this.getEstados();
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
      const response: any = await this.api.put(`user/${this.idUser}`, data);
      console.log(response);
      if (!response.success) {
        this.common.showAlert('Error', response.message);
      } else {
        this.common.showAlert('Success', response.message);
      }
    } catch (error) {
      console.error("Error login: ",error);
    }
  }

  async getEstados() {
    try {
      const response: any = await this.api.get('estados');
      if (!response.success) {
        this.common.showAlert('Error', response.message);
      } else {
        this.listEstados = response.data;
      }
    } catch (error) {
      console.error("Error getEstados: ",error);
    }
  }

  async getMunicipios() {
    this.listMunicipios = null; 
    try {
      const response: any = await this.api.get(`municipios/estado/${this.perfilForm.value.estado}`);
      console.log(response);
      if (!response.success) {
        this.common.showAlert('Error', response.message);
        this.listMunicipios = null;
      } else {
        this.listMunicipios = response.data;
      }
    } catch (error) {
      console.error("Error getMunicipios: ",error);
      this.listMunicipios = null;
    }
  }

}
