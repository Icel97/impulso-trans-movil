import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent  implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  navButton(section: string) {
    console.log('section', section);
    this.navCtrl.navigateForward(`/${section}`);
  }

  logout() {
    this.navCtrl.navigateForward('/login');
  }

}
