import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent  implements OnInit {

  constructor(
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {}

  navButton(section: string) {
    console.log('section', section);
    this.navCtrl.navigateForward(`/${section}`);
  }

  logout() {
    this.storage.clear();
    this.navCtrl.navigateForward('/login');
  }

}
