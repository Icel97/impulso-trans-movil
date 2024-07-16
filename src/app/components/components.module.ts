import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";

@NgModule({
  declarations: [NavMenuComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [NavMenuComponent],
})

export class ComponentsModule {}