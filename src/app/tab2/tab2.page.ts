import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageKeys } from '../utils/storage-keys';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  dataPerfil: any = {};

  constructor(
    private storage: Storage
  ) {}

  async ngOnInit() {
    const { USER_DATA } = StorageKeys;
    const userData = await this.storage.get(USER_DATA);
    console.log('userData', userData);
    this.dataPerfil = userData;
  }

}
